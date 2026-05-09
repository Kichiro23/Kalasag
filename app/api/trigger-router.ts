import { z } from "zod";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { triggerMaps } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const triggerRouter = createRouter({
  add: authedQuery
    .input(
      z.object({
        category: z.enum(["location", "time", "person", "money", "emotion"]),
        trigger: z.string().min(1),
        riskLevel: z.number().min(1).max(10).default(5),
        frequency: z.number().min(1).default(1),
        copingStrategy: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.insert(triggerMaps).values({
        userId: ctx.user.id,
        ...input,
      });
      return { success: true };
    }),

  list: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.query.triggerMaps.findMany({
      where: eq(triggerMaps.userId, ctx.user.id),
      orderBy: desc(triggerMaps.createdAt),
    });
  }),

  update: authedQuery
    .input(
      z.object({
        triggerId: z.number(),
        riskLevel: z.number().min(1).max(10).optional(),
        copingStrategy: z.string().optional(),
        frequency: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const { triggerId, ...data } = input;
      await db
        .update(triggerMaps)
        .set(data)
        .where(eq(triggerMaps.id, triggerId));
      return { success: true };
    }),

  delete: authedQuery
    .input(z.object({ triggerId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db
        .delete(triggerMaps)
        .where(eq(triggerMaps.id, input.triggerId));
      return { success: true };
    }),
});
