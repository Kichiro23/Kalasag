import { authRouter } from "./auth-router";
import { profileRouter } from "./profile-router";
import { urgeRouter } from "./urge-router";
import { blockerRouter } from "./blocker-router";
import { contentRouter } from "./content-router";
import { dailyCheckRouter } from "./daily-check-router";
import { triggerRouter } from "./trigger-router";
import { financeRouter } from "./finance-router";
import { pointsRouter } from "./points-router";
import { notificationRouter } from "./notification-router";
import { chatRouter } from "./chat-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  profile: profileRouter,
  urge: urgeRouter,
  blocker: blockerRouter,
  content: contentRouter,
  dailyCheck: dailyCheckRouter,
  trigger: triggerRouter,
  finance: financeRouter,
  points: pointsRouter,
  notification: notificationRouter,
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
