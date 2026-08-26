// AI Simulation Engine
// Generates smart, template-based responses to simulate AI output without a real API.
// Uses prompt-engineering-style techniques: role prompting, few-shot structure, chain-of-thought framing.

export type Tone = 'professional' | 'friendly' | 'formal' | 'casual' | 'persuasive';

export interface EmailInput {
  recipient: string;
  topic: string;
  tone: Tone;
}

export interface MeetingInput {
  notes: string;
}

export interface TaskInput {
  goal: string;
  days: number;
}

export interface ResearchInput {
  topic: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ---------- Email Generator ----------

const toneOpeners: Record<Tone, string[]> = {
  professional: [
    'I hope this message finds you well.',
    'Thank you for your time and attention to this matter.',
    'I trust you are having a productive week.',
  ],
  friendly: [
    'Hope you are doing great!',
    'It is always a pleasure to connect with you.',
    'Hope your week is off to a wonderful start.',
  ],
  formal: [
    'I am writing to formally address the following matter.',
    'Please accept this correspondence as an official communication regarding the subject below.',
    'I submit for your consideration the following information.',
  ],
  casual: [
    'Hope you are doing well!',
    'Just wanted to drop you a quick note.',
    'Hope things are going smoothly on your end.',
  ],
  persuasive: [
    'I wanted to bring an exciting opportunity to your attention.',
    'There is something I believe will be of significant value to you.',
    'I am reaching out because I see a clear path to a great outcome for both of us.',
  ],
};

const toneClosers: Record<Tone, string[]> = {
  professional: [
    'I look forward to your response at your earliest convenience.',
    'Please let me know if you require any further information.',
    'Thank you again for your consideration.',
  ],
  friendly: [
    'Looking forward to hearing your thoughts!',
    'Catch up soon — would love to hear back from you.',
    'Thanks so much, and talk soon!',
  ],
  formal: [
    'I await your formal response in due course.',
    'Your attention to this matter is greatly appreciated.',
    'I remain at your disposal for any further correspondence.',
  ],
  casual: [
    'Let me know what you think!',
    'No rush — just whenever you get a chance.',
    'Thanks, and have a good one!',
  ],
  persuasive: [
    'I am confident this is the right move — I would love to hear your thoughts.',
    'Let us turn this into a win together. Looking forward to your reply.',
    'I hope you will see the value here as clearly as I do.',
  ],
};

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function generateEmail(input: EmailInput): string {
  const seed = hashString(input.recipient + input.topic + input.tone);
  const opener = pick(toneOpeners[input.tone], seed);
  const closer = pick(toneClosers[input.tone], seed + 1);
  const recipientName = input.recipient || 'there';

  const body = `I wanted to reach out regarding ${input.topic}. After giving it some thought, I believe it would be valuable for us to align on the key points and determine the best path forward. There are a few aspects worth discussing in detail, and I would appreciate your perspective on how we should approach them.`;

  const subject = input.topic
    .split(' ')
    .slice(0, 8)
    .join(' ');

  return `Subject: ${subject}

Dear ${recipientName},

${opener}

${body}

${closer}

Best regards,
Your Name`;
}

// ---------- Meeting Summarization ----------

export interface MeetingSummary {
  summary: string;
  actionItems: string[];
  decisions: string[];
}

export function summarizeMeeting(input: MeetingInput): MeetingSummary {
  const notes = input.notes.trim();
  const sentences = notes
    .split(/[\n.]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3);

  const actionVerbs = /\b(should|must|needs? to|will|action|follow up|send|schedule|prepare|review|complete|deliver|assign|update|create|draft|confirm|reach out|check|verify)\b/i;
  const decisionVerbs = /\b(decided|agreed|approved|concluded|finalized|resolved|determined|chose|selected|committed)\b/i;

  const actionItems = sentences.filter((s) => actionVerbs.test(s)).slice(0, 6);
  const decisions = sentences.filter((s) => decisionVerbs.test(s)).slice(0, 6);

  const summarySentences = sentences.slice(0, 3).join(' ');
  const summary = `The meeting covered ${sentences.length} key point${sentences.length === 1 ? '' : 's'}. ${
    summarySentences || 'The discussion centered on the topics raised in the notes.'
  } The team reviewed progress, identified open items, and aligned on next steps.`;

  const fallbackActions = [
    'Follow up with stakeholders on open questions.',
    'Document and share meeting notes with attendees.',
    'Schedule a follow-up to review progress.',
  ];
  const fallbackDecisions = [
    'Proceed with the approach discussed.',
    'Defer non-critical items to the next meeting.',
  ];

  return {
    summary,
    actionItems: actionItems.length > 0 ? actionItems.map(capitalizeFirst) : fallbackActions,
    decisions: decisions.length > 0 ? decisions.map(capitalizeFirst) : fallbackDecisions,
  };
}

function capitalizeFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ---------- Task Planner ----------

export interface DayPlan {
  day: number;
  title: string;
  tasks: string[];
}

export function planTasks(input: TaskInput): DayPlan[] {
  const goal = input.goal.trim() || 'the goal';
  const days = Math.min(Math.max(input.days || 5, 1), 14);
  const phases = [
    'Research & Discovery',
    'Planning & Strategy',
    'Setup & Foundation',
    'Core Execution',
    'Iteration & Refinement',
    'Review & Validation',
    'Finalization & Delivery',
  ];

  const plans: DayPlan[] = [];
  for (let i = 0; i < days; i++) {
    const phase = phases[i % phases.length];
    const tasks: string[] = [];

    tasks.push(`Define the scope and success criteria for "${goal}" (Day ${i + 1}).`);
    tasks.push(`Identify the key stakeholders and resources needed for this phase.`);
    tasks.push(`Break the phase into 2–3 concrete sub-tasks and estimate effort.`);
    tasks.push(`Execute the highest-priority sub-task and document the outcome.`);
    tasks.push(`Review progress against the overall goal and adjust the plan if needed.`);

    plans.push({
      day: i + 1,
      title: `Day ${i + 1}: ${phase}`,
      tasks,
    });
  }
  return plans;
}

// ---------- Research Assistant ----------

export interface ResearchOutline {
  title: string;
  sections: { heading: string; points: string[] }[];
  keywords: string[];
}

export function researchOutline(input: ResearchInput): ResearchOutline {
  const topic = input.topic.trim() || 'the topic';
  const topicTitle = topic.charAt(0).toUpperCase() + topic.slice(1);

  return {
    title: `Research Outline: ${topicTitle}`,
    sections: [
      {
        heading: '1. Introduction & Background',
        points: [
          `Define ${topic} and its current relevance.`,
          'Identify the problem or gap this research addresses.',
          'State the research question and objectives.',
        ],
      },
      {
        heading: '2. Literature Review',
        points: [
          `Survey existing work and key publications on ${topic}.`,
          'Compare methodologies and identify consensus vs. debate.',
          'Highlight gaps that this research can fill.',
        ],
      },
      {
        heading: '3. Methodology',
        points: [
          'Describe the approach (qualitative, quantitative, or mixed).',
          'Detail data sources, tools, and sampling strategy.',
          'Address ethical considerations and limitations.',
        ],
      },
      {
        heading: '4. Analysis & Findings',
        points: [
          'Present results organized by research question.',
          'Use visuals (charts, tables) to support key findings.',
          'Note unexpected results and possible explanations.',
        ],
      },
      {
        heading: '5. Discussion & Implications',
        points: [
          `Interpret findings in the context of ${topic}.`,
          'Discuss practical and theoretical implications.',
          'Recommend directions for future work.',
        ],
      },
      {
        heading: '6. Conclusion & References',
        points: [
          'Summarize key takeaways concisely.',
          'Restate the contribution to the field.',
          'Compile a properly formatted reference list.',
        ],
      },
    ],
    keywords: [
      topic,
      `${topic} overview`,
      `${topic} methodology`,
      `${topic} analysis`,
      `${topic} trends`,
      'recent developments',
    ],
  };
}

// ---------- Chatbot ----------

const chatResponses: { match: RegExp; reply: string }[] = [
  {
    match: /\b(hi|hello|hey|greetings)\b/i,
    reply:
      "Hello! I am your AI Workplace Assistant. I can help you draft emails, summarize meetings, plan tasks, or outline research. What would you like to do?",
  },
  {
    match: /\b(email|draft|write.*mail)\b/i,
    reply:
      "I can help generate an email. Try the Email Generator tool above — just enter the recipient, topic, and tone, and I will produce a full draft for you.",
  },
  {
    match: /\b(meeting|summar|notes|minutes)\b/i,
    reply:
      "Paste your meeting notes into the Meeting Summarization tool and I will extract a summary, action items, and decisions automatically.",
  },
  {
    match: /\b(task|plan|goal|schedule)\b/i,
    reply:
      "Tell me your goal in the Task Planner and I will break it down into a day-by-day plan with concrete tasks.",
  },
  {
    match: /\b(research|outline|study|paper)\b/i,
    reply:
      "Use the Research Assistant tool — give me a topic and I will produce a structured research outline with sections and keywords.",
  },
  {
    match: /\b(prompt engineering|prompt)\b/i,
    reply:
      "Prompt engineering is the practice of crafting inputs to guide an AI toward high-quality output. Check the 'How I Used Prompt Engineering' section to see the exact techniques behind each feature here.",
  },
  {
    match: /\b(thank|thanks|appreciate)\b/i,
    reply: "You are welcome! Let me know if there is anything else I can help with.",
  },
  {
    match: /\b(who|what can you do|help|capabilities)\b/i,
    reply:
      "I am an AI Workplace Assistant demo. I simulate four tools — Email Generator, Meeting Summarization, Task Planner, and Research Assistant — plus this chatbot. Everything runs locally using prompt-engineering templates.",
  },
];

const defaultReply =
  "That is a great question. I am a simulated assistant, so I respond using pattern matching and templates. Try asking about email drafting, meeting summaries, task planning, or research outlines — or use the tools above for full results.";

export function chatReply(message: string): string {
  const msg = message.trim();
  for (const r of chatResponses) {
    if (r.match.test(msg)) return r.reply;
  }
  return defaultReply;
}
