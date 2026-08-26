import { useState } from 'react';
import { Mail, Copy, Check, Wand2, Loader2 } from 'lucide-react';
import { generateEmail, type Tone } from '@/lib/aiEngine';

const tones: { value: Tone; label: string }[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
  { value: 'persuasive', label: 'Persuasive' },
];

export default function EmailGenerator() {
  const [recipient, setRecipient] = useState('');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<Tone>('professional');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setLoading(true);
    setOutput('');
    setTimeout(() => {
      setOutput(generateEmail({ recipient, topic, tone }));
      setLoading(false);
    }, 700);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="email" className="py-16 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Mail}
          eyebrow="Tool 01"
          title="Email Generator"
          subtitle="Enter a recipient, topic, and tone — get a ready-to-send email draft instantly."
        />

        <div className="grid lg:grid-cols-2 gap-6 mt-10">
          {/* Input */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Recipient
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Sarah Johnson"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-sm"
            />

            <label className="block text-sm font-medium text-slate-700 mb-1.5 mt-4">
              Topic
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Quarterly budget review and next steps for the marketing campaign"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-sm resize-none"
            />

            <label className="block text-sm font-medium text-slate-700 mb-1.5 mt-4">
              Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    tone === t.value
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || loading}
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-brand-600 text-white font-semibold rounded-xl shadow-md shadow-brand-500/20 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Generate Email
                </>
              )}
            </button>
          </div>

          {/* Output */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-slate-800 text-sm">
                Generated Email
              </h3>
              {output && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-brand-600 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="flex-1 min-h-[280px] rounded-xl bg-slate-50 border border-slate-100 p-4 overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-sm">Crafting your email...</span>
                  </div>
                </div>
              ) : output ? (
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed animate-fade-in">
                  {output}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  Your generated email will appear here.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-brand-600" />
        </div>
        <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
        {title}
      </h2>
      <p className="text-slate-600">{subtitle}</p>
    </div>
  );
}
