export type CalendarEvent = {
  time: string;
  country: string;
  event: string;
  impact: "high" | "medium" | "low";
  forecast: string;
  previous: string;
};

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { time: "19:30 WIB", country: "US", event: "Data Inflasi (CPI) YoY", impact: "high", forecast: "3.2%", previous: "3.1%" },
  { time: "19:30 WIB", country: "US", event: "Initial Jobless Claims", impact: "medium", forecast: "215K", previous: "220K" },
  { time: "15:00 WIB", country: "EU", event: "Suku Bunga ECB", impact: "high", forecast: "4.00%", previous: "4.00%" },
  { time: "09:30 WIB", country: "CN", event: "PMI Manufaktur", impact: "medium", forecast: "50.2", previous: "49.8" },
  { time: "20:00 WIB", country: "US", event: "Pidato Ketua The Fed", impact: "high", forecast: "—", previous: "—" },
  { time: "14:00 WIB", country: "ID", event: "Keputusan Suku Bunga BI", impact: "low", forecast: "6.00%", previous: "6.00%" },
];

export const IMPACT_LABEL: Record<CalendarEvent["impact"], string> = {
  high: "Tinggi",
  medium: "Sedang",
  low: "Rendah",
};
