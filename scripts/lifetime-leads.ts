import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const totalLeads = await prisma.lead.count();
  const totalMetaQuizLeads = await prisma.metaQuizLead.count();

  const bySource = await prisma.$queryRawUnsafe<{ source: string; leads: number }[]>(`
    SELECT COALESCE(NULLIF(source,''),'(no source)') AS source,
           COUNT(*)::int AS leads
    FROM leads
    GROUP BY 1
    ORDER BY leads DESC
  `);

  const byMedium = await prisma.$queryRawUnsafe<{ medium: string; leads: number }[]>(`
    SELECT COALESCE(NULLIF(medium,''),'(no medium)') AS medium,
           COUNT(*)::int AS leads
    FROM leads
    GROUP BY 1
    ORDER BY leads DESC
  `);

  const byLanding = await prisma.$queryRawUnsafe<{ landingPage: string; leads: number }[]>(`
    SELECT COALESCE(NULLIF("landingPage",''),'(unknown)') AS "landingPage",
           COUNT(*)::int AS leads
    FROM leads
    GROUP BY 1
    ORDER BY leads DESC
  `);

  console.log("\n=== LIFETIME LEADS — leads table ===");
  console.log(`Total: ${totalLeads}`);
  console.log("\nBy source:");
  console.table(bySource);
  console.log("\nBy medium:");
  console.table(byMedium);
  console.log("\nBy landing page:");
  console.table(byLanding);

  console.log("\n=== LIFETIME LEADS — meta_quiz_leads table ===");
  console.log(`Total: ${totalMetaQuizLeads}`);
}

main().finally(() => prisma.$disconnect());
