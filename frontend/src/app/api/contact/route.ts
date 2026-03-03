import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  organization: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  interestArea: z.string().min(1, "Please select an interest area"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// In-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const key = `rate_limit_${ip}`;
  const now = Date.now();
  const limitData = rateLimit.get(key);

  if (!limitData || now > limitData.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (limitData.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  limitData.count += 1;
  rateLimit.set(key, limitData);
  return false;
}

function createEmailTemplate(data: {
  fullName: string;
  organization?: string;
  email: string;
  interestArea: string;
  message: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Enquiry</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; }
        .header { background: #0a0a0a; padding: 28px 32px; }
        .header h2 { color: #c5f018; margin: 0; font-size: 20px; }
        .header p { color: #a1a1aa; margin: 6px 0 0; font-size: 13px; }
        .body { padding: 28px 32px; }
        .field { margin-bottom: 18px; }
        .label { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #888; margin-bottom: 4px; }
        .value { font-size: 15px; color: #111; }
        .message-box { background: #f9f9f9; border: 1px solid #eee; border-radius: 6px; padding: 14px; white-space: pre-wrap; font-size: 14px; color: #333; }
        .footer { border-top: 1px solid #eee; padding: 16px 32px; font-size: 12px; color: #aaa; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Messages</h2>
          <p>You just received a new form submission on your website Jason Sturdy | Sturdy.ie.</p>
        </div>
        <div class="body">
          <div class="field">
            <div class="label">From</div>
            <div class="value">${data.fullName} &lt;${data.email}&gt;</div>
          </div>
          ${data.organization ? `
          <div class="field">
            <div class="label">Organization</div>
            <div class="value">${data.organization}</div>
          </div>` : ""}
          <div class="field">
            <div class="label">Interest Area</div>
            <div class="value">${data.interestArea}</div>
          </div>
          <div class="field">
            <div class="label">Message</div>
            <div class="message-box">${data.message}</div>
          </div>
        </div>
        <div class="footer">
          Submitted on ${new Date().toLocaleString()}. Reply directly to this email to respond to the sender.
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Validate
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Check API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not properly configured." },
        { status: 500 }
      );
    }

    // Send email
    const emailResult = await resend.emails.send({
      from: "Contact Form - Website Jason Sturdy <onboarding@resend.dev>", 
      to: ["jason@sturdy.ie"], 
      replyTo: validatedData.email,
      subject: `New Message — ${validatedData.interestArea}`,
      html: createEmailTemplate(validatedData),
    });

    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      id: emailResult.data?.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}