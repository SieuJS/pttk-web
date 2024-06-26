'use client'
import Link from "next/link";
import {
    Bell,
    CircleUser,
    Home,
    Menu,
    Package2,
    ShoppingCart,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "../ui/mode-toggle";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useAuthContext } from "./AppProvider";
import { useRouter } from "next/navigation";

function header() {
    
    const auth = useAuthContext();
    const router = useRouter();
    const logOutHandler = async () => {
        await auth.logout();
        router.push('/');
        router.refresh();
    }

    return (

        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon"className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link href="#"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                            <Home className="h-5 w-5" />
                            Thông tin cá nhân
                        </Link>
                        <Link href="/"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
                            <ShoppingCart className="h-5 w-5" />
                            Phiếu đăng ký
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                6
                            </Badge>
                        </Link>

                    </nav>

                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">

            </div>
            <ModeToggle />
            {auth.isLoggedIn && (<DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logOutHandler}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>)
            }
        </header>

    )
}

export default header