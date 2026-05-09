import { z } from "zod";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { blockedSites } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const blockerRouter = createRouter({
  list: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.query.blockedSites.findMany({
      where: eq(blockedSites.userId, ctx.user.id),
      orderBy: desc(blockedSites.createdAt),
    });
  }),

  add: authedQuery
    .input(
      z.object({
        domain: z.string().min(1),
        category: z.enum([
          "casino",
          "sabong",
          "sports_betting",
          "lottery",
          "poker",
          "loan_shark",
          "betting_app",
          "gambling_ad",
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.insert(blockedSites).values({
        userId: ctx.user.id,
        domain: input.domain,
        category: input.category,
        isActive: true,
        blockCount: 0,
      });
      return { success: true };
    }),

  remove: authedQuery
    .input(z.object({ siteId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db
        .delete(blockedSites)
        .where(eq(blockedSites.id, input.siteId));
      return { success: true };
    }),

  toggle: authedQuery
    .input(z.object({ siteId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const site = await db.query.blockedSites.findFirst({
        where: eq(blockedSites.id, input.siteId),
      });
      if (site) {
        await db
          .update(blockedSites)
          .set({ isActive: !site.isActive })
          .where(eq(blockedSites.id, input.siteId));
      }
      return { success: true };
    }),

  block: authedQuery
    .input(z.object({ siteId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const site = await db.query.blockedSites.findFirst({
        where: eq(blockedSites.id, input.siteId),
      });
      if (site) {
        await db
          .update(blockedSites)
          .set({
            blockCount: site.blockCount + 1,
            lastBlocked: new Date(),
          })
          .where(eq(blockedSites.id, input.siteId));
      }
      return { success: true };
    }),
});
