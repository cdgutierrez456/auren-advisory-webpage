/**
 * English edition of `../site.ts`. Same shape, same slugs, same order:
 * `en.test.ts` fails if a slug, a link or a list length drifts from the
 * Spanish source. Edit the Spanish first, then mirror it here.
 */
import type * as es from "../site.ts";
import type {
  Capability,
  Faq,
  Phase,
  Principle,
  Sector,
  Service,
  Testimonial,
} from "../site.ts";
import type { Loc } from "../../lib/i18n.ts";

export type { Faq, Figure, Service } from "../site.ts";

export const site: Loc<typeof es.site> = {
  name: "Auren Advisory",
  tagline: "See. Understand. Transform.",
  domain: "aurenadv.com",
  emails: ["cristiangutierrez@aurenadv.com", "juancalvo@aurenadv.com"],
  whatsapp: "573206548168",
  whatsappDisplay: "+57 320 654 8168",
  description:
    "Business transformation, automation and AI consulting in Colombia. We diagnose how your operation really works before recommending any technology.",
  descriptionLong:
    "Business transformation firm based in Manizales, Colombia. We observe how your company actually works, measure the cost of friction, and only then decide which technology —automation, data, artificial intelligence or custom software— makes sense.",
  city: "Manizales",
  region: "Caldas",
  geo: { lat: 5.0689, lng: -75.5174 },
};

export const nav: Loc<typeof es.nav> = [
  { label: "Approach", href: "/enfoque" },
  { label: "Services", href: "/servicios" },
  { label: "About", href: "/nosotros" },
  { label: "X-Ray", href: "/radiografia" },
  { label: "Demos", href: "/demos" },
  { label: "Resources", href: "/recursos" },
];

export const hero: Loc<typeof es.hero> = {
  eyebrow: "Business transformation",
  title: ["See.", "Understand.", "Transform."],
  titleSub:
    "Business transformation, automation and artificial intelligence consulting for companies in Colombia.",
  lede: "We help organizations find real opportunities and turn them into tailored solutions. First we observe how the company works. Technology comes after.",
  primary: { label: "Book a diagnosis", href: "/#contacto" },
  secondary: { label: "How we work", href: "/enfoque" },
  meta: [
    { k: "Industry", v: "Manufacturing and operations" },
    { k: "Services", v: "Service companies" },
    { k: "Technology", v: "Products and platforms" },
  ],
};

export const manifesto: Loc<typeof es.manifesto> = {
  quote:
    "Auren is not a company that sells artificial intelligence. It is the company that knows when, where and how to use it.",
  body: [
    "Most technology projects fail before a single line of code is written: someone buys a tool for a problem nobody diagnosed.",
    "Our work starts at the opposite end. We step into the operation, measure the real friction, and only then recommend —or rule out— technology.",
  ],
};

/** `title` doubles as the /enfoque anchor: `#see`, `#understand`, `#transform`. */
export const phases: readonly Phase[] = [
  {
    index: "01",
    title: "See",
    claim: "We observe the company as it really is.",
    detail:
      "People, processes, tools, data and friction points. No inherited assumptions and no product agenda.",
    question: "How does this company really work today?",
    body: [
      "Every operation has two versions: the documented one and the real one. The second is the one that produces, the one that fails, and the one you need to understand. We sit down with the people who run the process and walk through it with them, at their desk and with their tools.",
      "We don't arrive with a solution in our pocket. We arrive with questions: what gets repeated, what gets corrected afterwards, what is done in Excel because the system wouldn't allow it, which step exists only because someone asked for it six years ago.",
    ],
    points: [
      "Map of real processes and flows",
      "Inventory of systems and data",
      "Interviews with operations and leadership",
      "Log of friction and rework",
    ],
    output: "A map of the operation as it is, not as it is documented.",
    services: ["auren-insight"],
  },
  {
    index: "02",
    title: "Understand",
    claim: "We interpret causes, not symptoms.",
    detail:
      "We quantify costs, risks and transformation potential so the decision to invest is an informed one.",
    question: "What is causing the friction, and how much is it costing?",
    body: [
      "Seeing a delay doesn't explain why it happens. We separate symptom from cause: if invoices go out late, the problem may lie in the system, in the approval sequence, or in two departments using different definitions of the same data.",
      "Then we put numbers on it. Hours per month, rework, opportunity cost, compliance risk. Without that number the conversation about investing is a battle of opinions, and whoever talks loudest wins.",
    ],
    points: [
      "Root cause for each critical process",
      "Cost of inefficiency, in figures",
      "Operational and compliance risks",
      "Prioritization by impact and effort",
    ],
    output: "Quantified causes and opportunities ranked by what they return.",
    services: ["auren-insight", "auren-blueprint"],
  },
  {
    index: "03",
    title: "Transform",
    claim: "We design, implement and measure.",
    detail:
      "The right solution to the right problem, delivered in phases, with metrics agreed before we start.",
    question: "What do we build, in what order, and how will we know it worked?",
    body: [
      "Only here does technology appear, and it appears chosen: sometimes it's automation, sometimes a model, sometimes integrating two systems you already have, and sometimes simply removing a step that wasn't needed.",
      "We deliver in increments that work on their own, support the team that will use them, and measure against the metric agreed before we started. If the number didn't move, we say so.",
    ],
    points: [
      "Solution design and architecture",
      "Incremental implementation",
      "Adoption and team support",
      "Post-delivery impact measurement",
    ],
    output: "The solution running, adopted and measured against what was agreed.",
    services: [
      "auren-transform",
      "auren-flow",
      "auren-data",
      "auren-vision",
      "auren-studio",
      "auren-care",
    ],
  },
];

export const method: Loc<typeof es.method> = {
  eyebrow: "The method",
  title: "Three moves. In this order, always.",
  headline:
    "Our digital transformation consulting methodology: diagnosing the operation, analyzing causes and measured implementation.",
  lede: "It isn't a trademarked methodology or a consulting framework. It's the minimum order needed to avoid mistakes: look before you opine, understand before you propose, measure before you celebrate.",

  order: {
    title: "Why the order is non-negotiable",
    body: [
      "Almost every technology project that fails skipped a step. It starts at “Transform” because someone saw a demo, or at “Understand” on assumptions nobody went to the shop floor to check.",
      "Each phase produces the input for the next. Without the map of the operation there is no reliable root cause; without a quantified root cause there is no way to prioritize; without priorities, the implementation becomes a wish list ordered by whoever pushed hardest.",
      "It also helps you stop in time. If at the end of “Understand” it turns out the problem is solved by changing a procedure, the procedure gets changed and nothing gets bought. That is a valid outcome too.",
    ],
  },

  avoids: [
    {
      title: "Buying the wrong solution",
      body: "Expensive tools adopted because they were trendy and abandoned six months later, because they solved a problem the company didn't have.",
    },
    {
      title: "Automating the mess",
      body: "Putting technology on top of a poorly designed process only makes errors happen faster and at higher volume.",
    },
    {
      title: "Not being able to prove the result",
      body: "Projects that end with no one able to say what improved, because the starting point was never measured.",
    },
  ],
};

