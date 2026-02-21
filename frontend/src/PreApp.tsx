import { GenerateContentResponse, GoogleGenAI, type Model, type Pager } from "@google/genai"; 
import { useState } from "react";
import Markdown from 'react-markdown';
import { IconPointerStar, IconChartBubbleFilled } from '@tabler/icons-react';


// AI VARS
const API_KEY: string = import.meta.env.VITE_GEMINI_API_KEY; 
const AI = new GoogleGenAI({ apiKey: API_KEY })


// AI FNS
async function listModels () {
    const response: Pager<Model> = await AI.models.list()
    console.log(response.page)
}

const LLMResponse = async (userInput: string) => { 
    try {
        const response: GenerateContentResponse = await AI.models.generateContent({ model: "gemini-3-flash-preview", contents: userInput }); 
        return response.text
    } catch (error: any) {
        return error.message
    }
} 


export default function App() {
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const handleFetch = async () => {
    if (!input.trim() || loading) return;
    
    setLoading(true);
    setAnswer(""); // Clear previous answer for a clean reveal
    
    try {
      // Replace this with your actual LLM call: const result = await genAI.generate(...)
      const result = await LLMResponse(input); 
      setAnswer(result);
    } catch (error) {
      setAnswer("### Error\nSomething went wrong. Please try again.");
    } finally {
      setLoading(false);
      setInput(""); // Clear input after sending
    }
  };

  const Pre = ({ children }: any) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      // Find the code text inside the children
      const codeText = children.props.children;
      navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 z-20 px-2 py-1 text-xs font-medium bg-zinc-800 text-zinc-300 rounded-md border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-700 hover:text-white cursor-pointer"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre className="relative">{children}</pre>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#05000a] text-zinc-200 w-full flex justify-center tracking-tight flex-col items-center selection:bg-purple-500/30">
      
      {/* Background Glow - Top Right */}
      <div className="fixed top-[-10%] right-[-5%] w-150 h-150 bg-purple-900/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl z-10 flex flex-col min-h-screen py-12">
        
        {/* Dynamic Header: Only shows when no answer is present */}
        {!answer && !loading && (
          <div className="mt-24 mb-12 space-y-3 animate-in fade-in slide-in-from-top-4 duration-1000">
            <h1 className="text-4xl md:text-5xl font-medium text-white">
              Where should we start?
            </h1>
            <p className="text-base md:text-lg text-zinc-400 font-light">
              You can ask anything, learn anything, create somethimg. 
            </p>
          </div>
        )}

        {/* Response Area */}
        <div className="pb-44 max-w-3xl w-full">
          {answer && (
            <div className="flex gap-5 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Gemini Spark Avatar */}
              <div className="w-12 h-12 p-1.5 rounded-full flex items-center justify-center bg-linear-to-tr from-purple-950 to-purple-400 shrink-0 shadow-lg shadow-purple-500/20">
                <IconChartBubbleFilled size={45}/>
              </div>
              
              {/* Markdown Content */}
              <article className="prose prose-invert prose-purple w-full max-w-4xl prose-p:leading-relaxed prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-purple-500/5 prose-pre:rounded-2xl text-zinc-300 font-light">
                <Markdown components={{pre: Pre}}>{answer}</Markdown>
              </article>
            </div>
          )}
          
          {loading && (
            <div className="flex gap-5 animate-pulse mt-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800 shrink-0" />
              <div className="space-y-4 w-full">
                <div className="h-4 bg-zinc-800 rounded-full w-3/4" />
                <div className="h-4 bg-zinc-800 rounded-full w-1/2" />
                <div className="h-4 bg-zinc-800 rounded-full w-2/3" />
              </div>
            </div>
          )}
        </div>

        {/* Floating Input Bar */}
        <div className="fixed bottom-8 flex flex-col -space-y-2.5 items-center left-1/2 -translate-x-1/2 w-full max-w-4xl">
          <div className="relative flex items-center w-full bg-purple-950/15 border border-purple-500/5 backdrop-blur-md rounded-3xl px-4 py-2 shadow-2xl focus-within:border-purple-500/25 focus-within:ring-0.5 focus-within:ring-purple-500/20 transition-all">
            <input 
              className="w-full bg-transparent border-none outline-none font-light py-4 px-3 text-zinc-200 placeholder:text-zinc-400 text-base"
              placeholder="Type here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
            />
            <button 
              onClick={handleFetch}
              disabled={loading || !input.trim()}
              className="bg-purple-950 hover:bg-purple-950/90 p-3 text-white rounded-2xl transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
            >
              <IconPointerStar strokeWidth={1} className="rotate-[42.5deg]" />
            </button>
          </div>
          {/* <p className="text-center backdrop-blur-2xl w-full py-1 px-15 rounded text-[10px] text-zinc-600 mt-4 uppercase tracking-[0.2em] font-medium">
            Gemini Core Clone • Powered by Google Gemini
          </p> */}
        </div>

      </div>
    </main>
  );
}
