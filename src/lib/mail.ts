import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTPEmail(email: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "FlowMind AI <onboarding@resend.dev>",
      to: email,
      subject: "Verify your FlowMind AI account",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:30px;">
          <h2 style="color:#2563eb;">FlowMind AI</h2>

          <p>Welcome to FlowMind AI!</p>

          <p>Your verification code is:</p>

          <div
            style="
              font-size:32px;
              font-weight:bold;
              letter-spacing:8px;
              background:#f3f4f6;
              padding:20px;
              text-align:center;
              border-radius:10px;
              margin:20px 0;
            "
          >
            ${otp}
          </div>

          <p>This OTP expires in <b>10 minutes</b>.</p>

          <p>If you didn't create this account, you can safely ignore this email.</p>

          <br/>

          <p>— FlowMind AI Team</p>
        </div>
      `,
    });

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    console.log("✅ OTP email sent", data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
