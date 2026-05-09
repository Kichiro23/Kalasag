import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  boolean,
  decimal,
  bigint,
} from "drizzle-orm/mysql-core";

// ============================================
// Users (extends OAuth auth system)
// ============================================
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  userType: mysqlEnum("user_type", ["gambler", "family"]).default("gambler").notNull(),
  phone: varchar("phone", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================
// Gambler Profiles
// ============================================
export const gamblerProfiles = mysqlTable("gambler_profiles", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  gamblingTypes: text("gambling_types"),
  startDate: timestamp("start_date"),
  lastGambleDate: timestamp("last_gamble_date"),
  streakDays: int("streak_days").default(0).notNull(),
  longestStreak: int("longest_streak").default(0).notNull(),
  totalMoneySaved: decimal("total_money_saved", { precision: 12, scale: 2 }).default("0").notNull(),
  totalUrgesResisted: int("total_urges_resisted").default(0).notNull(),
  totalUrgesSubmitted: int("total_urges_submitted").default(0).notNull(),
  riskScore: int("risk_score").default(50).notNull(),
  highRiskPeriods: text("high_risk_periods"),
  blockerEnabled: boolean("blocker_enabled").default(true).notNull(),
  strictMode: boolean("strict_mode").default(false).notNull(),
  dailyLimit: decimal("daily_limit", { precision: 12, scale: 2 }),
  emergencyContactName: varchar("emergency_contact_name", { length: 100 }),
  emergencyContactPhone: varchar("emergency_contact_phone", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// ============================================
// Urge Logs
// ============================================
export const urgeLogs = mysqlTable("urge_logs", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  intensity: int("intensity").notNull(),
  trigger: varchar("trigger", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  timeOfDay: varchar("time_of_day", { length: 50 }).notNull(),
  targetApp: varchar("target_app", { length: 100 }),
  resisted: boolean("resisted").default(false).notNull(),
  distractionUsed: varchar("distraction_used", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// Blocked Sites
// ============================================
export const blockedSites = mysqlTable("blocked_sites", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  domain: varchar("domain", { length: 255 }).notNull(),
  category: mysqlEnum("category", [
    "casino",
    "sabong",
    "sports_betting",
    "lottery",
    "poker",
    "loan_shark",
    "betting_app",
    "gambling_ad",
  ])
    .default("casino")
    .notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  blockCount: int("block_count").default(0).notNull(),
  lastBlocked: timestamp("last_blocked"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// Recovery Content
// ============================================
export const recoveryContent = mysqlTable("recovery_content", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: mysqlEnum("category", [
    "cbt_technique",
    "urge_surfing",
    "financial_recovery",
    "family_support",
    "cultural_context",
    "success_story",
    "emergency_help",
    "daily_tip",
  ]).notNull(),
  content: text("content").notNull(),
  summary: text("summary"),
  readCount: int("read_count").default(0).notNull(),
  helpfulCount: int("helpful_count").default(0).notNull(),
  tags: text("tags"),
  isModule: boolean("is_module").default(false).notNull(),
  moduleOrder: int("module_order"),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// ============================================
// Recovery Progress
// ============================================
export const recoveryProgress = mysqlTable("recovery_progress", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  contentId: bigint("content_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => recoveryContent.id, { onDelete: "cascade" }),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completed_at"),
  preMood: int("pre_mood"),
  postMood: int("post_mood"),
  reflection: text("reflection"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// Family Connections
// ============================================
export const familyConnections = mysqlTable("family_connections", {
  id: serial("id").primaryKey(),
  gamblerId: bigint("gambler_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  familyMemberId: bigint("family_member_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: mysqlEnum("status", ["pending", "active", "blocked"])
    .default("pending")
    .notNull(),
  alertOnBlockAttempt: boolean("alert_on_block_attempt").default(true).notNull(),
  alertOnHighRisk: boolean("alert_on_high_risk").default(true).notNull(),
  alertOnRelapse: boolean("alert_on_relapse").default(true).notNull(),
  alertOnMilestone: boolean("alert_on_milestone").default(true).notNull(),
  canViewFinances: boolean("can_view_finances").default(false).notNull(),
  canViewUrgeLogs: boolean("can_view_urge_logs").default(true).notNull(),
  canSendCheckIn: boolean("can_send_check_in").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// ============================================
// Daily Checks
// ============================================
export const dailyChecks = mysqlTable("daily_checks", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: mysqlEnum("type", ["morning", "evening"]).notNull(),
  moodRating: int("mood_rating").notNull(),
  urgeIntensity: int("urge_intensity"),
  sleepQuality: int("sleep_quality"),
  gratitude: text("gratitude"),
  goalForToday: text("goal_for_today"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// Trigger Maps
// ============================================
export const triggerMaps = mysqlTable("trigger_maps", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  category: mysqlEnum("category", ["location", "time", "person", "money", "emotion"]).notNull(),
  trigger: varchar("trigger", { length: 255 }).notNull(),
  riskLevel: int("risk_level").default(5).notNull(),
  frequency: int("frequency").default(1).notNull(),
  copingStrategy: text("coping_strategy"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// Debt Entries
// ============================================
export const debtEntries = mysqlTable("debt_entries", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  creditor: varchar("creditor", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  interestRate: decimal("interest_rate", { precision: 5, scale: 2 }),
  minPayment: decimal("min_payment", { precision: 12, scale: 2 }),
  totalPaid: decimal("total_paid", { precision: 12, scale: 2 }).default("0").notNull(),
  remaining: decimal("remaining", { precision: 12, scale: 2 }).notNull(),
  dueDate: timestamp("due_date"),
  isPaid: boolean("is_paid").default(false).notNull(),
  isGamblingDebt: boolean("is_gambling_debt").default(true).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// ============================================
// Shield Points (Gamification)
// ============================================
export const shieldPoints = mysqlTable("shield_points", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  points: int("points").default(0).notNull(),
  level: int("level").default(1).notNull(),
  totalPointsEarned: int("total_points_earned").default(0).notNull(),
  treesUnlocked: int("trees_unlocked").default(1).notNull(),
  currentTreeType: varchar("current_tree_type", { length: 50 }).default("oak").notNull(),
  treeGrowth: int("tree_growth").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// ============================================
// Notifications
// ============================================
export const notifications = mysqlTable("notifications", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: mysqlEnum("type", [
    "block_attempt",
    "high_risk_alert",
    "relapse_alert",
    "milestone",
    "check_in",
    "urge_support",
    "family_message",
    "system",
  ]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// Chat Messages (Bayanihan)
// ============================================
export const chatMessages = mysqlTable("chat_messages", {
  id: serial("id").primaryKey(),
  channel: varchar("channel", { length: 100 }).notNull(),
  senderId: bigint("sender_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  isAnonymous: boolean("is_anonymous").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
