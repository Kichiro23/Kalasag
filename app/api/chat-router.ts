import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { chatMessages } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const chatRouter = createRouter({
  messages: publicQuery
    .input(
      z
        .object({
          channel: z.string().default("general"),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const channel = input?.channel ?? "general";
      return db.query.chatMessages.findMany({
        where: eq(chatMessages.channel, channel),
        orderBy: desc(chatMessages.createdAt),
        limit: 100,
      });
    }),

  send: authedQuery
    .input(
      z.object({
        channel: z.string().default("general"),
        content: z.string().min(1).max(2000),
        isAnonymous: z.boolean().default(true),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.insert(chatMessages).values({
        senderId: ctx.user.id,
        channel: input.channel,
        content: input.content,
        isAnonymous: input.isAnonymous,
      });
      return { success: true };
    }),

  channels: publicQuery.query(async () => {
    return [
      { id: "general", name: "General Support", description: "Open support for everyone" },
      { id: "urges", name: "Urge Support", description: "Help when you're feeling urges" },
      { id: "family", name: "Family Corner", description: "For family members" },
      { id: "success", name: "Success Stories", description: "Share your wins" },
    ];
  }),
});
