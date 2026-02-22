import { useLenis } from 'lenis/react';
import { Chat } from "@components/chat/Chat";
import { Sidebar } from "@components/sidebar/Sidebar"


export const App = () => {
    useLenis();

    return (
        <main className='min-h-screen h-full flex flex-row justify-between w-full bg-[#ffffff] text-zinc-200 tracking-tighter'>
            <p className="text-amber-400 absolute z-10 p-5 text-xl font-semibold">
                Walley {`:)`}
            </p>
            <div className='h-full flex flex-row justify-between w-full '>
                <Chat/> 
                <Sidebar/>
            </div>
        </main>
    );
}