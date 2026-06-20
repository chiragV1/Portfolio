import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PortfolioData from "@/lib/models/PortfolioData";
import { seedData } from "@/lib/portfolioSeedData";
import { checkAdminAuth } from "@/lib/auth";

export async function POST() {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    // Replace existing document or create new one
    const existing = await PortfolioData.findOne();
    if (existing) {
      await PortfolioData.findByIdAndUpdate(existing._id, seedData, { new: true });
    } else {
      await PortfolioData.create(seedData);
    }

    return NextResponse.json({ success: true, message: "Portfolio data seeded successfully." });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
