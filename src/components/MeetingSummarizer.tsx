import { useState } from 'react';
import { FileText, Loader2, Wand2, CheckCircle, ListChecks, Gavel } from 'lucide-react';
import { summarizeMeeting, type MeetingSummary } from '@/lib/aiEngine';
import { SectionHeader } from './EmailGenerator';

export default function MeetingSummarizer() {
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState<MeetingSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = () => {
    if (!notes.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(summarizeMeeting({ notes }));
      setLoading(false);
    }, 700);
  };

  const sample = `The team met to discuss the Q3 product launch. We decided to move the launch date to October 15. Sarah will prepare the marketing plan by Friday. John needs to send the final design assets to the vendor. We agreed that the pricing tier should be revised. Follow up with legal on the compliance review. Mark will schedule a demo with the enterprise client next week. We concluded that the beta phase was successful.`;

  return (
    <section id="meeting" className="py-16 bg-slate-50/50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={FileText}
          eyebrow="Tool 02"
          title="Meeting Summarization"
          subtitle="Paste your raw meeting notes and get a structured summary, action items, and decisions."
        />

        <div className="grid lg:grid-cols-2 gap-6 mt-10">
          {/* Input */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-700">
                Meeting Notes
              </label>
              <button
                onClick={() => setNotes(sample)}
                className="text-xs font-medium text-brand-600 hover:text-brand-700"
              >
                Try sample
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your meeting notes here..."
              rows={10}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-sm resize-none leading-relaxed"
            />
            <button
              onClick={handleSummarize}
              disabled={!notes.trim() || loading}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-brand-600 text-white font-semibold rounded-xl shadow-md shadow-brand-500/20 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Summarizing...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Summarize Meeting
                </>
              )}
            </button>
          </div>

          {/* Output */}
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-center min-h-[300px]">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-sm">Analyzing your notes...</span>
                </div>
              </div>
            ) : result ? (
              <>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 animate-fade-in-up">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-brand-600" />
                    <h3 className="font-display font-semibold text-slate-800 text-sm">
                      Summary
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {result.summary}
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 animate-fade-in-up">
                  <div className="flex items-center gap-2 mb-3">
                    <ListChecks className="w-4 h-4 text-brand-600" />
                    <h3 className="font-display font-semibold text-slate-800 text-sm">
                      Action Items
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {result.actionItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 animate-fade-in-up">
                  <div className="flex items-center gap-2 mb-3">
                    <Gavel className="w-4 h-4 text-brand-600" />
                    <h3 className="font-display font-semibold text-slate-800 text-sm">
                      Decisions
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {result.decisions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-center min-h-[300px]">
                <p className="text-slate-400 text-sm text-center">
                  Your meeting summary, action items, and decisions will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
