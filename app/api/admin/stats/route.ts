import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";
import PageView from "@/lib/models/PageView";
import { checkAdminAuth } from "@/lib/auth";

export async function GET() {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalLeads,
      newLeadsThisWeek,
      projectTypeCounts,
      lastLead,
      pageViews,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: weekAgo } }),
      Lead.aggregate([
        { $group: { _id: "$projectType", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      Lead.findOne().sort({ createdAt: -1 }).lean(),
      PageView.find().sort({ count: -1 }).limit(10).lean(),
    ]);

    const topProjectType = projectTypeCounts[0]?._id || "N/A";

    return NextResponse.json({
      totalLeads,
      newLeadsThisWeek,
      topProjectType,
      lastLeadAt: lastLead
        ? (lastLead as unknown as Record<string, unknown>).createdAt as Date
        : null,
      projectTypeCounts,
      pageViews,
    });
  } catch (err) {
    console.error("Admin stats GET error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
