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
import { CompanyLinks, CandidateLinks} from "./sidebar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useAuthContext } from "@/components/shared/AppProvider";
import { useRouter } from "next/navigation";

function header() {
    
    const auth = useAuthContext();
    const router = useRouter();
    const logOutHandler = async () => {
        await auth.logout();
        router.push('/');
        router.refresh();
    }

    let sideBarLinks = auth.isLoggedIn ? (
        <>
            {auth.type.toLowerCase() === 'doanh nghiệp' && CompanyLinks}
            {auth.type.toLowerCase() === 'ứng viên' && CandidateLinks}
            
        </>
    ) : (
        <Link href="/signin"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Home className="h-4 w-4" />
            Đăng nhập
        </Link>
    )

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
                        {sideBarLinks}

                    </nav>

                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">

            </div>
            <ModeToggle />
        </header>

    )
}

export default header