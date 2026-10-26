/**
 * English edition of `../radiografia.ts`. Same ids, axes, option order and
 * band cut-offs: the option index IS its score, so the order must not move.
 */
import type * as es from "../radiografia.ts";
import type { AxisId, OperationType, Question } from "../radiografia.ts";
import type { Loc } from "../../lib/i18n.ts";

export type { AxisId, OperationType, Question } from "../radiografia.ts";

export const operationTypes: {
  id: OperationType;
  label: string;
  unidad: string;
  cliente: string;
}[] = [
  {
    id: "produce",
    label: "We produce or transform something physical",
    unidad: "an order or a batch",
    cliente: "customer",
  },
  {
    id: "servicios",
    label: "We provide services to other companies",
    unidad: "a project or a delivery",
    cliente: "client",
  },
  {
    id: "personas",
    label: "We serve people (patients, students, beneficiaries)",
    unidad: "a case or an appointment",
    cliente: "client or beneficiary",
  },
  {
    id: "comercializa",
    label: "We sell or distribute products",
    unidad: "an order or a shipment",
    cliente: "customer",
  },
];

export const DEFAULT_UNIDAD = "an order, a project or a case";
export const DEFAULT_CLIENTE = "customer";

export const sizes: Loc<typeof es.sizes> = [
  "Fewer than 10",
  "10 to 30",
  "31 to 80",
  "81 to 200",
  "More than 200",
];

export const axes: Record<AxisId, { name: string; priority: number; phrase: string }> = {
  dispersa: {
    name: "Scattered information",
    priority: 0,
    phrase:
      "The information about your operation exists, but it lives in several places at once. That makes every decision and every lookup more expensive.",
  },
  repetido: {
    name: "Repeated work",
    priority: 1,
    phrase:
      "Some of your team's hours are going into moving information from one place to another. It's one of the leaks that can be recovered fastest.",
  },
  visibilidad: {
    name: "Visibility",
    priority: 2,
    phrase:
      "Your operation works, but finding out how it's going takes effort. That means problems are seen late.",
  },
  seguimiento: {
    name: "Follow-up",
    priority: 3,
    phrase:
      "What happens with each customer depends on who is handling them. That's where opportunities are lost most quietly.",
  },
  dependencia: {
    name: "Dependence on people",
    priority: 4,
    phrase:
      "Key knowledge lives in people today, not in the organization. It's a risk you don't notice until you do.",
  },
  decisiones: {
    name: "Decisions and technology",
    priority: 5,
    phrase:
      "Decisions are being made with less information than the company actually has available.",
  },
};

export const questions: Question[] = [
  {
    id: "q1",
    axis: "repetido",
    prompt:
      "In a normal week, how much of your team's time goes into moving information from one place to another by hand?",
    hint: "From an email to a spreadsheet, from WhatsApp to a system, from paper to a computer.",
    options: [
      "Less than an hour across the whole organization",
      "Between one and five hours",
      "Between five and fifteen hours",
      "More than fifteen hours, or we've never measured it",
    ],
  },
  {
    id: "q2",
    axis: "repetido",
    prompt:
      "Think of a report or summary someone prepares every week or every month. How is it produced?",
    options: [
      "It comes straight out of the system, nobody builds it",
      "Someone builds it in under half an hour",
      "Someone spends several hours building it",
      "We don't have one, because building it would take too much time",
    ],
  },
  {
    id: "q3",
    axis: "dispersa",
    prompt:
      "If you needed an important business number right now (what was sold this month, delivered, served), in how many different places would you have to look?",
    options: [
      "Just one",
      "Two",
      "Three or more",
      "I'd have to ask several people to piece it together",
    ],
  },
  {
    id: "q4",
    axis: "dispersa",
    prompt:
      "How much of the important operation (instructions, approvals, orders, commitments) is recorded only in WhatsApp chats or loose emails?",
    options: [
      "None, everything ends up in a system",
      "A small part",
      "A good part",
      "Almost everything goes through there",
    ],
  },
  {
    id: "q5",
    axis: "visibilidad",
    prompt: "To know the status of {unidad} right now, what do you have to do?",
    options: [
      "I see it on screen instantly",
      "I look it up in a file or system, it takes me a few minutes",
      "I ask the person in charge",
      "It has to be pieced together by asking around",
    ],
  },
  {
    id: "q6",
    axis: "visibilidad",
    prompt: "How quickly can you know how the month is going without asking anyone for anything?",
    options: [
      "At any time, it's available",
      "The same day I ask for it",
      "I have to wait for someone to prepare it",
      "I only see it when the month closes",
    ],
  },
  {
    id: "q7",
    axis: "seguimiento",
    prompt:
      "Where is what happens with each {cliente} over time recorded (conversations, agreements, pending items)?",
    options: [
      "In a system anyone on the team can check",
      "In a shared, organized file",
      "Spread across each person's files and emails",
      "Mostly in the memory of whoever handles them",
    ],
  },
  {
    id: "q8",
    axis: "seguimiento",
    prompt:
      "In the last three months, how often has something slipped through for lack of follow-up (a payment, a reply, a commitment, a delivery)?",
    options: [
      "I can't recall a single case",
      "Once or twice",
      "Several times",
      "It happens fairly regularly",
    ],
  },
  {
    id: "q9",
    axis: "dependencia",
    prompt:
      "If the person who knows a key process best is away for two weeks without notice, what happens?",
    options: [
      "Someone else takes it over without trouble, it's documented",
      "It gets a little complicated, but it gets done",
      "That process falls noticeably behind",
      "That process practically stops",
    ],
  },
  {
    id: "q10",
    axis: "dependencia",
    prompt:
      "When someone new joins an operational role, how long until they work without needing things explained?",
    options: [
      "Less than a week, there's supporting material",
      "Two or three weeks",
      "One or two months",
      "Several months, or it depends on someone teaching them on the go",
    ],
  },
  {
    id: "q11",
    axis: "decisiones",
    prompt:
      "What was the last important decision about the operation (hiring, buying, changing something) based on?",
    options: [
      "On numbers I already had at hand",
      "On numbers that had to be put together for the occasion",
      "Mostly on experience and judgment",
      "On how things seemed at the time",
    ],
  },
  {
    id: "q12",
    axis: "decisiones",
    prompt: "Have you bought software or tools that ended up being used much less than expected?",
    options: [
      "It hasn't happened to us",
      "Once",
      "Several times",
      "Today we have paid tools that almost nobody uses",
    ],
  },
];

