import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const weeks = await prisma.weeklyKpi.findMany({
    orderBy: { weekStart: 'desc' },
    take: 16,
    include: { deals: true },
  });
  console.log("\n=== EXISTING WEEKLY KPIs ===");
  weeks.forEach(w => {
    console.log(`\n${w.weekStart.toISOString().slice(0,10)} → ${w.weekEnd.toISOString().slice(0,10)}`);
    console.log(`  meta=$${w.metaSpend}  google=$${w.googleSpend}  other=$${w.otherSpend}`);
    console.log(`  upfront=$${w.upfrontReceived}  backend=$${w.backendReceived}`);
    console.log(`  metaCampaigns:`, w.metaCampaigns);
    console.log(`  deals: ${w.deals.length}`);
    w.deals.forEach(d => console.log(`    - ${d.customerName} | $${d.upfrontCommission} | installed=${d.installDate?.toISOString().slice(0,10) || 'pending'} | accts=${d.vivintAccountIds.join(',')}`));
  });
  console.log(`\nTotal weeks: ${weeks.length}`);
}
main().finally(() => prisma.$disconnect());
