import { z } from "zod";
import { createRouter, authedQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { debtEntries, gamblerProfiles } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";

export const financeRouter = createRouter({
  debts: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.query.debtEntries.findMany({
      where: eq(debtEntries.userId, ctx.user.id),
      orderBy: desc(debtEntries.createdAt),
    });
  }),

  addDebt: authedQuery
    .input(
      z.object({
        creditor: z.string().min(1),
        amount: z.string(),
        interestRate: z.string().optional(),
        minPayment: z.string().optional(),
        remaining: z.string(),
        dueDate: z.string().optional(),
        isGamblingDebt: z.boolean().default(true),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.insert(debtEntries).values({
        userId: ctx.user.id,
        ...input,
      });
      return { success: true };
    }),

  addPayment: authedQuery
    .input(
      z.object({
        debtId: z.number(),
        amount: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const debt = await db.query.debtEntries.findFirst({
        where: eq(debtEntries.id, input.debtId),
      });
      if (debt) {
        const newTotalPaid = Number(debt.totalPaid) + Number(input.amount);
        const newRemaining = Math.max(0, Number(debt.remaining) - Number(input.amount));
        await db
          .update(debtEntries)
          .set({
            totalPaid: String(newTotalPaid),
            remaining: String(newRemaining),
            isPaid: newRemaining <= 0,
          })
          .where(eq(debtEntries.id, input.debtId));
      }
      return { success: true };
    }),

  stats: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const debts = await db.query.debtEntries.findMany({
      where: eq(debtEntries.userId, ctx.user.id),
    });

    const totalDebt = debts.reduce((sum, d) => sum + Number(d.remaining), 0);
    const totalPaid = debts.reduce((sum, d) => sum + Number(d.totalPaid), 0);
    const totalOriginal = debts.reduce((sum, d) => sum + Number(d.amount), 0);
    const gamblingDebts = debts.filter((d) => d.isGamblingDebt).length;
    const paidOff = debts.filter((d) => d.isPaid).length;

    return { totalDebt, totalPaid, totalOriginal, gamblingDebts, paidOff, count: debts.length };
  }),
});
