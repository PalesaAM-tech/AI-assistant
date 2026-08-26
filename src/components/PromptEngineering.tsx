import { Lightbulb, Mail, FileText, ListChecks, Search, MessageSquare, Code2 } from 'lucide-react';
import { SectionHeader } from './EmailGenerator';

const techniques = [
  {
    icon: Mail,
    feature: 'Email Generator',
    technique: 'Role + Tone Conditioning',
    prompt: `You are a professional email writing assistant.
Given a recipient, topic, and tone, generate a complete email.

Rules:
- Start with a contextually appropriate greeting
- Match the specified tone exactly
- Include a clear subject line
- Close with a tone-appropriate sign-off

Tone: {tone}
Recipient: {recipient}
Topic: {topic}`,
    explanation:
      'Assigning a role ("professional email writing assistant") and injecting the tone as a variable lets the template adapt its vocabulary, greeting, and sign-off dynamically. The rules block acts as a constraint set — a classic prompt-engineering pattern.',
  },
  {
    icon: FileText,
    feature: 'Meeting Summarizer',
    technique: 'Structured Extraction with Keyword Anchors',
    prompt: `You are a meeting analyst. Given raw notes, produce:

1. SUMMARY: 2–3 sentence overview
2. ACTION ITEMS: sentences containing action verbs
   (will, should, needs to, follow up, send, schedule)
3. DECISIONS: sentences containing decision verbs
   (decided, agreed, approved, concluded)

Notes: {notes}`,
    explanation:
      'Keyword anchoring — scanning for specific verbs like "will" or "decided" — simulates how a real LLM extracts structured data from unstructured text. The numbered output format enforces a consistent schema.',
  },
  {
    icon: ListChecks,
    feature: 'Task Planner',
    technique: 'Chain-of-Thought Decomposition',
    prompt: `You are a project planning expert.
Break the goal into a {days}-day plan.

For each day:
1. Assign a phase (Research → Planning → Setup → 
   Execution → Refinement → Review → Delivery)
2. List 5 concrete tasks that advance the goal
3. Each task must be actionable and measurable

Goal: {goal}`,
    explanation:
      'Chain-of-thought decomposition breaks a large goal into sequential phases, then into daily tasks. The phase progression mirrors how real project managers think — from discovery to delivery.',
  },
  {
    icon: Search,
    feature: 'Research Assistant',
    technique: 'Few-Shot Template with Schema',
    prompt: `You are a research methodology expert.
Given a topic, output a structured outline:

## Research Outline: {topic}
### 1. Introduction & Background
  - Define the topic
  - Identify the research gap
  - State objectives
### 2. Literature Review
  - Survey existing work
  ...

Also provide 6 search keywords.

Topic: {topic}`,
    explanation:
      'A few-shot template shows the model the exact output schema (numbered sections with bullet points). This "show, don\'t tell" approach is more reliable than describing the format in prose — the structure is the instruction.',
  },
  {
    icon: MessageSquare,
    feature: 'Chatbot',
    technique: 'Intent Matching with Fallback',
    prompt: `You are a helpful workplace assistant chatbot.

Match user input to intents:
- greeting → "Hello! I can help with emails, 
  meetings, tasks, or research."
- email → "Use the Email Generator tool above"
- meeting → "Use the Meeting Summarizer tool"
- task → "Use the Task Planner tool"
- research → "Use the Research Assistant tool"
- unknown → default helpful response

User: {message}`,
    explanation:
      'Intent matching with regex patterns simulates NLU classification. The fallback ensures the bot always responds helpfully — a key principle in conversational prompt design.',
  },
];

export default function PromptEngineering() {
  return (
    <section id="prompt-engineering" className="py-16 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Lightbulb}
          eyebrow="Behind the Scenes"
          title="How I Used Prompt Engineering"
          subtitle="Every feature in this app is powered by prompt-engineering techniques — no external AI API required. Here is exactly how each one works."
        />

        {/* Intro banner */}
        <div className="mt-10 p-6 bg-gradient-to-br from-brand-50 to-brand-100/50 rounded-2xl border border-brand-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
              <Code2 className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-slate-800 text-sm mb-1">
                What is Prompt Engineering?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Prompt engineering is the practice of crafting structured inputs to guide
                an AI model toward consistent, high-quality output. Techniques include{' '}
                <strong className="text-slate-700">role prompting</strong>,{' '}
                <strong className="text-slate-700">few-shot examples</strong>,{' '}
                <strong className="text-slate-700">chain-of-thought decomposition</strong>,
                and <strong className="text-slate-700">output schema constraints</strong>.
                This app simulates those techniques using smart templates.
              </p>
            </div>
          </div>
        </div>

        {/* Technique cards */}
        <div className="grid lg:grid-cols-2 gap-5 mt-8">
          {techniques.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                    <t.icon className="w-4.5 h-4.5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-slate-800 text-sm">
                      {t.feature}
                    </h3>
                    <p className="text-xs text-brand-600 font-medium">
                      {t.technique}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {t.explanation}
                </p>

                {/* Prompt block */}
                <div className="rounded-xl bg-slate-900 p-4 overflow-x-auto">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="text-xs text-slate-500 ml-2 font-mono">prompt.txt</span>
                  </div>
                  <pre className="text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
                    {t.prompt}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
