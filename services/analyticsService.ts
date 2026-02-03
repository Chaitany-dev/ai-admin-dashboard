// Mock analytics intent resolution service
// UI-only consumers can use the returned instruction to render
// metric cards, simple time-series bars, or tables.

export type Trend = "up" | "down" | "neutral"

export interface MetricInstruction {
	type: "metric"
	props: {
		title: string
		value: string | number
		change?: string
		trend?: Trend
	}
}

export interface ChartInstruction {
	type: "chart"
	props: {
		title: string
		data: { label: string; value: number }[]
	}
}

export interface TableInstruction {
	type: "table"
	props: {
		title: string
		columns: string[]
		rows: (string | number)[][]
	}
}

export type AnalyticsInstruction =
	| MetricInstruction
	| ChartInstruction
	| TableInstruction

function normalize(input: string): string {
	return input.trim().toLowerCase()
}

function includes(haystack: string, needle: string): boolean {
	return haystack.includes(needle)
}

// Realistic mock generators
function mockActiveUsers(): MetricInstruction {
	const value = 1248
	const change = "+12% vs yesterday"
	const trend: Trend = "up"
	return {
		type: "metric",
		props: {
			title: "Active Users",
			value,
			change,
			trend,
		},
	}
}

function mockRevenueChart(): ChartInstruction {
	// Last 7 days revenue in USD (mock)
	const data = [
		{ label: "Mon", value: 18250 },
		{ label: "Tue", value: 19680 },
		{ label: "Wed", value: 21540 },
		{ label: "Thu", value: 20870 },
		{ label: "Fri", value: 23910 },
		{ label: "Sat", value: 18730 },
		{ label: "Sun", value: 17320 },
	]
	return {
		type: "chart",
		props: {
			title: "Revenue (Last 7 Days)",
			data,
		},
	}
}

function mockFailedPaymentsTable(): TableInstruction {
	const columns = ["Transaction ID", "User", "Amount", "Date", "Reason"]
	const rows: (string | number)[][] = [
		["TX-94821", "maria@acme.io", 129.99, "2026-01-26", "Card Declined"],
		["TX-94834", "li.wei@example.com", 49.0, "2026-01-27", "Insufficient Funds"],
		["TX-94902", "sam.rogers@contoso.com", 9.99, "2026-01-29", "Incorrect CVC"],
		["TX-94955", "aisha.khan@demo.app", 249.0, "2026-01-31", "Expired Card"],
		["TX-94987", "noah@start.co", 19.0, "2026-02-02", "Gateway Timeout"],
	]
	return {
		type: "table",
		props: {
			title: "Failed Payments",
			columns,
			rows,
		},
	}
}

function mockErrorsTable(): TableInstruction {
	const columns = ["Timestamp", "Service", "Severity", "Message"]
	const rows: (string | number)[][] = [
		["2026-02-02 08:12:10", "auth", "error", "JWT signature invalid"],
		["2026-02-02 09:44:03", "billing", "warn", "Retrying charge (attempt 2)"],
		["2026-02-02 11:20:17", "ai-router", "error", "Model quota exceeded"],
		["2026-02-02 12:05:51", "web", "info", "Client aborted request"],
		["2026-02-02 14:33:29", "infra", "error", "Disk threshold breached (85%)"],
		["2026-02-02 16:02:45", "notifications", "warn", "Delivery delayed > 5s"],
	]
	return {
		type: "table",
		props: {
			title: "System Errors",
			columns,
			rows,
		},
	}
}

function fallbackInstruction(query: string): TableInstruction {
	return {
		type: "table",
		props: {
			title: "Query Not Recognized",
			columns: ["Query", "Note"],
			rows: [[query, "Try: active users, revenue, failed payments, errors"]],
		},
	}
}

export function resolveAnalyticsQuery(query: string): AnalyticsInstruction {
	const q = normalize(query)

	if (includes(q, "active users")) {
		return mockActiveUsers()
	}
	if (includes(q, "revenue")) {
		return mockRevenueChart()
	}
	if (includes(q, "failed payments")) {
		return mockFailedPaymentsTable()
	}
	if (includes(q, "errors") || includes(q, "error")) {
		return mockErrorsTable()
	}

	return fallbackInstruction(query)
}

