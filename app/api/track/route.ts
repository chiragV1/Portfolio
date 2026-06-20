import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PageView from "@/lib/models/PageView";

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json();

    if (!page || typeof page !== "string") {
      return NextResponse.json({ error: "Invalid page" }, { status: 400 });
    }

    await connectDB();

    await PageView.findOneAndUpdate(
      { page },
      { $inc: { count: 1 }, $set: { lastVisited: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Track API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
