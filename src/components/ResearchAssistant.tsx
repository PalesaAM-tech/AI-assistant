import { useState } from 'react';
import { Search, Loader2, Wand2, BookOpen, Tag } from 'lucide-react';
import { researchOutline, type ResearchOutline } from '@/lib/aiEngine';
import { SectionHeader } from './EmailGenerator';

export default function ResearchAssistant() {
  const [topic, setTopic] = useState('');
  const [outline, setOutline] = useState<ResearchOutline | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResearch = () => {
    if (!topic.trim()) return;
    setLoading(true);
    setOutline(null);
    setTimeout(() => {
      setOutline(researchOutline({ topic }));
      setLoading(false);
    }, 700);
  };

  return (
    <section id="research" className="py-16 bg-slate-50/50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Search}
          eyebrow="Tool 04"
          title="Research Assistant"
          subtitle="Enter a topic and get a structured research outline with sections and keywords."
        />

        <div className="mt-10">
          {/* Input bar */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 px-3 rounded-xl bg-slate-50 border border-slate-100">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleResearch()}
                placeholder="e.g. The impact of remote work on employee productivity"
                className="flex-1 bg-transparent py-2.5 text-sm outline-none"
              />
            </div>
            <button
              onClick={handleResearch}
              disabled={!topic.trim() || loading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 text-white font-semibold rounded-xl shadow-md shadow-brand-500/20 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Researching...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Generate Outline
                </>
              )}
            </button>
          </div>

          {/* Output */}
          <div className="mt-6">
            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-center min-h-[300px]">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-sm">Structuring your research...</span>
                </div>
              </div>
            ) : outline ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 animate-fade-in-up">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <BookOpen className="w-5 h-5 text-brand-600" />
                  <h3 className="font-display font-bold text-slate-900 text-lg">
                    {outline.title}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                  {outline.sections.map((section, i) => (
                    <div key={i}>
                      <h4 className="font-display font-semibold text-slate-800 text-sm mb-2">
                        {section.heading}
                      </h4>
                      <ul className="space-y-1.5">
                        {section.points.map((point, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-brand-600" />
                    <h4 className="font-display font-semibold text-slate-800 text-sm">
                      Suggested Keywords
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {outline.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center justify-center min-h-[200px]">
                <Search className="w-10 h-10 text-slate-200 mb-3" />
                <p className="text-slate-400 text-sm text-center max-w-md">
                  Enter a research topic above to generate a structured outline with sections, key points, and search keywords.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
