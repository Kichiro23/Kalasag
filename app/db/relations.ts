import { relations } from "drizzle-orm";
import {
  users,
  gamblerProfiles,
  urgeLogs,
  blockedSites,
  recoveryContent,
  recoveryProgress,
  familyConnections,
  dailyChecks,
  triggerMaps,
  debtEntries,
  shieldPoints,
  notifications,
  chatMessages,
} from "./schema.js";

export const usersRelations = relations(users, ({ one, many }) => ({
  gamblerProfile: one(gamblerProfiles, {
    fields: [users.id],
    references: [gamblerProfiles.userId],
  }),
  urgeLogs: many(urgeLogs),
  blockedSites: many(blockedSites),
  recoveryProgress: many(recoveryProgress),
  dailyChecks: many(dailyChecks),
  triggerMaps: many(triggerMaps),
  debtEntries: many(debtEntries),
  shieldPoints: one(shieldPoints, {
    fields: [users.id],
    references: [shieldPoints.userId],
  }),
  notifications: many(notifications),
  chatMessages: many(chatMessages),
  familyAsGambler: many(familyConnections, { relationName: "gambler" }),
  familyAsMember: many(familyConnections, { relationName: "familyMember" }),
}));

export const gamblerProfilesRelations = relations(gamblerProfiles, ({ one }) => ({
  user: one(users, {
    fields: [gamblerProfiles.userId],
    references: [users.id],
  }),
}));

export const urgeLogsRelations = relations(urgeLogs, ({ one }) => ({
  user: one(users, {
    fields: [urgeLogs.userId],
    references: [users.id],
  }),
}));

export const blockedSitesRelations = relations(blockedSites, ({ one }) => ({
  user: one(users, {
    fields: [blockedSites.userId],
    references: [users.id],
  }),
}));

export const recoveryContentRelations = relations(recoveryContent, ({ many }) => ({
  progress: many(recoveryProgress),
}));

export const recoveryProgressRelations = relations(recoveryProgress, ({ one }) => ({
  user: one(users, {
    fields: [recoveryProgress.userId],
    references: [users.id],
  }),
  content: one(recoveryContent, {
    fields: [recoveryProgress.contentId],
    references: [recoveryContent.id],
  }),
}));

export const familyConnectionsRelations = relations(familyConnections, ({ one }) => ({
  gambler: one(users, {
    fields: [familyConnections.gamblerId],
    references: [users.id],
    relationName: "gambler",
  }),
  familyMember: one(users, {
    fields: [familyConnections.familyMemberId],
    references: [users.id],
    relationName: "familyMember",
  }),
}));

export const dailyChecksRelations = relations(dailyChecks, ({ one }) => ({
  user: one(users, {
    fields: [dailyChecks.userId],
    references: [users.id],
  }),
}));

export const triggerMapsRelations = relations(triggerMaps, ({ one }) => ({
  user: one(users, {
    fields: [triggerMaps.userId],
    references: [users.id],
  }),
}));

export const debtEntriesRelations = relations(debtEntries, ({ one }) => ({
  user: one(users, {
    fields: [debtEntries.userId],
    references: [users.id],
  }),
}));

export const shieldPointsRelations = relations(shieldPoints, ({ one }) => ({
  user: one(users, {
    fields: [shieldPoints.userId],
    references: [users.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  sender: one(users, {
    fields: [chatMessages.senderId],
    references: [users.id],
  }),
}));
