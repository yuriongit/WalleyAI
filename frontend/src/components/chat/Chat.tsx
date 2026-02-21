import { IconSend } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type LLMResponseBody } from "@interfaces/types"


const API_URL: string = import.meta.env.VITE_API_URL

export const Chat = () => {
    const [response, setResponse] = useState("");
    const [userInput, setUserInput] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleRequest = async () => {
        userInput.trim();

        if (!userInput || userInput.length < 1) {
            return "emptyInput";
        };

        setError(null);
        setUserInput("");
        setResponse("")
        setIsLoading(true);

        try {
            const res: Response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ promptContent: userInput.trim() })
            });

            if (!res.ok) {
                console.log(res);
                throw new Error(`SERVER ERROR, STATUS: ${res.status}`);
            }

            const data: LLMResponseBody = await res.json();
            setIsLoading(false)

            return setResponse(data.llmResponse);
        } catch (error: any) {
            return setError(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }

    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleRequest();
        }
    }

    const Pre = ({ children }: any) => {
        const [copied, setCopied] = useState(false);

        const handleCopy = () => {
            const codeText = children.props.children;
            navigator.clipboard.writeText(codeText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        return (
            <div className="relative group">
                <button
                    onClick={handleCopy}
                    className="absolute right-2 transition-all top-2 z-20 px-2.5 py-1 text-xs font-medium bg-amber-800/75 backdrop-blur-xs text-white rounded-md border border-amber-400 opacity-0 group-hover:opacity-100 hover:bg-amber-900/85 cursor-pointer"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
                <pre className="relative">{children}</pre>
            </div>
        );
    };
    return (
        <div className={` ${!response && !isLoading && !error ? ("justify-center pb-25") : "justify-between pt-15 pb-10 "} bg-amber-200/35 z-0 rounded-l-lg min-h-screen w-full h-full gap-5 px-10 flex flex-col items-center backdrop-blur-lg`}>
            {!response && !isLoading && !error && (
                <AnimatePresence mode={'wait'}>
                    <motion.div 
                        className="space-y-1.5 w-full text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.85, ease: 'easeInOut' }}>
                        <h1 className="text-3xl md:text-4xl font-medium text-black">
                            Good morning, I'm {" "}  
                            <span className="text-amber-400 fontsmeb">
                                Wallee.
                            </span>
                        </h1>
                        <p className="text-base md:text-base text-zinc-700 font-light">
                           Is there anything can I help you with?
                        </p>
                    </motion.div>
                </AnimatePresence>
            )}

            <div className="max-w-4xl h-full rounded text-black w-full">
                {response && (
                    <AnimatePresence mode={'wait'}>
                        <motion.div
                            className="flex gap-10 overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-amber-950/25
                            [&::-webkit-scrollbar-thumb]:rounded-full rounded-lg [&::-webkit-scrollbar-thumb]:bg-amber-950/50 [&::-webkit-scrollbar-track]:rounded-full max-h-[75vh] w-full max-w-4xl h-full animate-in fade-in slide-in-from-bottom-4 duration-700"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}>

                            <article className="prose prose-strong:font-medium pr-8 prose-amber-500 w-full max-w-4xl prose-p:leading-relaxed prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-amber-500/5 prose-pre:rounded-2xl text-zinc-800 font-light prose-code:font-medium">
                                <Markdown remarkPlugins={[remarkGfm]} components={{ pre: Pre }}>{response}</Markdown>
                            </article>

                        </motion.div>
                    </AnimatePresence>
                )}

                {error && (
                    <p className="text-center w-full p-5 text-amber-400 italic">
                        Error: {error}
                    </p>
                )}

                {isLoading && (
                    <AnimatePresence mode={'wait'}>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="flex gap-5 animate-pulse mt-2">
                            <div className="w-full flex justify-center items-center gap-1">
                                <div className="h-5 bg-amber-400 z-0 animate-loader-1 rounded-full w-5" />
                                <div className="h-5 bg-amber-400 z-0 animate-loader-2 rounded-full w-5" />
                                <div className="h-5 bg-amber-400 z-0 animate-loader-3 rounded-full w-5" />
                                <div className="h-5 bg-amber-400 z-0 animate-loader-4 rounded-full w-5" />
                                <div className="h-5 bg-amber-400 z-0 animate-loader-5 rounded-full w-5" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            <div className="flex flex-col gap-2.5 max-w-4xl items-end">
                <div className="min-w-4xl py bottom-5 sticky w-full flex max-w-4xl gap-2">
                    <div className="flex p-1.25 items-center rounded-2xl border px-2.5 border-amber-500/30 bg-amber-400/25 gap-5 w-full">
                        <input 
                            type="text" 
                            onKeyDown={handleKeyDown} 
                            autoFocus 
                            value={userInput}
                            disabled={isLoading}
                            placeholder="Ask anything..." className="border hover:bg-white/80 transition-all duration-200 ease-in-out placeholder:text-zinc-600 text-zinc-900 border-amber-500/50 bg-white outline-none py-2.5 px-5 rounded-2xl w-full" onChange={(e) => setUserInput(e.target.value)} />
                    </div>
                    <button onClick={handleRequest} className="px-5 py-2.5 hover:cursor-pointer bg-amber-400 transition-all text-white duration-200 ease-in-out flex justify-center items-center rounded-2xl min-h-full">
                        <IconSend strokeWidth={1.5} size={25} />
                    </button>
                </div>
            </div>

        </div>
    )
} 