import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Existing = { name: string; spend: number; cpl: number | null; leads: number };

async function dbLeadsByCampaign(start: Date, end: Date) {
  const rows = await prisma.$queryRawUnsafe<{ campaign: string; leads: number }[]>(`
    SELECT COALESCE(NULLIF(campaign,''),'(no campaign)') AS campaign,
           COUNT(*)::int AS leads
    FROM leads
    WHERE (
      LOWER(COALESCE(source,'')) IN ('facebook','fb','meta','ig','instagram','facebook.com','m.facebook.com','l.facebook.com')
      OR fbclid IS NOT NULL
    )
    AND "submittedAt" >= $1::timestamp AND "submittedAt" < $2::timestamp
    GROUP BY 1
  `, start, end);
  const map = new Map<string, number>();
  rows.forEach(r => map.set(r.campaign, r.leads));
  return map;
}

async function refreshWeek(weekStart: Date) {
  const week = await prisma.weeklyKpi.findUnique({ where: { weekStart } });
  if (!week) { console.log(`No week found for ${weekStart.toISOString()}`); return; }

  const dbLeads = await dbLeadsByCampaign(week.weekStart, week.weekEnd);
  const existing = (week.metaCampaigns as Existing[] | null) ?? [];

  const refreshed = existing.map(c => {
    const leads = dbLeads.get(c.name) ?? 0;
    const cpl = leads > 0 ? Number((c.spend / leads).toFixed(2)) : null;
    return { name: c.name, spend: c.spend, leads, cpl };
  });

  // Surface any DB campaigns that weren't in the existing snapshot (e.g. numeric-ID ones)
  for (const [name, leads] of dbLeads) {
    if (!existing.find(e => e.name === name)) {
      refreshed.push({ name, spend: 0, leads, cpl: null });
    }
  }

  await prisma.weeklyKpi.update({
    where: { id: week.id },
    data: { metaCampaigns: refreshed as any },
  });

  console.log(`\n${week.weekStart.toISOString().slice(0,10)} → ${week.weekEnd.toISOString().slice(0,10)} — updated`);
  console.table(refreshed);
}

async function main() {
  const weeks = await prisma.weeklyKpi.findMany({ orderBy: { weekStart: 'asc' } });
  for (const w of weeks) await refreshWeek(w.weekStart);
}

main().finally(() => prisma.$disconnect());