export const bands: Loc<typeof es.bands> = [
  {
    min: 0,
    name: "Solid foundation",
    verdict: "Your operation is more organized than most.",
    body: "Honestly, a full diagnosis probably isn't what would help you most today. If there's something specific bothering you, write to us and we'll give you our reading without a project involved.",
    insightBridge: false,
  },
  {
    min: 14,
    name: "Clear opportunity",
    verdict: "Your operation works. That's exactly what makes it hard to see where it's leaking.",
    body: "Companies that reach this score almost always have two or three leaks that can be recovered quickly. The work lies in knowing which one moves the needle before spending a single peso.",
    insightBridge: true,
  },
  {
    min: 26,
    name: "High opportunity",
    verdict: "Nothing you just read surprised you.",
    body: "You already knew where your time was going. You've known for months. The next question is exactly how much it's costing you, and which of those leaks to tackle first.",
    insightBridge: true,
  },
];

export const radiografia: Loc<typeof es.radiografia> = {
  eyebrow: "Auren X-Ray",
  title: "Find out in 3 minutes where your company is losing time and money.",
  lede: "Twelve questions in a business owner's language, not an engineer's. At the end you'll see your score, the leaks costing you most today and where it makes sense to start. Free, no sign-up, and nobody will call you unless you ask.",
  promises: [
    { k: "Takes", v: "3 minutes" },
    { k: "Costs", v: "Nothing" },
    { k: "Asks for", v: "None of your data" },
  ],
  value: {
    title: "It's the same judgment we use to diagnose a company, condensed into a self-assessment.",
    points: [
      "A score from 0 to 36 that places your operation honestly.",
      "The two or three leaks costing you most today, named.",
      "What your company gains by closing each one, and where to start.",
    ],
  },
  context: {
    intro: "Before we start, two questions so we can speak in your terms.",
    c1: {
      id: "c1",
      prompt: "How would you describe what your organization does?",
    },
    c2: {
      id: "c2",
      prompt: "How many people work in the organization?",
    },
  },
  scale: "Each option carries its score: 0 means no leak, 3 means a high leak. The total runs from 0 to 36.",
  naLabel: "Doesn't apply to my organization",
  nav: {
    back: "Back",
    next: "Next",
    finish: "See my X-ray",
    start: "Start",
    step: "Question",
    of: "of",
    context: "Context",
  },
  progress: {
    label: "X-ray progress",
    pending: "Answer all 12 to see your complete X-ray.",
  },
  result: {
    eyebrow: "Your X-ray",
    focusTitle: "Your leaks today",
    focusNone:
      "No leak shows up. That's uncommon: it's worth confirming with an outside look.",
    hoursByScore: {
      1: "Based on your answers, your team spends about 150 hours a year moving information by hand. That's almost a full month of one full-time person.",
      2: "Based on your answers, your team spends about 480 hours a year moving information by hand. That's three months of one full-time person.",
      3: "Based on your answers, your team spends more than 700 hours a year moving information by hand. That's four and a half months of one full-time person.",
    },
    bridge:
      "This X-ray shows you where to look. Putting numbers on these leaks (how much each one costs and which is worth transforming first) is the work of Auren Insight: our in-depth diagnosis, with visits to your company and a document stating what to do and in what order. It's a separate service; this reading is yours and costs nothing.",
    talk: "Would you like a first reading of these leaks, free of charge? Write to us on WhatsApp: your result is included in the message.",
    cta: "Talk about my result",
    ctaSub: "WhatsApp opens with your result ready to send. One of the two partners will reply.",
    insightCta: "See Auren Insight",
    insightHref: "/servicios/auren-insight",
    ctaSoft: "Write to us on WhatsApp",
    capacity: "We take on only a few diagnoses a month so we can do each one in depth.",
    offScale: {
      title: "Your operation falls outside the pattern this X-ray measures.",
      body: "That usually means a conversation is worth more than a score. We'd be glad to look at it with you on a short call.",
    },
    secondary: "Prefer to think it over? Share your result with your team and come back whenever you like.",
    reset: "Start over",
  },
};
