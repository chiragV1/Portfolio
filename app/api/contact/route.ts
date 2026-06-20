import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";
import { sendLeadNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, projectType, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !projectType?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, project type, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    await connectDB();

    // Save to MongoDB
    const lead = await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || undefined,
      phone: phone?.trim() || undefined,
      projectType: projectType.trim(),
      message: message.trim(),
    });

    // Send emails (non-blocking on failure)
    try {
      await sendLeadNotification({
        name: lead.name,
        email: lead.email,
        company: lead.company,
        phone: lead.phone,
        projectType: lead.projectType,
        message: lead.message,
      });
    } catch (emailErr) {
      const msg = emailErr instanceof Error ? emailErr.message : String(emailErr);
      console.error("Email send failed (lead still saved to DB):", msg);
    }

    return NextResponse.json(
      { success: true, message: "Message received! I'll be in touch soon." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
