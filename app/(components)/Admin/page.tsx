'use client'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  
export default function Admin(){
    return (
        <div className="flex bg-slate-300/40 h-screen justify-center">
            <div className="">
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>Orders</MenubarTrigger>
                        <MenubarContent>
                        <MenubarItem>
                            All <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>Unfulfilled</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Fulfilled</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Disputes</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    )
}