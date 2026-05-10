import { authRouter } from "./auth-router.js";
import { profileRouter } from "./profile-router.js";
import { urgeRouter } from "./urge-router.js";
import { blockerRouter } from "./blocker-router.js";
import { contentRouter } from "./content-router.js";
import { dailyCheckRouter } from "./daily-check-router.js";
import { triggerRouter } from "./trigger-router.js";
import { financeRouter } from "./finance-router.js";
import { pointsRouter } from "./points-router.js";
import { notificationRouter } from "./notification-router.js";
import { chatRouter } from "./chat-router.js";
import { createRouter, publicQuery } from "./middleware.js";

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
