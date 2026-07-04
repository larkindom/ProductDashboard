// Deterministic mock data for the product dashboard proof of concept.

export type Trend = "up" | "down" | "flat";

export interface KpiSummary {
  id: string;
  label: string;
  value: string;
  deltaLabel: string;
  trend: Trend;
  goodDirection: Trend; // which trend direction counts as "good" for this KPI
}

export interface MonthPoint {
  month: string;
  activeUsers: number;
  newSignups: number;
}

export interface RevenuePoint {
  month: string;
  mrr: number;
}

export interface ChurnPoint {
  month: string;
  churnRate: number;
}

export type ProjectStage = "upcoming" | "in-progress" | "testing" | "beta" | "ga";
export type ProjectHealth = "on-track" | "at-risk" | "blocked";

export interface Project {
  id: string;
  name: string;
  owner: string;
  stage: ProjectStage;
  health: ProjectHealth;
  progress: number; // 0-100
  targetDate: string;
  summary: string;
}

export type ActionItemPriority = "high" | "medium" | "low";
export type ActionItemStatus = "open" | "in-progress" | "done";

export interface ActionItem {
  id: string;
  title: string;
  owner: string;
  priority: ActionItemPriority;
  status: ActionItemStatus;
  dueDate: string;
}

export const lastUpdated = "2026-07-04";

export const kpiSummary: KpiSummary[] = [
  {
    id: "active-users",
    label: "Monthly Active Users",
    value: "18,420",
    deltaLabel: "+6.4% vs last month",
    trend: "up",
    goodDirection: "up",
  },
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: "$142,300",
    deltaLabel: "+3.9% vs last month",
    trend: "up",
    goodDirection: "up",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "2.1%",
    deltaLabel: "-0.4pt vs last month",
    trend: "down",
    goodDirection: "down",
  },
  {
    id: "nps",
    label: "NPS",
    value: "42",
    deltaLabel: "flat vs last month",
    trend: "flat",
    goodDirection: "up",
  },
];

export const userGrowth: MonthPoint[] = [
  { month: "Jan", activeUsers: 11800, newSignups: 1450 },
  { month: "Feb", activeUsers: 12600, newSignups: 1510 },
  { month: "Mar", activeUsers: 13550, newSignups: 1690 },
  { month: "Apr", activeUsers: 14300, newSignups: 1420 },
  { month: "May", activeUsers: 15680, newSignups: 1980 },
  { month: "Jun", activeUsers: 17310, newSignups: 2260 },
  { month: "Jul", activeUsers: 18420, newSignups: 1780 },
];

export const revenue: RevenuePoint[] = [
  { month: "Jan", mrr: 98200 },
  { month: "Feb", mrr: 103400 },
  { month: "Mar", mrr: 110800 },
  { month: "Apr", mrr: 116500 },
  { month: "May", mrr: 124900 },
  { month: "Jun", mrr: 136900 },
  { month: "Jul", mrr: 142300 },
];

export const churn: ChurnPoint[] = [
  { month: "Jan", churnRate: 3.4 },
  { month: "Feb", churnRate: 3.1 },
  { month: "Mar", churnRate: 2.9 },
  { month: "Apr", churnRate: 2.8 },
  { month: "May", churnRate: 2.6 },
  { month: "Jun", churnRate: 2.5 },
  { month: "Jul", churnRate: 2.1 },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Self-serve onboarding revamp",
    owner: "M. Alvarez",
    stage: "beta",
    health: "on-track",
    progress: 72,
    targetDate: "2026-08-15",
    summary: "New activation flow live in beta; rollout to 100% next sprint.",
  },
  {
    id: "proj-2",
    name: "Usage-based billing",
    owner: "J. Chen",
    stage: "in-progress",
    health: "at-risk",
    progress: 45,
    targetDate: "2026-08-01",
    summary: "Metering pipeline slipped a week; invoicing UI still on track.",
  },
  {
    id: "proj-3",
    name: "SOC 2 Type II audit",
    owner: "R. Osei",
    stage: "testing",
    health: "on-track",
    progress: 88,
    targetDate: "2026-07-25",
    summary: "Evidence collection complete; awaiting auditor sign-off.",
  },
  {
    id: "proj-4",
    name: "Mobile app (iOS) beta",
    owner: "S. Kapoor",
    stage: "beta",
    health: "blocked",
    progress: 30,
    targetDate: "2026-09-01",
    summary: "Blocked on App Store review guideline clarification.",
  },
  {
    id: "proj-5",
    name: "Q2 pricing page redesign",
    owner: "M. Alvarez",
    stage: "ga",
    health: "on-track",
    progress: 100,
    targetDate: "2026-06-20",
    summary: "Shipped; conversion up 11% since launch.",
  },
  {
    id: "proj-6",
    name: "AI copilot for reporting",
    owner: "T. Nguyen",
    stage: "upcoming",
    health: "on-track",
    progress: 5,
    targetDate: "2026-10-01",
    summary: "Scoping complete; kickoff planned for next sprint.",
  },
];

export const actionItems: ActionItem[] = [
  {
    id: "action-1",
    title: "Decide on usage-based billing pricing tiers",
    owner: "J. Chen",
    priority: "high",
    status: "open",
    dueDate: "2026-07-09",
  },
  {
    id: "action-2",
    title: "Approve SOC 2 auditor final report",
    owner: "R. Osei",
    priority: "high",
    status: "in-progress",
    dueDate: "2026-07-11",
  },
  {
    id: "action-3",
    title: "Respond to Apple App Review clarification request",
    owner: "S. Kapoor",
    priority: "high",
    status: "open",
    dueDate: "2026-07-08",
  },
  {
    id: "action-4",
    title: "Finalize onboarding beta feedback summary",
    owner: "M. Alvarez",
    priority: "medium",
    status: "in-progress",
    dueDate: "2026-07-14",
  },
  {
    id: "action-5",
    title: "Schedule Q3 roadmap review with leadership",
    owner: "T. Nguyen",
    priority: "medium",
    status: "open",
    dueDate: "2026-07-18",
  },
  {
    id: "action-6",
    title: "Archive Q2 pricing page A/B test results",
    owner: "M. Alvarez",
    priority: "low",
    status: "done",
    dueDate: "2026-06-25",
  },
];
