import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { recoveryContent, recoveryProgress } from "../db/schema.js";
import { eq, desc, and } from "drizzle-orm";

export const contentRouter = createRouter({
  list: publicQuery
    .input(
      z
        .object({
          category: z
            .enum([
              "cbt_technique",
              "urge_surfing",
              "financial_recovery",
              "family_support",
              "cultural_context",
              "success_story",
              "emergency_help",
              "daily_tip",
            ])
            .optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      if (input?.category) {
        return db.query.recoveryContent.findMany({
          where: eq(recoveryContent.category, input.category),
          orderBy: desc(recoveryContent.createdAt),
        });
      }
      return db.query.recoveryContent.findMany({
        orderBy: desc(recoveryContent.createdAt),
      });
    }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.query.recoveryContent.findFirst({
        where: eq(recoveryContent.slug, input.slug),
      });
    }),

  markComplete: authedQuery
    .input(
      z.object({
        contentId: z.number(),
        preMood: z.number().optional(),
        postMood: z.number().optional(),
        reflection: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const existing = await db.query.recoveryProgress.findFirst({
        where: and(
          eq(recoveryProgress.userId, ctx.user.id),
          eq(recoveryProgress.contentId, input.contentId)
        ),
      });

      if (existing) {
        await db
          .update(recoveryProgress)
          .set({
            completed: true,
            completedAt: new Date(),
            postMood: input.postMood,
            reflection: input.reflection,
          })
          .where(eq(recoveryProgress.id, existing.id));
      } else {
        await db.insert(recoveryProgress).values({
          userId: ctx.user.id,
          contentId: input.contentId,
          completed: true,
          completedAt: new Date(),
          preMood: input.preMood,
          postMood: input.postMood,
          reflection: input.reflection,
        });
      }

      return { success: true };
    }),

  progress: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.query.recoveryProgress.findMany({
      where: eq(recoveryProgress.userId, ctx.user.id),
    });
  }),
});
