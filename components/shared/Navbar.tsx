"use client";

import Link from "next/link";
import { navLinks } from "@/constants";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { MdAdsClick } from "react-icons/md";
import { Button } from "@/app/(dashboard)/components/ui/button";
import { useContext, useState } from "react";
import { useAuthContext } from "@/components/shared/AppProvider";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger,DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent } from "@/app/(dashboard)/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";

const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] =
    useState(false);
    const auth = useAuthContext();

  const handleOpenMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  console.log(auth)
  return (
    <nav className="py-5 bg-transparent relative top-0 z-10 w-full">
      <div className="max-w-[1450px] w-[90%] mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="flex items-center gap-1">
            <h1 className="text-black font-semibold uppercase text-xl">
              Workify
            </h1>

            <MdAdsClick className="text-purple-600 text-3xl" />
          </div>
        </Link>

        <ul className="flex gap-16 items-center max-md:hidden">
          {navLinks.map((link, index) => (
            <Link href={link.route} key={index}>
              <li>{link.name}</li>
            </Link>
          ))}
        </ul>

        <div className="max-md:flex justify-center items-center gap-10">
          { !auth.token &&
          <Link href={"/signin"}>
            <Button>Đăng nhập</Button>
          </Link>
          }
          {
            auth.token && 
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href={'/dashboard'}>Infor Page</Link></DropdownMenuItem>
                    <DropdownMenuItem>Setting</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={auth.logout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          }

          <div
            className="md:hidden text-3xl cursor-pointer text-black"
            onClick={handleOpenMobileMenu}
          >
            {openMobileMenu ? <MdClose /> : <FiMenu />}
          </div>

          {openMobileMenu && (
            <ul className="md:hidden bg-purple-600 absolute top-14 right-5 px-4 py-6 text-center text-white rounded-md flex flex-col gap-3 shadow-md">
              {navLinks.map((link, index) => (
                <Link
                  href={link.route}
                  key={index}
                  onClick={() => setOpenMobileMenu(false)}
                >
                  <li>{link.name}</li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;