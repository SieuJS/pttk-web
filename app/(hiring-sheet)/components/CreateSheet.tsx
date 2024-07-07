'use client'
import React, { useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu'


export interface FormData {
    doanhnghiep: string,
    vitridangtuyen: string,
    soluongtuyendung: string,
    khoangthoigiandangtuyen: string,
    donvithoigian: string,
    mota: string,
    thoigiandangtuyen: string,
    hinhthucdangtuyen: Array<string>;
    yeucau : {
        bangcap : string ,
        gioitinh : string,
        tuoimin : string, 
        tuoimax : string

    }

}

