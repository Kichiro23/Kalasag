import { getDb } from "../api/queries/connection";
import { recoveryContent } from "./schema";

async function seed() {
  const db = getDb();

  const contents = [
    {
      title: "What is CBT? Understanding Your Thoughts",
      slug: "what-is-cbt",
      category: "cbt_technique" as const,
      content: "CBT helps you understand how your thought patterns affect your emotions and behaviors.\n\n### How It Works:\n1. Identify Negative Thoughts - Recognize automatic negative thoughts when you have urges\n2. Challenge These Thoughts - Ask yourself: Is this true? What's the evidence?\n3. Replace with Balanced Thoughts - Replace with more realistic thoughts\n\n### Example:\nNegative Thought: I need to gamble to recover my money.\nChallenge: Last time I gambled, I lost even more.\nBalanced Thought: Gambling is not the solution. Better to save and find another way.\n\nRemember: Every day without gambling is a victory!",
      summary: "Learn the basics of CBT and how it helps overcome gambling urges.",
      tags: JSON.stringify(["cbt", "thoughts", "basics"]),
      isModule: true,
      moduleOrder: 1,
      isActive: true,
    },
    {
      title: "Urge Surfing: Riding the Wave",
      slug: "urge-surfing",
      category: "urge_surfing" as const,
      content: "Urge surfing is a mindfulness technique. Like surfing a wave - you ride the urge until it fades.\n\n### The Urge is Like a Wave:\n- Has a peak (most intense part)\n- Then subsides (weakens and disappears)\n- Usually lasts only 15-30 minutes\n\n### Steps:\n1. Recognize - Acknowledge you have an urge\n2. Accept - Accept this is normal, don't fight it\n3. Investigate - Where do you feel it in your body? How intense?\n4. Non-identification - You are not your urge\n5. Wait - Let it pass\n\n### Breathing Exercise:\n- Breathe in deep (4 counts)\n- Hold (7 counts)\n- Breathe out (8 counts)\n- Repeat 5 times\n\n### Filipino Mantra:\nThis too shall pass. I am not my urge. I am in control.\n\nEvery urge you surf successfully makes you stronger!",
      summary: "Master urge surfing - a mindfulness technique to ride out gambling urges.",
      tags: JSON.stringify(["urges", "mindfulness", "surfing"]),
      isModule: true,
      moduleOrder: 2,
      isActive: true,
    },
    {
      title: "Financial Recovery: Starting Over",
      slug: "financial-recovery-start",
      category: "financial_recovery" as const,
      content: "Financial recovery is a process. Not overnight, but possible.\n\n### Step 1: Face the Numbers\n- Write down all debts\n- Know the interest rates\n- Complete the financial picture\n\n### Step 2: Create a Budget\n- Track all income\n- List essential expenses\n- Set aside money for debt repayment\n\n### Step 3: Debt Repayment Strategy\n- Snowball Method: Pay smallest first\n- Avalanche Method: Pay highest interest first\n\n### Step 4: Build Emergency Fund\n- Start small (500 pesos/week)\n- Target: 3 months of expenses\n\n### Step 5: Seek Professional Help\n- Credit counseling agencies\n- Financial advisors\n\nEvery day you don't gamble, you are saving money. Track it!",
      summary: "Step-by-step guide to rebuilding finances after gambling addiction.",
      tags: JSON.stringify(["finance", "debt", "budget"]),
      isModule: true,
      moduleOrder: 3,
      isActive: true,
    },
    {
      title: "Family Trust: How to Rebuild",
      slug: "family-trust-rebuilding",
      category: "family_support" as const,
      content: "Losing family trust is one of the most painful effects of gambling addiction. But there is hope.\n\n### Understand Their Pain:\n- They lost money\n- They lost trust\n- They may still be suspicious\n- Their feelings are normal\n\n### Steps to Rebuild Trust:\n1. Be Honest - Full honesty about the situation\n2. Set Boundaries - Show you have control\n3. Share Progress - Show your recovery journey\n4. Accept Accountability - Face consequences\n5. Be Patient - Trust doesn't return overnight\n\n### Communication Tips:\n- Listen to their concerns without defensiveness\n- Apologize sincerely\n- Set regular check-ins\n- Show through actions, not just words\n\nThe family is the strongest shield against addiction.",
      summary: "How to rebuild trust with your family after gambling damage.",
      tags: JSON.stringify(["family", "trust", "relationships"]),
      isModule: true,
      moduleOrder: 4,
      isActive: true,
    },
    {
      title: "Juan's Story: From Casino to Mentor",
      slug: "juan-success-story",
      category: "success_story" as const,
      content: "I started with friends. Bet here, bet there. Before I knew it, my savings were gone.\n\nJuan, 35, an OFW in Dubai. Started with sports betting with coworkers. At first, he won 50,000 pesos. He thought he was lucky.\n\nIn 6 months he lost 300,000 pesos savings, borrowed from loan sharks, neglected his family, and almost lost his job.\n\nThe turning point: One day his son called and said, Papa, don't we have tuition money anymore? That's when he realized he needed to change.\n\nNow: 2 years clean, debt paid, saving again, and a mentor at GA.\n\nHis advice: Ask for help - it's not weakness. Use tools like Kalasag. Don't be ashamed to share with others. Celebrate small wins. Focus on family.",
      summary: "Juan's inspiring journey from gambling addiction to recovery mentor.",
      tags: JSON.stringify(["success", "story", "inspiration"]),
      isModule: false,
      isActive: true,
    },
    {
      title: "Maria's Story: A Mother's Fight",
      slug: "maria-success-story",
      category: "success_story" as const,
      content: "I thought I would lose my family. But I fought back.\n\nMaria, 42, a businesswoman in Quezon City. Started with online casino during the pandemic. While at home, it became her pastime.\n\nThe damage: 2.5 million pesos debt, almost lost her business, considered suicide, family broken.\n\nThe breaking point: I saw my child crying while reading the eviction notice. At that point, I told myself: Enough.\n\nRecovery journey: Professional therapy, medication for anxiety, strict self-exclusion, daily meditation, family therapy sessions.\n\nOne year later: 800,000 pesos remaining debt (half paid), business recovering, closer to family, volunteering at mental health orgs.\n\nThe hardest part was the first 30 days. But every day, you get stronger. Now, I am stronger than before.",
      summary: "Maria's powerful story of recovery and rebuilding her life.",
      tags: JSON.stringify(["success", "story", "mother"]),
      isModule: false,
      isActive: true,
    },
    {
      title: "Filipino Culture and Gambling",
      slug: "filipino-culture-gambling",
      category: "cultural_context" as const,
      content: "Why is it hard to avoid?\n\n1. Social Bonding - Sabong, tong-its, jueteng are part of socializing\n2. Financial Desperation - Hope for quick money\n3. Normalization - Many people gamble, it seems normal\n4. Escape - To forget problems\n\nCommon Filipino Gambling Forms:\n- Jueteng (illegal numbers game)\n- Sabong (cockfighting)\n- Tong-its (card game)\n- Online Casinos (growing since pandemic)\n- E-sabong (online cockfighting)\n- Lottery (PCSO games)\n\nBreaking the Cycle:\n- Education about real odds\n- Alternative bonding activities\n- Community support - Bayanihan spirit\n- Financial literacy\n\nFilipino culture has a strong bayanihan spirit. This is our weapon against addiction.\n\nYou are not alone. Every Filipino fighting addiction is a sibling in this fight.",
      summary: "Understanding gambling in Filipino cultural context.",
      tags: JSON.stringify(["culture", "filipino", "context"]),
      isModule: false,
      isActive: true,
    },
    {
      title: "Emergency: What To Do Right Now",
      slug: "emergency-help",
      category: "emergency_help" as const,
      content: "If you are in crisis right now, read this.\n\n### Immediate Actions:\n1. Breathe - Take 10 deep breaths\n2. Delay - Wait 15 minutes before any action\n3. Call someone - Reach out to a trusted person\n4. Remove access - Block gambling apps/websites\n5. Leave the area - Get away from triggers\n\n### Crisis Hotlines:\n- NCMH: 0966-351-4518 (24/7)\n- GA Pilipinas: 0915-938-2808\n- PAGCOR RG: (02) 8538-9090\n- In Touch: +63 917-800-1123\n- HOPELINE: 2919\n- Tawag Paglaum: 0939-937-5433\n\n### Remember:\n- This urge will pass\n- You have survived 100% of your urges so far\n- You are stronger than you think\n- Help is available\n\nYou matter. Your recovery matters.",
      summary: "Immediate crisis intervention steps and hotlines.",
      tags: JSON.stringify(["emergency", "crisis", "hotlines"]),
      isModule: false,
      isActive: true,
    },
    {
      title: "Daily Tip: HALT Check",
      slug: "daily-tip-halt",
      category: "daily_tip" as const,
      content: "HALT stands for Hungry, Angry, Lonely, Tired. These are common triggers for urges.\n\nBefore making any decision, check:\n\nH - Am I Hungry? Eat something nutritious.\nA - Am I Angry? Take a walk, breathe, or talk to someone.\nL - Am I Lonely? Call a friend or join the chat.\nT - Am I Tired? Rest or take a nap.\n\nMost urges pass when you address these basic needs.\n\nToday's Challenge: Do the HALT check 3 times today.",
      summary: "Use the HALT method to check your basic needs before urges strike.",
      tags: JSON.stringify(["daily", "halt", "triggers"]),
      isModule: false,
      isActive: true,
    },
    {
      title: "Daily Tip: The 5-Minute Rule",
      slug: "daily-tip-5min",
      category: "daily_tip" as const,
      content: "When an urge hits, commit to waiting just 5 minutes.\n\n### The 5-Minute Rule:\n1. Set a timer for 5 minutes\n2. Tell yourself: I can gamble after 5 minutes if I still want to\n3. During those 5 minutes, do something else:\n   - Breathe deeply\n   - Call a friend\n   - Play a game in the Urge Arcade\n   - Visit your tree\n\n### Why It Works:\n- Urges peak and fade within minutes\n- Giving yourself permission reduces anxiety\n- Most people forget about the urge after 5 minutes\n\nToday's Challenge: Use the 5-minute rule at least once today.",
      summary: "Wait just 5 minutes when an urge hits - most urges fade quickly.",
      tags: JSON.stringify(["daily", "5min", "urge"]),
      isModule: false,
      isActive: true,
    },
  ];

  for (const item of contents) {
    await db.insert(recoveryContent).values(item);
  }

  console.log(`Seeded ${contents.length} recovery content items`);
}

seed().catch(console.error);
