import { Resend } from "resend"

const FROM = "Blueprint Constructora <onboarding@resend.dev>"

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}
const OWNER = process.env.NOTIFY_EMAIL ?? "gonzalo5757@gmail.com"
const ADMIN_URL = "https://blueprint-constructora-production.up.railway.app/admin"

const PROJECT_LABELS: Record<string, string> = {
  RESIDENTIAL: "Residential",
  COMMERCIAL: "Commercial",
  INDUSTRIAL: "Industrial",
  RENOVATION: "Renovation",
  INFRASTRUCTURE: "Infrastructure",
}

interface QuoteEmailData {
  clientName: string
  clientEmail: string
  clientPhone?: string | null
  clientCompany?: string | null
  projectType: string
  location: string
  area?: number | null
  description: string
  budget?: number | null
  estimatedMin?: number | null
  estimatedMax?: number | null
  quoteId: string
}

export async function sendOwnerNotification(data: QuoteEmailData) {
  const estimate = data.estimatedMin
    ? `$${data.estimatedMin.toLocaleString("en-US")} – $${data.estimatedMax?.toLocaleString("en-US")} USD`
    : "Pending calculation"

  await getResend().emails.send({
    from: FROM,
    to: OWNER,
    subject: `New Quote Request — ${data.clientName} (${PROJECT_LABELS[data.projectType]})`,
    html: `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#f5f5f4;margin:0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e7e5e4;">
    <div style="background:#1c1917;padding:24px 28px;">
      <p style="color:#f59e0b;font-size:12px;font-weight:700;letter-spacing:2px;margin:0 0 4px;">VENTURA CONSTRUCCIONES</p>
      <h1 style="color:#fff;font-size:20px;margin:0;">New Quote Request</h1>
    </div>
    <div style="padding:28px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td colspan="2" style="padding:0 0 12px;font-weight:700;color:#1c1917;border-bottom:1px solid #e7e5e4;margin-bottom:12px;">Client</td></tr>
        <tr><td style="padding:8px 0;color:#78716c;width:40%;">Name</td><td style="padding:8px 0;color:#1c1917;font-weight:500;">${data.clientName}</td></tr>
        <tr><td style="padding:8px 0;color:#78716c;">Email</td><td style="padding:8px 0;color:#1c1917;font-weight:500;">${data.clientEmail}</td></tr>
        ${data.clientPhone ? `<tr><td style="padding:8px 0;color:#78716c;">Phone</td><td style="padding:8px 0;color:#1c1917;font-weight:500;">${data.clientPhone}</td></tr>` : ""}
        ${data.clientCompany ? `<tr><td style="padding:8px 0;color:#78716c;">Company</td><td style="padding:8px 0;color:#1c1917;font-weight:500;">${data.clientCompany}</td></tr>` : ""}

        <tr><td colspan="2" style="padding:16px 0 12px;font-weight:700;color:#1c1917;border-bottom:1px solid #e7e5e4;">Project</td></tr>
        <tr><td style="padding:8px 0;color:#78716c;">Type</td><td style="padding:8px 0;color:#1c1917;font-weight:500;">${PROJECT_LABELS[data.projectType]}</td></tr>
        <tr><td style="padding:8px 0;color:#78716c;">Location</td><td style="padding:8px 0;color:#1c1917;font-weight:500;">${data.location}</td></tr>
        ${data.area ? `<tr><td style="padding:8px 0;color:#78716c;">Area</td><td style="padding:8px 0;color:#1c1917;font-weight:500;">${data.area} sqft</td></tr>` : ""}
        ${data.budget ? `<tr><td style="padding:8px 0;color:#78716c;">Client budget</td><td style="padding:8px 0;color:#1c1917;font-weight:500;">$${Number(data.budget).toLocaleString("en-US")} USD</td></tr>` : ""}

        <tr><td colspan="2" style="padding:16px 0 8px;font-weight:700;color:#1c1917;">Description</td></tr>
        <tr><td colspan="2" style="padding:0 0 16px;color:#44403c;line-height:1.6;">${data.description}</td></tr>

        <tr><td colspan="2" style="padding:16px 0 8px;border-top:1px solid #e7e5e4;font-weight:700;color:#1c1917;">System Estimate</td></tr>
        <tr><td colspan="2" style="padding:0;font-size:20px;font-weight:700;color:#f59e0b;">${estimate}</td></tr>
      </table>

      <a href="${ADMIN_URL}" style="display:inline-block;margin-top:24px;background:#1c1917;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;">
        View in Admin Panel →
      </a>
    </div>
    <div style="padding:16px 28px;background:#f5f5f4;border-top:1px solid #e7e5e4;font-size:12px;color:#a8a29e;">
      Quote ID: ${data.quoteId}
    </div>
  </div>
</body>
</html>`,
  })
}

export async function sendClientConfirmation(data: QuoteEmailData) {
  await getResend().emails.send({
    from: FROM,
    to: data.clientEmail,
    subject: "We received your quote request — Ventura Construcciones",
    html: `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#f5f5f4;margin:0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e7e5e4;">
    <div style="background:#1c1917;padding:24px 28px;">
      <p style="color:#f59e0b;font-size:12px;font-weight:700;letter-spacing:2px;margin:0 0 4px;">VENTURA CONSTRUCCIONES</p>
      <h1 style="color:#fff;font-size:20px;margin:0;">We got your request, ${data.clientName.split(" ")[0]}!</h1>
    </div>
    <div style="padding:28px;">
      <p style="color:#44403c;line-height:1.7;margin:0 0 20px;">
        Thank you for reaching out. Our team will review your project details and send you a detailed estimate within <strong>24–48 business hours</strong>.
      </p>

      <div style="background:#f5f5f4;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
        <p style="font-size:12px;font-weight:700;color:#78716c;letter-spacing:1px;margin:0 0 12px;">YOUR SUBMISSION SUMMARY</p>
        <table style="width:100%;font-size:14px;border-collapse:collapse;">
          <tr><td style="padding:5px 0;color:#78716c;width:40%;">Project type</td><td style="padding:5px 0;color:#1c1917;font-weight:500;">${PROJECT_LABELS[data.projectType]}</td></tr>
          <tr><td style="padding:5px 0;color:#78716c;">Location</td><td style="padding:5px 0;color:#1c1917;font-weight:500;">${data.location}</td></tr>
          ${data.area ? `<tr><td style="padding:5px 0;color:#78716c;">Area</td><td style="padding:5px 0;color:#1c1917;font-weight:500;">${data.area} sqft</td></tr>` : ""}
        </table>
      </div>

      <p style="color:#78716c;font-size:13px;line-height:1.6;margin:0;">
        Questions? Reply to this email or call us directly.<br/>
        <strong style="color:#1c1917;">Columbus, Ohio</strong>
      </p>
    </div>
    <div style="padding:16px 28px;background:#f5f5f4;border-top:1px solid #e7e5e4;font-size:12px;color:#a8a29e;">
      Ventura Construcciones · Columbus, Ohio
    </div>
  </div>
</body>
</html>`,
  })
}
