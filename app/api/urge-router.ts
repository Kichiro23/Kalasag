import { z } from "zod";
import { createRouter, authedQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { urgeLogs, gamblerProfiles, shieldPoints } from "../db/schema.js";
import { eq, desc, count, sql } from "drizzle-orm";

export const urgeRouter = createRouter({
  log: authedQuery
    .input(
      z.object({
        intensity: z.number().min(1).max(10),
        trigger: z.string().min(1),
        location: z.string().optional(),
        timeOfDay: z.string(),
        targetApp: z.string().optional(),
        resisted: z.boolean(),
        distractionUsed: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const userId = ctx.user.id;

      await db.insert(urgeLogs).values({
        userId,
        ...input,
      });

      // Update profile stats
      const profile = await db.query.gamblerProfiles.findFirst({
        where: eq(gamblerProfiles.userId, userId),
      });

      if (profile) {
        if (input.resisted) {
          await db
            .update(gamblerProfiles)
            .set({
              totalUrgesResisted: profile.totalUrgesResisted + 1,
            })
            .where(eq(gamblerProfiles.userId, userId));

          // Award points
          const points = await db.query.shieldPoints.findFirst({
            where: eq(shieldPoints.userId, userId),
          });
          if (points) {
            await db
              .update(shieldPoints)
              .set({
                points: points.points + 50,
                totalPointsEarned: points.totalPointsEarned + 50,
                treeGrowth: Math.min(100, points.treeGrowth + 5),
              })
              .where(eq(shieldPoints.userId, userId));
          }
        } else {
          await db
            .update(gamblerProfiles)
            .set({
              totalUrgesSubmitted: profile.totalUrgesSubmitted + 1,
              streakDays: 0,
            })
            .where(eq(gamblerProfiles.userId, userId));
        }
      }

      return { success: true };
    }),

  list: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.query.urgeLogs.findMany({
      where: eq(urgeLogs.userId, ctx.user.id),
      orderBy: desc(urgeLogs.createdAt),
      limit: 50,
    });
  }),

  stats: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const userId = ctx.user.id;

    const allLogs = await db.query.urgeLogs.findMany({
      where: eq(urgeLogs.userId, userId),
    });

    const resisted = allLogs.filter((l) => l.resisted).length;
    const submitted = allLogs.filter((l) => !l.resisted).length;

    return { resisted, submitted, total: allLogs.length };
  }),

  resist: authedQuery
    .input(z.object({ urgeId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db
        .update(urgeLogs)
        .set({ resisted: true })
        .where(eq(urgeLogs.id, input.urgeId));
      return { success: true };
    }),
});
