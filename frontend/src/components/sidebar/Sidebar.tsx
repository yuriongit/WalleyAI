import { IconMessagePlus, IconSearch, IconSettings, type Icon } from "@tabler/icons-react";

export const Sidebar = () => {
    const sidebarBtns: { icon: Icon, label: string, function: Function}[] = [
        {
            icon: IconMessagePlus,
            label: "New Chat",
            function: (): string => {
                return "New chat: WIP"
            }
        },
        {
            icon: IconSearch,
            label: "Search",
            function: (): string => {
                return "Search: WIP"
            }
        },
        {
            icon: IconSettings,
            label: "Settings",
            function: (): string => {
                return "Settings: WIP"
            }
        },
    ]

    return (
        <div className={`w-[13em] z-10 fixed right-0 flex-col h-full bg-white p-4 shadow-sm text-black`}>
            <div className="flex flex-col gap-2.5 h-full w-full">
                {sidebarBtns.map(button => {
                    const Icon = button.icon
                    return (
                        <button className="p-2.5 hover:cursor-pointer hover:bg-amber-400/15 rounded-lg transition-all duration-150 w-full flex justify-between items-center">
                            <p className="text-sm">{button.label}</p>
                            <Icon strokeWidth={1.5} className="text-amber-400"/>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};
