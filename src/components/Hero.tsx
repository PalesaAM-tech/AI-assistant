import { Mail, FileText, ListChecks, Search, Sparkles, ArrowDown } from 'lucide-react';

const features = [
  { icon: Mail, title: 'Email Generator', desc: 'Draft polished emails in seconds' },
  { icon: FileText, title: 'Meeting Summary', desc: 'Extract action items & decisions' },
  { icon: ListChecks, title: 'Task Planner', desc: 'Break goals into daily tasks' },
  { icon: Search, title: 'Research Assistant', desc: 'Structured research outlines' },
];

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-brand-100/60 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            Powered by Prompt Engineering
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 animate-fade-in-up">
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              Workplace Assistant
            </span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Draft emails, summarize meetings, plan tasks, and outline research — all
            powered by smart templates and prompt engineering. No sign-up required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-fade-in-up">
            <a
              href="#email"
              className="px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:shadow-brand-500/40 transition-all"
            >
              Try the Tools
            </a>
            <a
              href="#prompt-engineering"
              className="px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-brand-300 hover:text-brand-600 transition-all"
            >
              How It Works
            </a>
          </div>

          <a href="#email" className="inline-flex items-center gap-1 text-slate-400 text-sm animate-pulse-soft">
            <ArrowDown className="w-4 h-4" />
            Explore the features
          </a>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <a
              key={f.title}
              href={`#${f.title.split(' ')[0].toLowerCase()}`}
              className="group p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-3 group-hover:bg-brand-100 transition-colors">
                <f.icon className="w-5 h-5 text-brand-600" />
              </div>
              <h3 className="font-display font-semibold text-slate-800 text-sm mb-1">
                {f.title}
              </h3>
              <p className="text-xs text-slate-500">{f.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
