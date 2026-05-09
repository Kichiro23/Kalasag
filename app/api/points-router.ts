import { z } from "zod";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { shieldPoints } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const pointsRouter = createRouter({
  get: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    let points = await db.query.shieldPoints.findFirst({
      where: eq(shieldPoints.userId, ctx.user.id),
    });

    if (!points) {
      await db.insert(shieldPoints).values({
        userId: ctx.user.id,
        points: 0,
        level: 1,
        totalPointsEarned: 0,
        treesUnlocked: 1,
        currentTreeType: "oak",
        treeGrowth: 0,
      });
      points = await db.query.shieldPoints.findFirst({
        where: eq(shieldPoints.userId, ctx.user.id),
      });
    }

    return points;
  }),

  earn: authedQuery
    .input(
      z.object({
        points: z.number(),
        treeGrowth: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const current = await db.query.shieldPoints.findFirst({
        where: eq(shieldPoints.userId, ctx.user.id),
      });

      if (current) {
        const newPoints = current.points + input.points;
        const newTotal = current.totalPointsEarned + input.points;
        const newLevel = Math.floor(newTotal / 500) + 1;
        const newGrowth = Math.min(100, current.treeGrowth + (input.treeGrowth ?? 2));

        await db
          .update(shieldPoints)
          .set({
            points: newPoints,
            totalPointsEarned: newTotal,
            level: newLevel,
            treeGrowth: newGrowth,
          })
          .where(eq(shieldPoints.userId, ctx.user.id));
      }

      return { success: true };
    }),

  updateTree: authedQuery
    .input(
      z.object({
        treeType: z.string().optional(),
        treeGrowth: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const updates: Record<string, unknown> = {};
      if (input.treeType) updates.currentTreeType = input.treeType;
      if (input.treeGrowth !== undefined) updates.treeGrowth = input.treeGrowth;

      await db
        .update(shieldPoints)
        .set(updates)
        .where(eq(shieldPoints.userId, ctx.user.id));

      return { success: true };
    }),
});
