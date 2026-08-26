import { useState } from 'react';
import { ListChecks, Loader2, Wand2, CalendarDays, Target } from 'lucide-react';
import { planTasks, type DayPlan } from '@/lib/aiEngine';
import { SectionHeader } from './EmailGenerator';

export default function TaskPlanner() {
  const [goal, setGoal] = useState('');
  const [days, setDays] = useState(5);
  const [plans, setPlans] = useState<DayPlan[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePlan = () => {
    if (!goal.trim()) return;
    setLoading(true);
    setPlans([]);
    setTimeout(() => {
      setPlans(planTasks({ goal, days }));
      setLoading(false);
    }, 700);
  };

  return (
    <section id="tasks" className="py-16 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={ListChecks}
          eyebrow="Tool 03"
          title="Task Planner"
          subtitle="Give a goal and a timeframe — get a day-by-day plan with concrete tasks."
        />

        <div className="grid lg:grid-cols-3 gap-6 mt-10">
          {/* Input */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Your Goal
            </label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Launch a new SaaS product from scratch"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-sm resize-none"
            />

            <label className="block text-sm font-medium text-slate-700 mb-1.5 mt-4">
              Duration: <span className="text-brand-600 font-semibold">{days} days</span>
            </label>
            <input
              type="range"
              min={1}
              max={14}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 day</span>
              <span>14 days</span>
            </div>

            <button
              onClick={handlePlan}
              disabled={!goal.trim() || loading}
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-brand-600 text-white font-semibold rounded-xl shadow-md shadow-brand-500/20 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Planning...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Generate Plan
                </>
              )}
            </button>
          </div>

          {/* Output */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-center min-h-[300px]">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-sm">Building your plan...</span>
                </div>
              </div>
            ) : plans.length > 0 ? (
              <div className="space-y-3">
                {plans.map((plan, i) => (
                  <div
                    key={plan.day}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 animate-fade-in-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                        <CalendarDays className="w-4.5 h-4.5 text-brand-600" />
                      </div>
                      <h3 className="font-display font-semibold text-slate-800 text-sm">
                        {plan.title}
                      </h3>
                    </div>
                    <ul className="space-y-1.5 pl-1">
                      {plan.tasks.map((task, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
                <Target className="w-10 h-10 text-slate-200 mb-3" />
                <p className="text-slate-400 text-sm text-center max-w-xs">
                  Enter a goal on the left and I will break it down into a structured daily plan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
