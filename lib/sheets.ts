import { google } from "googleapis"

const SHEET_ID = "1FnISr7wIvq_d7R0FshhMNSX4aYCPnfyRJUl2OvsPMas"
const SHEET_NAME = "Cotizaciones"

const PROJECT_LABELS: Record<string, string> = {
  RESIDENTIAL: "Residential",
  COMMERCIAL: "Commercial",
  INDUSTRIAL: "Industrial",
  RENOVATION: "Renovation",
  INFRASTRUCTURE: "Infrastructure",
}

interface SheetRowData {
  quoteId: string
  createdAt: Date
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
}

function getAuth() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!credentials) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON not set")

  const key = JSON.parse(credentials)
  return new google.auth.GoogleAuth({
    credentials: key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
}

async function ensureHeaders(sheets: ReturnType<typeof google.sheets>, auth: Awaited<ReturnType<typeof getAuth>>) {
  const res = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A1:N1`,
  })

  if (!res.data.values || res.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          "Quote ID", "Date", "Name", "Email", "Phone", "Company",
          "Project Type", "Location", "Area (sqft)", "Description",
          "Client Budget (USD)", "Est. Min (USD)", "Est. Max (USD)", "Status",
        ]],
      },
    })
  }
}

export async function appendQuoteToSheet(data: SheetRowData) {
  const auth = await getAuth()
  const sheets = google.sheets({ version: "v4" })

  await ensureHeaders(sheets, auth)

  await sheets.spreadsheets.values.append({
    auth,
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:N`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        data.quoteId,
        new Date(data.createdAt).toLocaleString("en-US", { timeZone: "America/New_York" }),
        data.clientName,
        data.clientEmail,
        data.clientPhone ?? "",
        data.clientCompany ?? "",
        PROJECT_LABELS[data.projectType] ?? data.projectType,
        data.location,
        data.area ?? "",
        data.description,
        data.budget ? `$${Number(data.budget).toLocaleString("en-US")}` : "",
        data.estimatedMin ? `$${data.estimatedMin.toLocaleString("en-US")}` : "",
        data.estimatedMax ? `$${data.estimatedMax.toLocaleString("en-US")}` : "",
        "Pending",
      ]],
    },
  })
}
