'use client'
import { usePathname } from "next/navigation"
import { pathToFileURL } from "url";

export default function usePath () {
    let path = usePathname() ;
    return path; 
}
