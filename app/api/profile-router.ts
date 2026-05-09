import { z } from "zod";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { gamblerProfiles, shieldPoints } from "@db/schema";
import { eq } from "drizzle-orm";

export const profileRouter = createRouter({
  get: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const userId = ctx.user.id;

    let profile = await db.query.gamblerProfiles.findFirst({
      where: eq(gamblerProfiles.userId, userId),
    });

    if (!profile) {
      await db.insert(gamblerProfiles).values({
        userId,
        streakDays: 0,
        longestStreak: 0,
        totalMoneySaved: "0",
        totalUrgesResisted: 0,
        totalUrgesSubmitted: 0,
        riskScore: 50,
        blockerEnabled: true,
        strictMode: false,
      });
      profile = await db.query.gamblerProfiles.findFirst({
        where: eq(gamblerProfiles.userId, userId),
      });
    }

    let points = await db.query.shieldPoints.findFirst({
      where: eq(shieldPoints.userId, userId),
    });

    if (!points) {
      await db.insert(shieldPoints).values({
        userId,
        points: 0,
        level: 1,
        totalPointsEarned: 0,
        treesUnlocked: 1,
        currentTreeType: "oak",
        treeGrowth: 0,
      });
      points = await db.query.shieldPoints.findFirst({
        where: eq(shieldPoints.userId, userId),
      });
    }

    return { profile, points };
  }),

  update: authedQuery
    .input(
      z.object({
        emergencyContactName: z.string().optional(),
        emergencyContactPhone: z.string().optional(),
        dailyLimit: z.string().optional(),
        blockerEnabled: z.boolean().optional(),
        strictMode: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db
        .update(gamblerProfiles)
        .set(input)
        .where(eq(gamblerProfiles.userId, ctx.user.id));
      return { success: true };
    }),
});