export const capabilities: readonly Capability[] = [
  {
    id: "ia",
    title: "Artificial intelligence",
    description:
      "Models applied to concrete decisions: classification, document extraction, internal assistants and prediction.",
  },
  {
    id: "datos",
    title: "Data",
    description:
      "Integration, quality and modeling. Turning scattered records into a foundation you can make decisions on.",
  },
  {
    id: "automatizacion",
    title: "Automation",
    description:
      "Removing repetitive tasks and manual hand-offs between departments, systems and suppliers.",
  },
  {
    id: "software",
    title: "Custom software",
    description:
      "Internal products when the market doesn't offer the piece: tools built for your exact operation.",
  },
  {
    id: "digitalizacion",
    title: "Digitization",
    description:
      "Processes on paper, spreadsheets and email turned into traceable, auditable and measurable flows.",
  },
  {
    id: "crm",
    title: "CRM",
    description:
      "Designing and implementing the sales process: a real pipeline, clean data and visibility for management.",
  },
  {
    id: "vision",
    title: "Computer vision",
    description:
      "Inspection, counting, quality control and plant safety from the cameras you already have.",
  },
];

export const services: readonly Service[] = [
  {
    slug: "auren-insight",
    name: "Auren Insight",
    kind: "Diagnosis",
    summary:
      "An X-ray of your operation: where time, money and control are being lost, backed by evidence and figures.",
    lede: "The starting point for everything. We step into the operation, observe it as it is —not as it is documented— and give you an honest reading of where the real opportunity lies.",
    body: [
      "Most companies know something isn't working, but the conversation stays at the level of perceptions: “sales is slow”, “information gets lost between the warehouse and billing”. Insight turns those perceptions into measured facts.",
      "We walk through the processes with the people who run them, review the systems you already have and quantify the cost of friction. At the end you know what hurts, how much it costs and what can be solved first.",
    ],
    signals: [
      "You suspect there is rework, but can't size it",
      "You've been offered software or AI and don't know if you need it",
      "Your data is spread across systems, emails and spreadsheets",
      "You're about to invest in technology and want to decide on evidence",
    ],
    includes: [
      "Interviews with leadership and with the people who run the process",
      "On-site walkthrough of the critical operation",
      "Map of the real processes and the systems that support them",
      "Quantification of the cost of inefficiency",
      "Presentation of findings to leadership",
    ],
    outcome: [
      "A report built on evidence, not opinions",
      "A list of opportunities prioritized by impact and effort",
      "Clarity to decide whether to invest —or not— in technology",
    ],
    keyword: "Business process assessment",
    headline: "Process and operations assessment, backed by evidence and figures",
    steps: [
      {
        title: "Framing with leadership",
        body: "A session to agree on what hurts, what has been tried before, which areas can be worked on and what is out of scope. We leave with the list of critical processes to review and the names of the people to interview.",
      },
      {
        title: "On-site walkthrough",
        body: "We go where the work happens: the plant, the warehouse, the counter, the billing desk. You understand a process by watching it run, not by reading the manual someone wrote three years ago.",
      },
      {
        title: "Interviews with the people doing the work",
        body: "Short conversations with the people in the process. What they redo, what they do in Excel because the system won't let them, which step exists only because someone once asked for it and nobody ever asked again.",
      },
      {
        title: "Quantifying the friction",
        body: "We put numbers on what we found: hours per month, frequency of rework, cost of delays and compliance risk. Without a figure there is no investment decision, just competing opinions.",
      },
      {
        title: "Findings and prioritization",
        body: "We present our findings to leadership, ranked by impact against effort, and say frankly what can be solved without buying technology. That is also an outcome of the diagnosis.",
      },
    ],
    industries: [
      {
        sector: "Manufacturing and agribusiness",
        body: "Production, quality, inventory and maintenance. Typically an under-used ERP coexists with paper forms on the floor and spreadsheets that hold the real schedule.",
      },
      {
        sector: "Transport and logistics",
        body: "Fleet paperwork, pre-trip inspections, compliance with Colombia's road-safety plan (PESV) and trip settlements. Heavy regulatory demands held together by folders and one person's memory.",
      },
      {
        sector: "Professional services and healthcare",
        body: "Scheduling, billing, collections and case tracking. Friction shows up in hand-offs between departments and in information asked twice of the same patient or client.",
      },
      {
        sector: "Public entities",
        body: "Citizen requests (PQRSD), procurement and control of legal deadlines. Here the cost of friction isn't only time: it's a missed deadline with disciplinary consequences.",
      },
    ],
    measures: [
      "Hours per month spent on manual tasks in each critical process",
      "Frequency and cost of the rework identified",
      "Current end-to-end cycle time of the processes reviewed",
      "Compliance risks with estimated exposure",
    ],
    faqs: [
      {
        q: "How long does a business diagnosis take?",
        a: "Between two and four weeks, depending on the number of processes and sites. The load on your team is light: 45-minute interviews and the on-site walkthrough. We don't ask you to prepare special reports for the diagnosis.",
      },
      {
        q: "What do I need to have ready before we start?",
        a: "Nothing prepared. Access to the people in the process and visibility of the systems you already use is enough. If you have documentation we read it, but we don't assume it's accurate: we check it against what actually happens at the workstation.",
      },
      {
        q: "Is it useful for a small company, or only for large ones?",
        a: "It's useful from about 15 people, which is when hand-offs between departments appear and the information stops fitting in one person's head. In smaller companies the diagnosis is usually shorter and focused on one or two processes.",
      },
      {
        q: "What if the diagnosis concludes I don't need technology?",
        a: "We tell you, and that is the deliverable. We don't sell licenses or take commissions from any vendor, so we have no incentive to recommend a purchase. Changing a procedure or removing a step is a valid and fairly common outcome.",
      },
      {
        q: "Am I obliged to hire you for the implementation?",
        a: "No. The report and the prioritization are yours, written so that any team —your own or a third party— can carry them out. Whether we continue is decided afterwards, with the findings on the table.",
      },
    ],
    deliverable: "Auren Insight report",
    duration: "2 to 4 weeks",
    next: "auren-blueprint",
  },
  {
    slug: "auren-blueprint",
    name: "Auren Blueprint",
    kind: "Design",
    summary:
      "The transformation plan: what gets done, in what order, with which technology and what to expect from each phase.",
    lede: "A diagnosis without a plan is a nice document. Blueprint turns the findings into an executable roadmap, with scope, sequence, owners and metrics agreed before anything starts.",
    body: [
      "We design the complete solution before writing code: how the process should work, which technology pieces support it, what gets bought, what gets built and what simply gets removed.",
      "The plan is split into increments that deliver value on their own. If leadership decides to stop after the first phase, what was delivered already works and already pays off.",
    ],
    signals: [
      "The problem is clear and you need to define the how",
      "Several initiatives are competing for the same budget",
      "You need to justify the investment to the board or partners",
      "You want to avoid buying a tool that nobody ends up using",
    ],
    includes: [
      "Design of the target process, not just the system",
      "Solution architecture and buy / build decisions",
      "Phased sequence with explicit dependencies",
      "Success metrics agreed for each phase",
      "Effort estimate and risk considerations",
    ],
    outcome: [
      "A roadmap your team can execute, with or without us",
      "Clear criteria for saying yes and for saying no",
      "An investment case you can defend to leadership",
    ],
    keyword: "Digital transformation roadmap",
    headline: "Digital transformation plan: scope, sequence and metrics",
    steps: [
      {
        title: "Designing the target process",
        body: "Before choosing a tool we define how the process should work. The redesign often removes entire steps, and that completely changes which technology is needed and what it costs.",
      },
      {
        title: "The buy-or-build decision",
        body: "We assess what an off-the-shelf tool solves, what requires custom development and what can be solved by integrating what you already have. We compare total cost, vendor lock-in and adoption effort.",
      },
      {
        title: "Solution architecture",
        body: "How the systems connect, where each piece of data lives, who owns it and what happens when something fails. Detailed enough for a technical team to quote and execute without guessing.",
      },
      {
        title: "Phased sequence",
        body: "We split the plan into increments that deliver value on their own, with explicit dependencies. If leadership decides to stop after phase one, what was delivered already works and already pays off.",
      },
      {
        title: "Metrics and investment case",
        body: "Each phase is tied to a metric agreed before starting and to an effort estimate. That is how the investment is justified to the board or partners without relying on vendor promises.",
      },
    ],
    industries: [
      {
        sector: "Companies with competing initiatives",
        body: "When IT, sales and operations ask for budget at the same time, the plan ranks by impact rather than by who pushed hardest in the committee.",
      },
      {
        sector: "Companies about to buy an ERP or a CRM",
        body: "The most expensive moment to get it wrong. Designing the target process before signing avoids paying years of licenses for a setup the business never adopted.",
      },
      {
        sector: "Internal tech teams without design capacity",
        body: "IT departments that can execute but are swallowed by support. The plan gives them the what and the order; the execution can be theirs.",
      },
    ],
    measures: [
      "Success metric defined for each phase, with a measured baseline",
      "Effort and total cost of ownership estimate for each option",
      "Dependencies and risks made explicit before committing budget",
    ],
    faqs: [
      {
        q: "Can I hire Blueprint without having done the diagnosis?",
        a: "Yes, when the problem is clearly bounded and there is evidence behind it. If the starting point is perceptions, starting with design means building on assumptions: in that case we recommend Auren Insight first, even a scoped-down one.",
      },
      {
        q: "Does the plan work if another vendor executes it?",
        a: "It's written for that. It includes scope, architecture and acceptance criteria in enough detail to quote and contract third parties. We don't leave ambiguous pieces that only we can interpret.",
      },
      {
        q: "Do you recommend specific tools?",
        a: "Yes, by name and with the technical and financial reasons behind them. We are not resellers and take no commissions, so the recommendation also covers when the cheaper option, or sticking with what you already have, is the better choice.",
      },
      {
        q: "How is this different from a software quote?",
        a: "A quote assumes you already know what to buy. The plan first defines how the process should work and only then which technology supports it, including the possibility that the answer is to buy less than you thought.",
      },
      {
        q: "How long does it take?",
        a: "Between three and five weeks for a scope of two to four processes. A company-wide transformation plan is tackled domain by domain, not as one giant deliverable nobody finishes reading.",
      },
    ],
    deliverable: "Prioritized roadmap",
    duration: "3 to 5 weeks",
    next: "auren-transform",
  },
  {
    slug: "auren-transform",
    name: "Auren Transform",
    kind: "Implementation",
    summary:
      "Executing the plan in increments, while supporting the teams that will use the solution.",
    lede: "We take the plan into production in phases. Each increment is delivered working, measured against what was agreed and adjusted with feedback from the people who use it every day.",
    body: [
      "Half the work is technical; the other half is adoption. A solution the team doesn't understand or doesn't trust is a solution that gets abandoned within three months.",
      "That's why we work alongside the people in the operation from the first increment: training, documentation and adjustments based on real use, not assumptions.",
    ],
    signals: [
      "You have a defined plan and need someone to execute it",
      "Previous implementation attempts were left half-finished",
      "Your internal team is stretched or lacks a specialty",
      "You need measurable results in months, not years",
    ],
    includes: [
      "Incremental implementation with working deliveries",
      "Integration with the systems the company already uses",
      "Training and documentation for the team",
      "Measurement against the metrics agreed in Blueprint",
      "Knowledge transfer at close",
    ],
    outcome: [
      "The solution running in production, not in an endless pilot",
      "A team able to use it and sustain it",
      "Measured evidence of the impact achieved",
    ],
    keyword: "Business software implementation",
    headline: "Implementing technology solutions in measurable increments",
    steps: [
      {
        title: "Kicking off the increment",
        body: "We define the scope of the first delivery: the smallest one that is already useful on its own in production. We agree on acceptance criteria and the metric it will be evaluated against.",
      },
      {
        title: "Build and integration",
        body: "Development, configuration and integration with what the company already uses: ERP, CRM, e-invoicing, payroll or the operational system. We prefer connecting to replacing.",
      },
      {
        title: "Testing with real users",
        body: "The increment is tested with the people who will use it, in their context and with their odd cases. That's where the exceptions no written requirement anticipated show up.",
      },
      {
        title: "Adoption and training",
        body: "Hands-on training, brief documentation and support during the first weeks of use. A solution the team doesn't understand or trust gets abandoned within three months.",
      },
      {
        title: "Measurement and next increment",
        body: "We compare against the agreed baseline. If the number moved, we continue with the next phase; if it didn't, we say so and adjust before investing more.",
      },
    ],
    industries: [
      {
        sector: "Manufacturing and agribusiness",
        body: "Plant digitization, production control, lot traceability and connecting what happens on the floor with what management sees.",
      },
      {
        sector: "Transport and logistics",
        body: "Pre-trip inspections, fleet document control, trip scheduling and settlement with auditable evidence for road-safety (PESV) compliance.",
      },
      {
        sector: "Services and retail",
        body: "Sales processes, billing, collections and after-sales: where rework is paid for in qualified people's time spent on data entry.",
      },
    ],
    measures: [
      "Process cycle time, before and after each increment",
      "Manual hours removed and rework avoided per month",
      "Real adoption: share of cases that go through the new solution",
      "Operational stability: incidents and response time",
    ],
    faqs: [
      {
        q: "How long until the first result shows up?",
        a: "The first increment typically goes into production between week six and week ten. We don't work with single deliveries at the end of the project: if something is going to go wrong, we'd rather find out with a small, cheap scope.",
      },
      {
        q: "Do you work with the systems we already have?",
        a: "Yes, and it's the first thing we assess. Replacing a system that works is rarely justified; connecting what already exists properly usually costs a fraction and disrupts the operation far less.",
      },
      {
        q: "What happens with the internal team during implementation?",
        a: "They work with us, not under us. From the start we define which parts your team takes on so that at close they can sustain and evolve the solution without depending on a permanent support contract.",
      },
      {
        q: "How do you handle scope changes midway?",
        a: "With short increments, a change goes into the next delivery instead of renegotiating the whole project. What we do require is that every change states which metric it serves; if it serves none, it usually isn't worth it.",
      },
      {
        q: "What if the result doesn't materialize?",
        a: "We say so with the data in hand and review the cause: it may be the design, the adoption, or that the chosen metric wasn't the right one. It's better to stop in phase two than to keep an unprofitable project going out of inertia.",
      },
    ],
    deliverable: "Solution in production",
    duration: "In phases, from 6 weeks",
    next: "auren-care",
  },
  {
    slug: "auren-data",
    name: "Auren Data",
    kind: "Data",
    summary:
      "Integrating and modeling scattered information into a reliable layer for querying and analysis.",
    lede: "Before you can analyze, you have to be able to trust. We unify the information that today lives spread across the ERP, the CRM, spreadsheets and emails, and turn it into a foundation you can actually make decisions on.",
    body: [
      "The usual symptom is familiar: two departments present different figures for the same month and the meeting is spent arguing about which one is right. That's not a dashboard problem, it's a model problem.",
      "We define where each figure comes from, how it's calculated and who owns it. Dashboards come afterwards, and then they actually help you make decisions.",
    ],
    signals: [
      "Each department reports different numbers for the same thing",
      "Putting a report together takes days of manual work",
      "The information exists, but nobody can access it in time",
      "You want to apply AI and first need your data in order",
    ],
    includes: [
      "Inventory of sources and assessment of data quality",
      "System integration and consolidation",
      "Data model with definitions agreed by each department",
      "Management dashboards on the indicators that matter",
      "Lineage documentation: where each figure comes from",
    ],
    outcome: [
      "A single version of the truth, agreed between departments",
      "Reports that generate themselves instead of being built by hand",
      "The technical foundation any AI project needs",
    ],
    keyword: "Data integration and management dashboards",
    headline: "Data integration, KPIs and dashboards for decisions based on figures",
    steps: [
      {
        title: "Inventory of sources",
        body: "Where the information lives today: ERP, CRM, billing, spreadsheets, forms and emails. We assess the quality and reliability of each source before connecting anything.",
      },
      {
        title: "Agreeing on definitions",
        body: "What counts as a sale, when it's considered closed, what goes into cost. Most discrepancies between departments aren't system errors: they're different definitions of the same indicator.",
      },
      {
        title: "Integration and consolidation",
        body: "We connect the sources and build the model: a layer where every figure has a traceable origin and a written calculation rule, not a formula hidden in a cell.",
      },
      {
        title: "Management dashboards",
        body: "The indicators leadership actually uses to decide, not forty charts nobody opens. Each dashboard answers a concrete business question.",
      },
      {
        title: "Lineage and maintenance",
        body: "We document where each number comes from and who owns it, and set alerts for when a source stops updating. A silently outdated dashboard is worse than none at all.",
      },
    ],
    industries: [
      {
        sector: "Manufacturing and agribusiness",
        body: "Real cost per lot, waste, yield per line and production-plan compliance, with figures that reconcile with accounting.",
      },
      {
        sector: "Retail and distribution",
        body: "Turnover, margin by product and customer, receivables and buying behavior. Consolidating stores or branches that report separately today.",
      },
      {
        sector: "Companies that want to apply artificial intelligence",
        body: "No model makes up for inconsistent data. This is the technical foundation that makes any AI project viable —or rules it out in time.",
      },
    ],
    measures: [
      "Days of manual work removed from report consolidation",
      "Gap between departments for the same indicator, before and after",
      "Data freshness: how long a fact takes to reach the dashboard",
      "Indicators with documented lineage and an assigned owner",
    ],
    faqs: [
      {
        q: "Do I need to buy a BI tool?",
        a: "Not necessarily. We assess what can be done with what you already have, including options with no license cost. The tool is the cheap part of the problem; the model and the agreed definitions are the part that really costs, and the part that gets dashboards used.",
      },
      {
        q: "My data is in Excel. Does that still work?",
        a: "It does, and it's the most common starting point. Spreadsheets often contain the real business logic, the logic that never made it into the system. That knowledge is rescued and formalized, not thrown away.",
      },
      {
        q: "Why does each department report a different number?",
        a: "Almost always because of unagreed definitions and different date cut-offs, not software failures. That's why agreeing on definitions is a step of the work and not an appendix: without it, the new dashboard just adds one more version to the argument.",
      },
      {
        q: "How long until the first dashboard is working?",
        a: "The full scope runs from four to ten weeks depending on how many sources there are. The first useful dashboard —one domain, a handful of indicators— is usually running well before that, and it's the one that validates the definitions are right.",
      },
      {
        q: "Who maintains this afterwards?",
        a: "Your team, if you prefer: we leave the model documented and the logic visible. When there's no internal profile available, Auren Care covers monitoring and evolution with periodic reviews.",
      },
    ],
    deliverable: "Data model and dashboards",
    duration: "4 to 10 weeks",
    next: "auren-flow",
  },
  {
    slug: "auren-flow",
    name: "Auren Flow",
    kind: "Automation",
    summary:
      "Automated flows between systems and departments, with traceability and exception handling.",
    lede: "Everything that moves today by email, by WhatsApp or by copying from one system to another is paid time that adds no value. Flow removes those manual hand-offs and leaves a trail of what happened.",
    body: [
      "Automating isn't putting a robot on top of a bad process: first we simplify the flow, then we automate it. Often the biggest savings are in the steps that get removed, not in the ones that get faster.",
      "Every flow comes with explicit exception handling. When something goes off-script, someone finds out; it doesn't get lost in silence.",
    ],
    signals: [
      "People are dedicated to copying data between systems",
      "Approvals are chased by email or chat",
      "Nobody knows where a request stands without asking",
      "Errors are detected late and cost rework",
    ],
    includes: [
      "Redesigning the flow before automating it",
      "Automation across your existing systems",
      "Exception rules and alerts to the people responsible",
      "Full traceability of every case",
      "Measurement of time and rework saved",
    ],
    outcome: [
      "Team hours given back to work that actually adds value",
      "Visibility of where each request stands",
      "Fewer errors, and the ones that happen are caught in time",
    ],
    keyword: "Business process automation",
    headline: "Process and workflow automation across departments and systems",
    steps: [
      {
        title: "Mapping the real flow",
        body: "We follow a request end to end: who creates it, how many hands it passes through, where it waits and where it gets lost. The documented flow and the real flow almost never match.",
      },
      {
        title: "Simplifying before automating",
        body: "We remove steps, duplicate approvals and data that gets asked for twice. The biggest savings are usually in what you stop doing, not in doing it faster.",
      },
      {
        title: "Automation between systems",
        body: "We connect the tools you already use so data travels on its own: no copy and paste, no exporting to Excel to upload again, no forwarding emails with attachments.",
      },
      {
        title: "Exception rules and alerts",
        body: "We define what happens when something goes off-script and who gets notified. An automation without exception handling fails silently, which is the worst way to fail.",
      },
      {
        title: "Traceability and measurement",
        body: "Every case keeps its trail: who did what and when. That answers “where is my request?” without calling anyone, and measures the time that was actually saved.",
      },
    ],
    industries: [
      {
        sector: "Transport and logistics",
        body: "Pre-trip inspections, tracking expiry of mandatory insurance (SOAT) and vehicle inspection certificates, route incidents and trip settlement with evidence for audits.",
      },
      {
        sector: "Public entities",
        body: "Filing and deadline control for citizen requests (PQRSD) in business days, routing by department and alerts before the legal deadline, not after.",
      },
      {
        sector: "Administration and finance",
        body: "Purchase orders, approvals, invoice accrual and reconciliations: the processes where email acts as the system and nobody knows where each case stands.",
      },
    ],
    measures: [
      "Hours per month of data entry and manual hand-off removed",
      "Request cycle time, from filing to close",
      "Share of cases resolved without manual intervention",
      "Exceptions caught in time versus late findings",
    ],
    faqs: [
      {
        q: "Which processes should be automated first?",
        a: "The repetitive ones, with stable rules and high volume: the ones that today eat up someone's hours copying information between systems. Processes that change every month or depend on expert judgment are stabilized before being automated.",
      },
      {
        q: "Does automating mean replacing people?",
        a: "In practice it means giving hours back to the team. What gets automated is data entry, follow-up and hand-offs between departments; what remains for people is what requires judgment, negotiation or dealing with the customer.",
      },
      {
        q: "Does it work if my systems are old and have no integration?",
        a: "There's almost always a way: scheduled exports, intermediate databases or automation on top of the existing interface. When there truly isn't, we say so before charging for the discovery.",
      },
      {
        q: "How much does it cost to maintain an automation?",
        a: "Little if it's well built, but never zero: processes change and integrations break when a vendor updates its system. We leave it monitored and with alerts, and that cost is stated upfront from the start.",
      },
      {
        q: "How long does it take to automate a flow?",
        a: "Between three and eight weeks per flow, including the redesign stage. We start with just one: it validates the approach with your people before committing more budget.",
      },
    ],
    deliverable: "Automated processes",
    duration: "3 to 8 weeks per flow",
    next: "auren-transform",
  },
  {
    slug: "auren-vision",
    name: "Auren Vision",
    kind: "Computer vision",
    summary:
      "Image and video analytics for inspection, counting and control in operational environments.",
    lede: "In plants and warehouses there's information nobody is capturing that the cameras are already seeing. Vision turns it into data: counting, quality inspection, compliance and safety.",
    body: [
      "We start with the infrastructure you already have. In most cases there's no need to replace cameras: what's needed is to process what they record properly.",
      "First we define which decision will change with that information. A system that detects defects but doesn't warn anyone in time is useless.",
    ],
    signals: [
      "Quality inspection depends on each shift's judgment",
      "Counting or inventory is done by hand, with discrepancies",
      "You need evidence of compliance in the operation",
      "You already have cameras installed that are only used for recording",
    ],
    includes: [
      "Feasibility assessment with real images from your operation",
      "A measured proof of concept before committing the investment",
      "A vision model tuned to your product and conditions",
      "Integration with the operation: alerts, dashboards or line stops",
      "A plan to maintain the model over time",
    ],
    outcome: [
      "Consistent inspection criteria across shifts and people",
      "Operational data that didn't exist before",
      "Early detection instead of late findings",
    ],
    keyword: "Computer vision for inspection and control",
    headline: "Computer vision and automated inspection with the cameras you already have",
    steps: [
      {
        title: "Defining the decision",
        body: "Before looking at images we define which decision will change: stopping a line, rejecting a lot, alerting a supervisor. A system that detects and tells no one changes nothing.",
      },
      {
        title: "Feasibility with real images",
        body: "We assess with material from your operation, not lab samples. Lighting, angle, line speed and product variability decide whether the case is viable before you invest.",
      },
      {
        title: "Measured proof of concept",
        body: "We build a scoped pilot and measure its accuracy against human inspection. The comparison is explicit: what it detects, what it misses and under which conditions it fails.",
      },
      {
        title: "Integration with the operation",
        body: "We connect the result to what you already use: an alert to the supervisor, a record in the quality system, a shift dashboard or a line stop. This is where the pilot becomes a tool.",
      },
      {
        title: "Model maintenance",
        body: "Products change, cameras get moved and the light in the plant isn't the same in January as in July. We leave a recalibration plan and monitoring for model drift.",
      },
    ],
    industries: [
      {
        sector: "Manufacturing and food",
        body: "Quality inspection, presence and position of components, in-line counting, label verification and detection of surface defects.",
      },
      {
        sector: "Warehouses and logistics",
        body: "License-plate reading at the gate, pallet counting, load verification and visual evidence tied to each dispatch.",
      },
      {
        sector: "Plant safety and compliance",
        body: "Use of protective equipment, occupancy of restricted areas and automatic reading of analog meters that someone writes down on a sheet today.",
      },
    ],
    measures: [
      "Model accuracy against human inspection, measured in your operation",
      "Coverage: share of parts or events inspected versus current sampling",
      "Time between the defect and the alert to whoever can fix it",
      "Variability of criteria between shifts, before and after",
    ],
    faqs: [
      {
        q: "Do I need to buy new cameras?",
        a: "In most cases, no. We start by assessing what's installed; sometimes relocating a camera or improving the lighting is enough, which is far cheaper than replacing the whole set. If hardware is needed, we say so with the feasibility assessment in hand.",
      },
      {
        q: "How accurate is it compared to a person?",
        a: "It depends on the case, which is why the pilot is measured before committing investment. In repetitive tasks with stable criteria it usually beats human inspection sustained over time, especially at the end of a shift; in tasks with complex criteria it works better as support than as a replacement.",
      },
      {
        q: "Do the images leave my company?",
        a: "That's defined at design time. Some cases run entirely on your network, with no video leaving the plant. When the cloud is used, we explicitly agree on what is sent, how long it's retained and who has access.",
      },
      {
        q: "What happens if the product or the line changes?",
        a: "The model is retrained with material from the new product. That work is estimated from the start: a vision system isn't a one-time purchase, it's a capability that gets maintained.",
      },
      {
        q: "How long until I know whether my case is viable?",
        a: "The feasibility assessment takes days, not months, because it's done with images you already have. The measured proof of concept takes three to six weeks, and that's where the decision to scale —or not— comes from.",
      },
    ],
    deliverable: "Vision system in operation",
    duration: "Proof of concept in 3 to 6 weeks",
    next: "auren-transform",
  },
  {
    slug: "auren-studio",
    name: "Auren Studio",
    kind: "Software",
    summary:
      "Building internal products when the right solution doesn't exist on the market.",
    lede: "Sometimes the tool your operation needs isn't for sale. Studio builds it: software made for your exact process, without paying for features you'll never use or bending the operation to fit someone else's product.",
    body: [
      "Building custom isn't always the right answer, and we say so when it isn't. If there's an off-the-shelf tool that solves 90% of it, you should buy it.",
      "When it does make sense, we deliver software your team can maintain: documented code, explained decisions and no dependencies that tie you to us.",
    ],
    signals: [
      "You evaluated market tools and none of them fit",
      "Your competitive edge lies precisely in that process",
      "You pay licenses for features nobody uses",
      "You're adapting the operation to the software instead of the other way around",
    ],
    includes: [
      "Defining the minimum scope that is already useful in production",
      "Product and interface design based on real use",
      "Development, testing and deployment",
      "Integration with existing systems",
      "Code, documentation and hand-over to the team",
    ],
    outcome: [
      "A tool that fits how the company works",
      "Ownership of the code and freedom from the vendor",
      "Predictable operating cost, with no per-user licenses",
    ],
    keyword: "Custom software development",
    headline: "Custom software development for processes that don't fit a product",
    steps: [
      {
        title: "Validating the decision",
        body: "First we review the market. If there's a tool that solves ninety percent of it, you should buy it and we'll tell you so, even if that means a smaller project for us.",
      },
      {
        title: "Minimum useful scope",
        body: "We define the smallest version that is already useful in production. Every feature that doesn't make that first version is written down, prioritized and visible, not discarded.",
      },
      {
        title: "Design based on real use",
        body: "We design the screens with the people who will work on them eight hours a day. A poorly ordered form is paid for in data-entry errors for years.",
      },
      {
        title: "Development, testing and deployment",
        body: "Built in increments, with automated tests on the logic that matters and integration with existing systems. It's deployed early and corrected based on real use.",
      },
      {
        title: "Hand-over to the team",
        body: "Code, documentation and explained decisions. The goal is for another team to pick up the project without archaeology: the software belongs to you, including the freedom to change vendors.",
      },
    ],
    industries: [
      {
        sector: "Operations with their own process",
        body: "When the process is precisely the competitive advantage and no product on the market reflects it without distorting it.",
      },
      {
        sector: "Customer and supplier portals",
        body: "Filing, tracking and self-service: taking off email and the phone whatever the customer can solve on their own, with traceability.",
      },
      {
        sector: "Internal operations tools",
        body: "Scheduling, shop-floor control, settlements and mobile apps for field work, including offline operation.",
      },
    ],
    measures: [
      "Adoption: share of the operation that already runs through the tool",
      "Capture errors and rework versus the previous process",
      "Total operating cost versus the per-user license alternative",
      "Response time to a change requested by the operation",
    ],
    faqs: [
      {
        q: "When does custom software make sense, and when should I buy?",
        a: "Buying wins when the process is standard and there's a mature product: accounting, payroll, e-invoicing. Custom wins when the process is your differentiator, when you're paying licenses for features nobody uses, or when you've spent years bending the operation to fit someone else's tool.",
      },
      {
        q: "Who owns the code?",
        a: "You do. It's delivered with documentation and with no dependencies that tie you to us. We don't work with arrangements where the client loses the tool when the contract ends.",
      },
      {
        q: "How much does it cost to maintain your own software?",
        a: "There's a real cost for infrastructure and evolution, and it's estimated from the beginning instead of showing up later. In operations with many users it usually ends up below per-seat licenses; for small teams the numbers need careful work, and sometimes buying turns out to be better.",
      },
      {
        q: "How long does the first version take?",
        a: "Eight to fourteen weeks for a first version that already runs with real users. If the proposed scope doesn't fit in that, we split it: we'd rather have something small working than something big under construction indefinitely.",
      },
      {
        q: "Can it integrate with my ERP?",
        a: "That's the norm, and it's assessed before committing scope. The integration is designed so the ERP remains the source of truth for what belongs to it: the custom tool covers the process the ERP doesn't model well, it doesn't duplicate it.",
      },
    ],
    deliverable: "Custom software",
    duration: "First useful version in 8 to 14 weeks",
    next: "auren-care",
  },
  {
    slug: "auren-care",
    name: "Auren Care",
    kind: "Continuity",
    summary:
      "Support, evolution and ongoing measurement of what was implemented. Transformation doesn't end at delivery.",
    lede: "Processes change, data degrades and models lose accuracy. Care keeps what was implemented alive and keeps adjusting it as the company changes.",
    body: [
      "The point isn't to leave you dependent on a vendor. It's that someone responds when something fails, and that improvements don't stay on the IT department's wish list.",
      "Every quarter we review what's paying off, what has drifted from the agreed metric and what should be adjusted or retired.",
    ],
    signals: [
      "You've already implemented something and have no one to sustain it",
      "Your internal team is putting out fires and never gets to improve",
      "You want to know whether your investment is still paying off",
      "Models or automations have degraded over time",
    ],
    includes: [
      "Support with agreed response times",
      "Monitoring of automations and models in operation",
      "Incremental improvements prioritized with leadership",
      "Quarterly impact review against what was agreed",
    ],
    outcome: [
      "Operational continuity without relying on internal heroes",
      "Periodic evidence that the investment is still paying off",
      "An orderly path for what comes next",
    ],
    keyword: "Solution support and evolution",
    headline: "Support, monitoring and continuous evolution of what was implemented",
    steps: [
      {
        title: "Operational baseline",
        body: "We document what's running, what it depends on, what breaks when each piece fails and who needs to be notified. Without that map, support is expensive guesswork.",
      },
      {
        title: "Monitoring and support",
        body: "We watch automations, integrations and models in operation, with agreed response times. We'd rather find out from an alert than from a call from operations.",
      },
      {
        title: "Prioritized improvements",
        body: "Day-to-day requests are ranked with leadership by impact, not by how long they've been on the list. What doesn't contribute gets retired: keeping dead features around costs money too.",
      },
      {
        title: "Quarterly impact review",
        body: "Every quarter we check against the agreed metric: what's still paying off, what has drifted and what should be adjusted. If something stopped contributing, the recommendation is to switch it off.",
      },
    ],
    industries: [
      {
        sector: "Companies without their own IT department",
        body: "When what was implemented ended up depending on a single person who also has four other jobs.",
      },
      {
        sector: "Internal teams swallowed by support",
        body: "Departments that put out fires and never get to improve. Care takes over running what was delivered to free up that capacity.",
      },
      {
        sector: "Models and automations in production",
        body: "Anything that learns from data degrades on its own. Without monitoring, the loss of accuracy shows up as user distrust long before it shows up in a report.",
      },
    ],
    measures: [
      "Availability of critical automations and integrations",
      "Response and resolution time against what was agreed",
      "Drift of models in operation relative to their baseline",
      "Sustained impact against the original metric, reviewed every quarter",
    ],
    faqs: [
      {
        q: "Can I hire support for something another vendor implemented?",
        a: "Yes, after a technical review. We need to understand what's running and what state it's in before committing to response times: taking over something we don't know would mean promising what we can't deliver.",
      },
      {
        q: "Does this lock me in with you?",
        a: "That's not the goal. Documentation and knowledge are kept up to date precisely so you can move the operation to an internal team whenever you decide. Care exists to fill a gap, not to create a dependency.",
      },
      {
        q: "What exactly does the monthly service include?",
        a: "Monitoring, support with agreed times, incremental improvements within a defined allowance and the quarterly impact review. Anything beyond that allowance is quoted separately and stated beforehand, not on the invoice.",
      },
      {
        q: "Why does a model or an automation degrade?",
        a: "Because the world around it changes: a vendor updates its system, the operation starts recording things differently, the product changes its packaging. None of that sends a warning; that's why it's monitored.",
      },
    ],
    deliverable: "Managed service",
    duration: "Monthly, with quarterly review",
    next: "auren-insight",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const about: Loc<typeof es.about> = {
  eyebrow: "About",
  title: "We were born seeing the same problem over and over.",
  headline:
    "Business transformation, automation and artificial intelligence consultancy based in Manizales, Caldas, Colombia.",
  lede: "Auren Advisory was founded in Manizales in 2026 as a partnership between two entrepreneurs who had spent years working with companies in the region and kept running into the same scene: capable teams spending half the day on tedious tasks no business should still be doing by hand.",

  origin: [
    "Invoices typed in twice. Inventories reconciled at eleven at night. Reports that exist because someone builds them every Monday by copying cells. These weren't badly run companies: they were good companies carrying processes nobody had reviewed in years.",
    "At the same time we saw the opposite reaction, just as costly: buying an expensive tool for a problem nobody had diagnosed, and leaving it unused six months later. Between doing nothing and buying on trend, someone was missing who would look first.",
    "Auren exists to fill that gap. We go in to see how the company really works, understand what that friction is costing, and only then decide which technology —or which simplification without technology— makes sense.",
  ],

  disciplines: [
    {
      index: "01",
      title: "Technical",
      body: "Software engineering, data, automation and models. We know what can be built, what it costs to sustain, and when the right answer is to build nothing.",
    },
    {
      index: "02",
      title: "Practical",
      body: "Operational knowledge: how an order moves, where an approval gets stuck, why the night shift does things differently. Without that, any solution is designed in a vacuum.",
    },
    {
      index: "03",
      title: "Empirical",
      body: "What we learned in real implementations, including the ones that didn't go as expected. We measure before and after because intuition alone is often wrong.",
    },
  ],

  founders: [
    {
      name: "Juan Manuel Calvo Duque",
      role: "Founding Partner · Head of Solutions and Applied AI",
      email: "juancalvo@aurenadv.com",
    },
    {
      name: "Cristian David Gutiérrez Bedoya",
      role: "Founding Partner · Head of Engineering and Automation",
      email: "cristiangutierrez@aurenadv.com",
    },
  ],

  facts: [
    { k: "Founded", v: "2026" },
    { k: "Origin", v: "Manizales, Colombia" },
    { k: "Structure", v: "Two founding partners" },
    { k: "Coverage", v: "On-site in the Coffee Region, remote across the rest of Colombia" },
  ],

  boundaries: [
    "We don't sell licenses or take commissions from any software vendor. If we recommend a tool, it's because it fits.",
    "We don't start with technology. If the diagnosis says the problem is solved by changing a procedure, that's what we'll tell you.",
    "We don't leave black boxes. The team keeps the documentation, the knowledge and, where applicable, the code.",
  ],

  photo: undefined,

  region: {
    title: "Why Manizales matters here",
    body: "Colombia's Coffee Region concentrates manufacturing, agribusiness and service companies with complex operations and small teams: exactly the profile where a well-chosen automation changes the daily life of an entire company. We work on-site with our clients in the region and remotely with the rest of the country.",
  },
};

export const principles: readonly Principle[] = [
  {
    title: "Diagnosis comes first",
    body: "We don't propose technology before understanding the process. If the problem doesn't need it, we say so.",
  },
  {
    title: "Impact gets measured",
    body: "Every phase is agreed with a metric. If it can't be measured, it can't be defended to leadership.",
  },
  {
    title: "The team keeps the solution",
    body: "We document and transfer. The goal isn't for you to depend on us indefinitely.",
  },
];

export const contact: Loc<typeof es.contact> = {
  title: "Let's start by seeing.",
  lede: "A no-commitment diagnostic conversation: we understand your operation and tell you frankly where the real opportunity is.",
};

export const sectors: readonly Sector[] = [
  {
    id: "manufactura",
    title: "Manufacturing and agribusiness",
    body: "Plants where the ERP is half-used, the real schedule lives in a spreadsheet and quality control depends on each shift's judgment. The cost hides in waste, rework and someone's hours reconciling figures at night.",
    cases: [
      "Production control and lot traceability",
      "Quality inspection with computer vision",
      "Real cost per lot and per line",
      "Maintenance and unplanned stoppages",
    ],
    services: ["auren-insight", "auren-vision", "auren-data"],
  },
  {
    id: "transporte",
    title: "Transport and logistics",
    body: "Operations with heavy regulatory demands held together on paper: pre-trip inspections nobody reads, insurance and inspection certificates found expired too late, and settlements built by hand trip by trip.",
    cases: [
      "Digital pre-trip inspection with evidence",
      "Fleet document control and expiry alerts",
      "Road-safety plan (PESV) compliance with an auditable trail",
      "Trip settlement and cost control",
    ],
    services: ["auren-flow", "auren-studio", "auren-data"],
  },
  {
    id: "servicios",
    title: "Services, healthcare and retail",
    body: "Companies where margin is lost in the hand-offs: information asked for twice, approvals chased over chat, and receivables discovered overdue when there's no longer anyone to talk to.",
    cases: [
      "Sales process and CRM with clean data",
      "Scheduling, billing and collections",
      "Self-service portals for customers",
      "After-sales and case tracking",
    ],
    services: ["auren-flow", "auren-data", "auren-studio"],
  },
  {
    id: "publico",
    title: "Public entities",
    body: "Where friction doesn't only cost time: a missed deadline has disciplinary consequences. Control usually sits in an Excel file that only one person understands and nobody checks on Fridays.",
    cases: [
      "Citizen requests (PQRSD) with deadline control in business days",
      "Routing by department and alerts before the deadline",
      "Compliance dashboards for internal control",
      "Digitizing case files and filing",
    ],
    services: ["auren-flow", "auren-insight", "auren-studio"],
  },
];

export const homeFaqs: readonly Faq[] = [
  {
    q: "What exactly does a business transformation firm do?",
    a: "It analyzes how a company really operates, identifies where time, money and control are being lost, and turns that into an executable plan for change. In our case it includes implementing what was decided —automation, data, custom software or computer vision— and measuring whether it worked. It's not just a report with recommendations.",
  },
  {
    q: "How do I know if my company needs to automate processes?",
    a: "The signs are concrete: people dedicated to copying data between systems, approvals chased by email or WhatsApp, reports built by hand every week, and nobody able to say where a request stands without asking. If you recognize three or more, there's a case. The Auren X-Ray on this site estimates it for you in ten minutes, with no sign-up.",
  },
  {
    q: "How much does a digital transformation project cost?",
    a: "It depends on the scope, which is why we start with the diagnosis: two to four weeks to know, with evidence, where the opportunity is and how much it's worth solving. With that figure in hand, the budget conversation stops being a gamble. We never quote an implementation without having seen the operation.",
  },
  {
    q: "Do you work with small businesses or only with large companies?",
    a: "We work with mid-sized companies and SMEs with complex operations, which is where a well-chosen automation changes a team's entire day. From about fifteen people, the hand-offs between departments that justify the work already appear. Size matters less than the complexity of the process.",
  },
  {
    q: "Does my company need artificial intelligence?",
    a: "Probably not yet, and saying so is part of our job. AI pays off on orderly data and stable processes; applied to inconsistent information it produces convincing, wrong answers. First the data gets organized and the process simplified. When the case justifies it, we apply it and measure it.",
  },
  {
    q: "Do you work outside Manizales and the Coffee Region?",
    a: "Yes. We work on-site in Manizales, Pereira, Armenia and the Coffee Region, and remotely with the rest of Colombia. The on-site walkthrough of the diagnosis is always done in person: there are things about an operation you can't see over a video call.",
  },
];

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "We came asking for software and left with something better: a map of where our time was going. Two of the three things we were about to buy weren't needed.",
    role: "Operations Manager · Manufacturing",
    service: "auren-insight",
    borrador: true,
  },
  {
    quote:
      "The first time someone told us what the friction was costing in pesos. With that figure, the board approved the project in a single meeting.",
    role: "Finance Director · Service company",
    service: "auren-blueprint",
    borrador: true,
  },
  {
    quote:
      "The process we built is still running on its own a year later, and when something fails we know where. That's what we had never had.",
    role: "Head of Processes · Logistics",
    service: "auren-flow",
    borrador: true,
  },
];
