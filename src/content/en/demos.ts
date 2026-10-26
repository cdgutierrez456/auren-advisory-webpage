/** English edition of `../demos.ts`. Same slugs and services, same order. */
import type { Demo } from "../demos.ts";
import type { Loc } from "../../lib/i18n.ts";

export const demos: readonly Loc<Demo>[] = [
  {
    slug: "preoperacional",
    corto: "Pre-trip",
    nombre: "Pre-trip inspection",
    servicio: "auren-flow",
    servicioNombre: "Auren Flow",
    segmento: "Transport",
    resumen:
      "A 22-item checklist on the phone, with a photo of each finding, the driver's signature and an automatic block on departure.",
    dolor:
      "Today it's done on paper and filed in a folder nobody reads. It's required by Colombia's road-safety plan (PESV) and occupational-safety system (SG-SST), and if a critical item fails the vehicle shouldn't leave.",
    pasos: [
      "Pick a vehicle from the fleet.",
      "Mark a critical item (the ones marked with ●) as “Bad” and you'll see it requires a photo.",
      "Sign with your finger or the mouse and close the inspection.",
      "The result comes out BLOCKED and lands on the compliance dashboard.",
    ],
    limite:
      "No real users, no photo storage and no legal weight for the signature: that's pilot scope.",
  },
  {
    slug: "flota",
    corto: "Expiries",
    nombre: "Fleet expiry tracking",
    servicio: "auren-flow",
    servicioNombre: "Auren Flow",
    segmento: "Transport",
    resumen:
      "Mandatory insurance (SOAT), vehicle inspection, licenses and mileage-based maintenance, with traffic lights and days remaining.",
    dolor:
      "Nobody knows how many vehicles are on the road today with expired documents. The fine is immediate and the insurer rejects the claim.",
    pasos: [
      "Read the big number: how many vehicles shouldn't be on the road today.",
      "The table is sorted by urgency, with nothing filtered out.",
      "Move the thresholds: what's “critical” for you may be 30 days, not 15.",
    ],
    limite:
      "The data is synthetic and there are no automatic alerts. In the pilot your real fleet is loaded and the warning goes out before, not once it has expired.",
  },
  {
    slug: "pqrsd",
    corto: "PQRSD",
    nombre: "Citizen requests (PQRSD) with deadline control",
    servicio: "auren-flow",
    servicioNombre: "Auren Flow",
    segmento: "Public entities",
    resumen:
      "Citizen filing, an inbox with a traffic light for remaining business days and a management dashboard by department.",
    dolor:
      "The deadline runs from filing, counted in business days and skipping holidays. Today it's tracked in an Excel file nobody looks at on Fridays.",
    pasos: [
      "Open the inbox: the red rows are already overdue.",
      "Look at the “Owner” column: the ones saying “unassigned” are the ones that expire without anyone seeing it coming.",
      "File a new request and watch it appear at the top of the inbox.",
      "The dashboard summarizes overdue items by department.",
    ],
    limite:
      "Deadlines are configurable and must be checked against current regulations. It doesn't calculate extensions or suspensions, and it doesn't replace the document management system.",
  },
  {
    slug: "vision/siete-segmentos",
    corto: "7-segment",
    nombre: "7-segment display reading",
    servicio: "auren-vision",
    servicioNombre: "Auren Vision",
    segmento: "Cross-industry",
    resumen:
      "The camera reads the number on a scale, a balance or any device with an LED display.",
    dolor:
      "Today a person copies that number by hand onto a sheet, three times per shift, and it gets transcribed again into Excel.",
    pasos: [
      "Turn on the camera and frame the display inside the box.",
      "Set how many digits the display has.",
      "If it isn't sure of the reading, the demo shows no number: it says “focusing…”.",
    ],
    limite:
      "It runs in this device's browser. For 24/7 use with a fixed camera, inference moves to an on-site device.",
  },
  {
    slug: "vision/medidor",
    corto: "Gauge",
    nombre: "Analog gauge reading",
    servicio: "auren-vision",
    servicioNombre: "Auren Vision",
    segmento: "Cross-industry",
    resumen:
      "The camera reads the needle of a pressure gauge or a meter and turns it into a value with units.",
    dolor:
      "There's 30-year-old instrumentation in every plant, hospital and water utility that someone writes down on a sheet today. A camera retrofit: no need to change the equipment.",
    pasos: [
      "Frame the dial inside the circle.",
      "Calibrate: zero angle, full-scale angle and the two values.",
      "Move the needle (or the paper) and watch the value change.",
    ],
    limite:
      "Calibration is per instrument. It's a property of the physical world, not a limitation of the demo: every pressure gauge has its own mechanical zero.",
  },
  {
    slug: "vision/placas",
    corto: "Plates",
    nombre: "License plate reading (ALPR)",
    servicio: "auren-vision",
    servicioNombre: "Auren Vision",
    segmento: "Transport",
    resumen:
      "The camera reads the plate of the incoming vehicle and checks it against the registered fleet.",
    dolor:
      "Yard dwell times are written down today by a gatekeeper in a notebook, when they get written down at all.",
    pasos: [
      "Turn on the camera and place a printed plate inside the strip.",
      "A reading is only accepted if the format is valid and it repeats in 3 of the last 5 frames.",
      "If the plate is in the seeded fleet, the demo recognizes it and shows the vehicle.",
    ],
    limite:
      "Hand-held framing and office lighting give the accuracy you see. In a real yard it uses a fixed camera, controlled framing and its own lighting.",
  },
  {
    slug: "friccion",
    corto: "Friction",
    nombre: "The cost of friction",
    servicio: "auren-insight",
    servicioNombre: "Auren Insight",
    segmento: "Cross-industry",
    resumen:
      "What a manual task costs per year, in pesos and in full-time people.",
    dolor:
      "“It takes us a while” moves nobody. “It's 47 million pesos a year” does.",
    pasos: [
      "Enter how many people do the task and how many hours a week they spend on it.",
      "Adjust the average salary.",
      "The full-time-equivalent headcount is the figure that gets repeated in the meeting.",
    ],
    limite:
      "It's an estimate with the calculation basis in plain view. It doesn't include rework, errors or opportunity cost — which are usually larger.",
  },
];

export const demoBySlug = (slug: string) => demos.find((d) => d.slug === slug);
