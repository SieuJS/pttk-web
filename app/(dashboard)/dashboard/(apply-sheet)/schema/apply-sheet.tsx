"use client" 
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/app/(dashboard)/components/ui/button"

export type ApplySheet = {
    maphieuungtuyen: string;
    maungvien : string ;
    thoigianungtuyen : string ;
    trangthai : string;
    cv : string ;
    thongbao : string;
}

export const columns : ColumnDef <ApplySheet>[] =[
    {
        accessorKey : 'maphieuungtuyen',
        header : 'Mã phiếu'
    },
    {
        accessorKey : 'maungvien',
        header : 'Email ứng viên'
    },
    {
        accessorKey : 'thoigianungtuyen',
        header: ({ column })=> {
            return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Thời gian ứng tuyển
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell : ({row}) => {
            const sheet = row.original
            return (<div className="text-400">{new Date(sheet.thoigianungtuyen).toDateString()}</div>)
        }
    },
    {
        accessorKey : 'trangthai' ,
        header : 'Trạng thái'
    },
    {
        accessorKey : 'thongbao',
        header : 'Thông báo'
    }
]