import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PortfolioData from "@/lib/models/PortfolioData";

export const revalidate = 3600; // cache 1 hour

export async function GET() {
  try {
    await connectDB();
    const data = await PortfolioData.findOne().lean();

    if (!data) {
      return NextResponse.json({ error: "No portfolio data found. Run /api/admin/seed first." }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Portfolio GET error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
