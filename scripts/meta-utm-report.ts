import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Row = Record<string, unknown>;

async function main() {
  // Identify Meta leads: source in (facebook, fb, meta, ig, instagram) OR fbclid present
  const metaWhere = `(
    LOWER(COALESCE(source,'')) IN ('facebook','fb','meta','ig','instagram','facebook.com','m.facebook.com','l.facebook.com')
    OR LOWER(COALESCE(medium,'')) IN ('paid_social','paidsocial','cpc','paid')
       AND LOWER(COALESCE(source,'')) LIKE '%facebook%'
    OR fbclid IS NOT NULL
  )`;

  const totals = await prisma.$queryRawUnsafe<Row[]>(`
    SELECT COUNT(*)::int AS leads,
           SUM(CASE WHEN "saleDate" IS NOT NULL THEN 1 ELSE 0 END)::int AS sold,
           SUM(CASE WHEN "appointmentSat" THEN 1 ELSE 0 END)::int AS sat,
           SUM(COALESCE("saleAmount",0))::float AS revenue
    FROM leads WHERE ${metaWhere}
  `);

  const byCampaign = await prisma.$queryRawUnsafe<Row[]>(`
    SELECT COALESCE(NULLIF(campaign,''), '(no campaign)') AS campaign,
           COUNT(*)::int AS leads,
           SUM(CASE WHEN "appointmentSat" THEN 1 ELSE 0 END)::int AS sat,
           SUM(CASE WHEN "saleDate" IS NOT NULL THEN 1 ELSE 0 END)::int AS sold,
           SUM(COALESCE("saleAmount",0))::float AS revenue,
           AVG(NULLIF("leadScore",0))::float AS avg_score
    FROM leads WHERE ${metaWhere}
    GROUP BY 1
    ORDER BY leads DESC
    LIMIT 25
  `);

  const byAdSet = await prisma.$queryRawUnsafe<Row[]>(`
    SELECT COALESCE(NULLIF(campaign,''),'(no campaign)') AS campaign,
           COALESCE(NULLIF("adSet",''),'(no adset)') AS adset,
           COUNT(*)::int AS leads,
           SUM(CASE WHEN "saleDate" IS NOT NULL THEN 1 ELSE 0 END)::int AS sold,
           SUM(COALESCE("saleAmount",0))::float AS revenue
    FROM leads WHERE ${metaWhere}
    GROUP BY 1,2
    ORDER BY leads DESC
    LIMIT 25
  `);

  const byAd = await prisma.$queryRawUnsafe<Row[]>(`
    SELECT COALESCE(NULLIF(campaign,''),'(no campaign)') AS campaign,
           COALESCE(NULLIF("adSet",''),'(no adset)') AS adset,
           COALESCE(NULLIF("adId",''), NULLIF("utmContent",''),'(no ad)') AS ad,
           COUNT(*)::int AS leads,
           SUM(CASE WHEN "saleDate" IS NOT NULL THEN 1 ELSE 0 END)::int AS sold,
           SUM(COALESCE("saleAmount",0))::float AS revenue,
           AVG(NULLIF("leadScore",0))::float AS avg_score
    FROM leads WHERE ${metaWhere}
    GROUP BY 1,2,3
    ORDER BY leads DESC
    LIMIT 30
  `);

  const byContent = await prisma.$queryRawUnsafe<Row[]>(`
    SELECT COALESCE(NULLIF("utmContent",''),'(none)') AS utm_content,
           COUNT(*)::int AS leads,
           SUM(CASE WHEN "saleDate" IS NOT NULL THEN 1 ELSE 0 END)::int AS sold,
           SUM(COALESCE("saleAmount",0))::float AS revenue
    FROM leads WHERE ${metaWhere}
    GROUP BY 1
    ORDER BY leads DESC
    LIMIT 25
  `);

  console.log("\n=== META TOTALS ===");
  console.table(totals);
  console.log("\n=== TOP CAMPAIGNS ===");
  console.table(byCampaign);
  console.log("\n=== TOP AD SETS ===");
  console.table(byAdSet);
  console.log("\n=== TOP ADS (by adId / utm_content) ===");
  console.table(byAd);
  console.log("\n=== TOP UTM_CONTENT ===");
  console.table(byContent);
}

main().finally(() => prisma.$disconnect());
