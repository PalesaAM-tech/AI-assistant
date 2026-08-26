import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EmailGenerator from '@/components/EmailGenerator';
import MeetingSummarizer from '@/components/MeetingSummarizer';
import TaskPlanner from '@/components/TaskPlanner';
import ResearchAssistant from '@/components/ResearchAssistant';
import PromptEngineering from '@/components/PromptEngineering';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />
      <main>
        <Hero />
        <EmailGenerator />
        <MeetingSummarizer />
        <TaskPlanner />
        <ResearchAssistant />
        <PromptEngineering />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
