import { z } from "zod";
import { createRouter, authedQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { notifications } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";

export const notificationRouter = createRouter({
  list: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.query.notifications.findMany({
      where: eq(notifications.userId, ctx.user.id),
      orderBy: desc(notifications.createdAt),
      limit: 50,
    });
  }),

  markRead: authedQuery
    .input(z.object({ notificationId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db
        .update(notifications)
        .set({ isRead: true })
        .where(eq(notifications.id, input.notificationId));
      return { success: true };
    }),

  markAllRead: authedQuery.mutation(async ({ ctx }) => {
    const db = getDb();
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.userId, ctx.user.id));
    return { success: true };
  }),
});
