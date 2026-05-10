import { z } from "zod";
import { createRouter, authedQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { dailyChecks, shieldPoints, gamblerProfiles } from "../db/schema.js";
import { eq, desc, and, gte } from "drizzle-orm";

export const dailyCheckRouter = createRouter({
  log: authedQuery
    .input(
      z.object({
        type: z.enum(["morning", "evening"]),
        moodRating: z.number().min(1).max(10),
        urgeIntensity: z.number().min(0).max(10).optional(),
        sleepQuality: z.number().min(1).max(5).optional(),
        gratitude: z.string().optional(),
        goalForToday: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.insert(dailyChecks).values({
        userId: ctx.user.id,
        ...input,
      });

      // Award points
      const points = await db.query.shieldPoints.findFirst({
        where: eq(shieldPoints.userId, ctx.user.id),
      });
      if (points) {
        await db
          .update(shieldPoints)
          .set({
            points: points.points + 25,
            totalPointsEarned: points.totalPointsEarned + 25,
            treeGrowth: Math.min(100, points.treeGrowth + 3),
          })
          .where(eq(shieldPoints.userId, ctx.user.id));
      }

      // Update streak
      const profile = await db.query.gamblerProfiles.findFirst({
        where: eq(gamblerProfiles.userId, ctx.user.id),
      });
      if (profile) {
        await db
          .update(gamblerProfiles)
          .set({
            streakDays: profile.streakDays + 1,
            longestStreak: Math.max(profile.longestStreak, profile.streakDays + 1),
          })
          .where(eq(gamblerProfiles.userId, ctx.user.id));
      }

      return { success: true };
    }),

  today: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return db.query.dailyChecks.findMany({
      where: and(
        eq(dailyChecks.userId, ctx.user.id),
        gte(dailyChecks.createdAt, today)
      ),
    });
  }),

  streak: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const profile = await db.query.gamblerProfiles.findFirst({
      where: eq(gamblerProfiles.userId, ctx.user.id),
    });
    return { streakDays: profile?.streakDays ?? 0, longestStreak: profile?.longestStreak ?? 0 };
  }),

  history: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.query.dailyChecks.findMany({
      where: eq(dailyChecks.userId, ctx.user.id),
      orderBy: desc(dailyChecks.createdAt),
      limit: 30,
    });
  }),
});
