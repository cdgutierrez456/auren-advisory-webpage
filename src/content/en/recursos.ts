/**
 * English edition of `../recursos.ts`. Same slugs, services and related
 * articles as the Spanish source — `en.test.ts` checks it.
 */
import type { Post } from "../recursos.ts";

export type { Post, Section } from "../recursos.ts";

export const posts: readonly Post[] = [
  {
    slug: "senales-de-que-su-empresa-necesita-automatizacion",
    title: "Seven signs your company is ready to automate its processes",
    seoTitle: "How to tell if your company needs automation",
    description:
      "Seven measurable signs that your company needs process automation, how to quantify what it costs you today and where it makes sense to start.",
    keyword: "how to know if my company needs automation",
    published: "2026-08-12",
    minutes: 8,
    lede: "Almost no company decides to automate because it read an article. It decides when someone puts on a sheet how many hours a month go into work no person should be doing. These are the seven signs that show up before that sheet does, and how to put a number on them.",
    sections: [
      {
        heading: "First: automating is not buying software",
        body: [
          "It's worth clarifying before the list, because almost every project that fails skips this distinction. Automating a process means getting a sequence of steps to happen without someone having to push it along: without copying data from one system to another, without chasing an approval over WhatsApp, without building the same report every Monday.",
          "Sometimes that is achieved with a new tool. Other times it is achieved by connecting two systems the company already pays for. And with uncomfortable frequency it is achieved by removing the step, because it only existed to correct an error that another step no longer makes. The tool is the last decision, not the first.",
        ],
      },
      {
        heading: "1. There are people whose job is moving data between systems",
        body: [
          "It's the clearest sign and the easiest to quantify. Someone exports from one system, adjusts in Excel and uploads to another. Sometimes it's half an hour a day; sometimes it's a full-time person. If that person is also the only one who knows how to do it, the company doesn't have a process: it has a dependency.",
          "To put a number on it, a single question to whoever does it is enough: how many times a week, and how long does it take each time. Multiply by four and you have the hours per month. It's a figure that tends to surprise on the high side, especially once you add up three or four similar tasks spread across different departments.",
        ],
      },
      {
        heading: "2. Nobody can say where a request stands without asking",
        body: [
          "If finding out the status of an order, a purchase order or a customer request means calling someone, the process has no traceability. The cost isn't just the call: it's that problems are discovered when it's already too late, because nobody was watching the point where it got stuck.",
          "This sign has a telltale symptom: follow-up meetings whose only purpose is for each department to say where things stand. That meeting is a report the system should be producing on its own.",
        ],
      },
      {
        heading: "3. Approvals live in email or chat",
        body: [
          "A discount approved over WhatsApp leaves no usable trail. When someone asks six months later who authorized that price, the answer is a search through a chat, assuming the person is still with the company.",
          "Here the cost has two sides: the time spent chasing the sign-off —which is usually the real bottleneck of the process, not the work itself— and the risk of not being able to prove the authorization when it matters. In regulated sectors, the second side is the expensive one.",
        ],
      },
      {
        heading: "4. The same data is typed in more than once",
        body: [
          "The customer's details are written on the quote, written again on the order and written a third time on the invoice. Every entry is a chance for error, and the error is discovered at the end: in the wrong shipment or the rejected invoice.",
          "A practical rule: count how many times the same piece of data is typed by hand across the whole journey. If it appears more than once, rework is guaranteed and you're probably already paying for it in credit notes.",
        ],
      },
      {
        heading: "5. Management reports are built by hand",
        body: [
          "If consolidating the monthly report takes someone two days of copying cells, there are two problems, not one. The first is obvious: those days. The second is worse: because it's so costly to produce, nobody asks for the data between closings, and decisions are made on information that is three weeks old.",
          "The sign that confirms this point is familiar in any committee: two departments present different figures for the same month and the meeting is spent arguing about which one is right. That isn't fixed with a new dashboard; it's fixed by agreeing on definitions and tracing where each number comes from.",
        ],
      },
      {
        heading: "6. Errors are caught late, and always from the same side",
        body: [
          "If the customer is the one who tells you the order went wrong, control is on the outside. Manual processes fail silently: there's no alert, no exception, just a case that kept moving forward with the wrong data until it ran into someone.",
          "It's worth listing the last five errors that cost money and asking at which step they originated and at which step they were discovered. The distance between those two points is what automation shortens.",
        ],
      },
      {
        heading: "7. Knowledge of the process lives in a single person",
        body: [
          "There's someone who knows how it's really done, which exceptions exist and who to call when something goes off-script. When that person goes on vacation, the process slows down; when they resign, it becomes chaotic.",
          "Automating well forces you to write those rules down, and that exercise has value even if nothing ends up being automated. A process that only exists in someone's head can't be improved, audited or delegated.",
        ],
      },
      {
        heading: "How to put a figure on it before asking for budget",
        body: [
          "None of the seven signs justifies an investment on its own. What justifies it is the sum, and the sum is calculated with a simple table any department head can fill in over an afternoon: for each manual task identified, how many times a month it happens, how long it takes and what an hour of the person doing it is worth.",
          "Add to that figure what rework costs: credit notes, repeated shipments, overtime at closing. And add compliance risk where it applies, which in regulated sectors often outweighs everything else combined.",
          "With that number on the table, the tone of the conversation changes. It stops being “we should modernize” and becomes “this costs this much a month and solving it costs this much”. The first version is a battle of opinions; the second is a decision.",
        ],
        list: [
          "Monthly frequency of each manual task identified",
          "Average duration and hourly cost of whoever does it",
          "Rework: how many cases a month and what each one costs",
          "Exposure from non-compliance, when the process is regulated",
        ],
      },
      {
        heading: "Where to start without committing half the budget",
        body: [
          "Start with a single flow, and not the most complicated one. The goal of the first one isn't maximum savings: it's proving to the team that this works and learning how your operation reacts to change. A repetitive process with stable rules and high volume is the ideal candidate.",
          "Before automating it, redesign it. The question isn't how to do what's done today faster, but which steps would no longer be needed if the process were designed from scratch. Automating a poorly designed process only makes errors happen faster and at higher volume.",
          "And define in advance how you'll know it worked. One metric, measured before starting. Without a baseline, at the end of the project nobody will be able to prove what improved, and the next investment will once again be a battle of opinions.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many of these signs justify automating?",
        a: "Three are usually enough for the numbers to work, but what decides isn't the number of signs, it's the accumulated cost. A single task that eats twenty hours a month justifies more than four low-impact signs.",
      },
      {
        q: "Can I automate without changing systems?",
        a: "In most cases, yes. A good part of the work consists of connecting tools the company already pays for and only half uses. Replacing the core system is the most expensive option and the one that disrupts the operation most: it's evaluated last, not first.",
      },
      {
        q: "How long does it take to automate a process?",
        a: "A scoped flow takes three to eight weeks, including the prior redesign. Projects announced as six months long are almost always bundling several flows that would be better delivered separately.",
      },
    ],
    services: ["auren-flow", "auren-insight"],
    related: ["que-es-la-transformacion-digital-para-pymes", "software-a-la-medida-o-saas"],
  },
  {
    slug: "que-es-la-transformacion-digital-para-pymes",
    title: "What digital transformation means for SMEs (and what it doesn't)",
    seoTitle: "What digital transformation means for SMEs",
    description:
      "What digital transformation really means in a mid-sized Colombian company, what it isn't, what getting it wrong costs and how to approach it in phases.",
    keyword: "what is digital transformation for SMEs",
    published: "2026-08-19",
    minutes: 9,
    lede: "The term is used to sell very different things: accounting software, a website, an innovation course and an artificial intelligence project. It's worth separating what it is, what it isn't and what actually changes inside a mid-sized company in Colombia.",
    sections: [
      {
        heading: "A definition you can make decisions with",
        body: [
          "Digital transformation is changing how a business process works using technology, so that it produces a different, measurable result: less time, fewer errors, more control or information that didn't exist before.",
          "All three parts matter. If the process doesn't change, it's a software purchase. If there's no technology involved, it's process improvement —just as valid, but a different thing—. And if the result can't be measured, there's no way to know if it worked, which is exactly the state most of these projects end up in.",
          "Under that definition, digitizing a paper form into a PDF that is still filled in by hand and filed in a folder isn't digital transformation: it's the same process on a different medium. On the other hand, turning that inspection into a mobile form that blocks the vehicle from leaving when a critical item fails is, because what happens has changed.",
        ],
      },
      {
        heading: "What it isn't",
        body: [
          "It's worth naming the most expensive confusions, because each one comes with a salesperson attached.",
          "It isn't buying an ERP. An ERP is a tool, and in a company with poorly defined processes it amplifies the mess with monthly licenses. Nor is it having a digital presence: a website and social media are marketing channels, not a transformation of the operation.",
          "It isn't an innovation project with walls of sticky notes. Workshops help with alignment, but what changes an operation is someone implementing and measuring. And it definitely isn't applying artificial intelligence. AI is one technique among several; in most Colombian SMEs there are three or four more profitable problems to solve before getting to it.",
        ],
        list: [
          "Buying an ERP, a CRM or any platform before defining the target process",
          "Confusing digital presence —web, social media, e-commerce— with transforming the operation",
          "Innovation workshops with nobody assigned to implement what comes out of them",
          "Starting with artificial intelligence when the data still doesn't reconcile between departments",
        ],
      },
      {
        heading: "Why it's different in an SME",
        body: [
          "A large company can afford a two-year project with a dedicated team. A sixty-person company can't: whoever leads the change also has to get the month's operation out the door. That constraint isn't a flaw; it's the most important design input of the project.",
          "Three practical consequences follow. The project must deliver value in parts, because nobody will sustain eighteen months of faith. The scope of each part must fit the team's real capacity, not the ideal one. And the solution has to be operable without a ten-person IT department, because there isn't one.",
          "The advantage makes up for it: in a mid-sized company decisions are made quickly, the manager knows the operation first-hand and a well-chosen change is felt in weeks, not quarters.",
        ],
      },
      {
        heading: "What it looks like in practice: three concrete examples",
        body: [
          "In manufacturing, the typical case isn't a robot: it's the production log no longer being filled in on paper and starting to feed a dashboard where the cost per lot appears the same day instead of at month-end close. With that, the conversation about waste shifts from anecdotal to factual.",
          "In transport, it's the expiry dates of mandatory insurance (SOAT) and vehicle inspection certificates no longer living in a spreadsheet and sending alerts on their own thirty days in advance, and the pre-trip inspection leaving evidence that holds up in a road-safety (PESV) audit.",
          "In a service company, it's the customer's request having a status anyone can check and a visible owner, instead of an email thread where nobody knows if someone has already replied. None of the three is spectacular. All three change someone's day.",
        ],
      },
      {
        heading: "The order that prevents expensive mistakes",
        body: [
          "The failure pattern is always similar: someone sees a demo, buys the tool and then tries to fit the operation around it. Six months later the system is half-used, the Excel file is back and the company's conclusion is that “technology didn't work”.",
          "The order that prevents it holds no mystery. First look at how the operation works today, with the people who run it and at the workstation where it happens. Then understand what causes the friction and how much it costs, in figures. Only then decide what gets built, in what order and with which metric.",
          "That order also helps you stop in time. If at the end of the analysis it turns out the problem is solved by changing a procedure, the procedure gets changed and nothing gets bought. Saving an unnecessary purchase is as valid an outcome as a successful implementation.",
        ],
      },
      {
        heading: "What it costs and how to budget for it without gambling",
        body: [
          "The question always comes, and the honest answer is that it depends on the scope. What can be bounded is the first step: a two-to-four-week diagnosis that returns the current cost of the friction and a prioritized list of what to solve first.",
          "That deliverable turns the budget into a comparison instead of a gamble: this costs this much a month, solving it costs this much, it pays back in this much time. It's also what lets you justify the investment to a board without leaning on the promises in a vendor's brochure.",
          "And it lets you decide in stages. The first phase is approved, measured, and the second is approved with your own evidence rather than projections. It's slower on paper and considerably faster in reality, because nothing has to be undone.",
        ],
      },
    ],
    faqs: [
      {
        q: "Where does an SME that has never done this start?",
        a: "With a scoped diagnosis of one or two critical processes, not a transformation of the whole company. The goal of the first step is to have a figure for the current cost and a clear priority; with that, the following decisions stop being intuition.",
      },
      {
        q: "How long does it take to see results?",
        a: "With a well-split scope, the first change in production shows up between week six and week ten. If the plan you're presented with delivers nothing useful before six months, it's probably bundling things that can be delivered separately.",
      },
      {
        q: "Do I need to hire IT staff to sustain it?",
        a: "Not always. It depends on what gets implemented: some solutions an administrative team runs without trouble, and others require a technical profile. That question is answered during design, because it changes what's worth building.",
      },
      {
        q: "Does it work if my company is family-run and the processes aren't documented?",
        a: "It does, and it's the most common scenario. A lack of documentation doesn't block the work: the real process is mapped by observing and interviewing. In fact, existing documentation often contradicts what happens at the workstation.",
      },
    ],
    services: ["auren-insight", "auren-blueprint"],
    related: [
      "senales-de-que-su-empresa-necesita-automatizacion",
      "software-a-la-medida-o-saas",
    ],
  },
  {
    slug: "software-a-la-medida-o-saas",
    title: "Custom software or SaaS: how to decide without regrets",
    seoTitle: "Custom software vs. SaaS: how to decide",
    description:
      "When to buy subscription software and when to build custom: decision criteria, total cost of ownership and the mistakes that turn out expensive.",
    keyword: "custom software vs SaaS",
    published: "2026-08-26",
    minutes: 8,
    lede: "The decision is usually made on list price and ends up being paid for in total cost. These are the criteria that really separate one case from the other, and the three situations where the obvious answer is the wrong one.",
    sections: [
      {
        heading: "The right question isn't which one is better",
        body: [
          "It's which one fits this process, in this company, over this horizon. Buying a subscription and building custom are decisions with different risk profiles, and neither is inherently cheaper.",
          "It's also worth discarding the false dilemma: in practice the most frequent answer is mixed. You buy the standard for what's standard —accounting, payroll, e-invoicing— and build only the piece that doesn't exist on the market, integrated with everything else.",
        ],
      },
      {
        heading: "When buying wins",
        body: [
          "When the process is standard and regulated, buying almost always wins. E-invoicing in Colombia changes with regulation, and keeping it up to date is permanent work that a specialized vendor does better and more cheaply than any internal team.",
          "It also wins when you need something working this month and not next quarter, when the number of users is low —per-seat licenses are cheap up to a point— and when the process isn't a competitive differentiator. Nobody wins customers by having a different payroll.",
        ],
        list: [
          "The process is standard: accounting, payroll, invoicing, e-signature",
          "Regulations change and someone else should be in charge of keeping up",
          "You need to be running in weeks, not months",
          "Few users: the cost per license doesn't weigh much yet",
        ],
      },
      {
        heading: "When building wins",
        body: [
          "When the process is precisely the company's advantage. If the way you schedule production, route shipments or settle with suppliers is part of why you do well, forcing it into a generic product means giving it up to save on a subscription.",
          "Also when you've already evaluated three tools and none fits without heavy configuration work; when you pay per-user licenses for people who use two screens; and when you've spent years adapting the operation to the software instead of the other way around. That last sign is the most expensive and the least noticed, because the cost is paid in small daily inconveniences nobody invoices.",
        ],
        list: [
          "The process is the business's differentiator and no product models it well",
          "Many occasional users paying for a full license",
          "The operation is being bent to fit the tool",
          "Integration with what already exists is half the problem",
        ],
      },
      {
        heading: "The number almost nobody calculates",
        body: [
          "The valid comparison isn't license price against development price. It's total cost over a three-to-five-year horizon, and that brings in things that don't appear on any quote.",
          "On the subscription side: per-user licenses projected to the expected growth, modules charged separately, the cost of the initial implementation, integrations and —the forgotten line item— how much it would cost to leave in year four if the vendor raises its prices or shuts down.",
          "On the custom side: initial development, monthly infrastructure, corrective maintenance and evolution. That last line item is the one that gets underestimated; in-house software without an evolution budget ages until it becomes the problem it came to solve.",
        ],
        list: [
          "Licenses projected to the number of users you'll have in three years",
          "Implementation, integrations and data migration, in both cases",
          "Infrastructure and monthly maintenance of in-house software",
          "Exit cost: what happens if you have to change vendors in year four",
        ],
      },
      {
        heading: "Three situations where the obvious answer fails",
        body: [
          "The first: “buying is cheaper”. It usually is in the first year, and stops being so when the number of users grows or when the necessary customization ends up costing more than the development you wanted to avoid. It's worth checking how much of the implementation is heavy configuration.",
          "The second: “we're unique”. Almost every company believes its process is special, and in most cases the special part is ten percent of the flow. The useful question is whether that ten percent is what makes you money. If it isn't, change it and buy.",
          "The third: “we'll develop it in-house”. It's viable with a stable technical team that has spare capacity. It's risky when it ends up depending on a single person: the knowledge leaves with them, and recovering an undocumented system costs more than buying would have.",
        ],
      },
      {
        heading: "What to ask before signing, in either case",
        body: [
          "Most regrets don't come from choosing wrongly between buying and building, but from not asking four things in time. They apply equally to a subscription contract and to a development contract.",
          "First, how do I get out. Ask to see a real export of your data, not the promise that it exists: format, scope and whether it includes attachments and history. Second, what happens to integrations when the other side changes: who handles the adjustment and with what response time.",
          "Third, what is charged separately. Modules, additional users, test environments, support hours, scope changes: the list of what isn't included says more about the real cost than the headline price. And fourth, who inside your company ends up knowing how this works, by name and with time allocated.",
        ],
        list: [
          "Full data export: format, history and attachments, demonstrated",
          "Who is responsible, and the response time, when an integration breaks",
          "An explicit list of what is charged outside the base price",
          "Who is trained internally, by name and with time allocated",
        ],
      },
      {
        heading: "How to decide in an afternoon",
        body: [
          "Write the process down in steps. Mark which ones are standard and which are specific to your business. If the specific part is marginal, buy and adjust the process. If the specific part is the heart of the matter, build that part and buy the rest.",
          "Then run the numbers over three years, with both options at the same level of detail and including integration and exit. And finally, ask yourself who will operate and evolve whatever remains: if the answer is “someone will look into it”, the lowest-risk option is the one that depends least on that someone showing up.",
          "A final warning about who is advising you. A vendor that resells licenses has an incentive to recommend buying, and a software house has an incentive to recommend building. It's worth asking point-blank how the person giving you the advice makes money.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is custom software cheaper?",
        a: "Not upfront; it usually is in the medium term when there are many users or when customizing the purchased product is heavy. With few users and a standard process, buying clearly wins.",
      },
      {
        q: "Can I start with SaaS and migrate to custom later?",
        a: "Yes, and it's a sensible route to validate the process before investing. The condition is to take care of getting your data out from the beginning: check that you can export all of it in a usable format before signing.",
      },
      {
        q: "Who owns the code of a custom development?",
        a: "It should be you, and it's worth writing that into the contract together with the delivery of documentation. A development whose ownership stays with the vendor combines the worst of both options: you pay as for development and stay locked in as with a subscription.",
      },
    ],
    services: ["auren-studio", "auren-blueprint"],
    related: [
      "que-es-la-transformacion-digital-para-pymes",
      "senales-de-que-su-empresa-necesita-automatizacion",
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const postsByDate = [...posts].sort((a, b) => b.published.localeCompare(a.published));

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Calendar date from the ISO string; same timezone reasoning as `fechaLarga`. */
export const fechaLarga = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};
