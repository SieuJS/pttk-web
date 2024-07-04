'use client'

import { useHttpClient } from "@/shared/hooks/http-hook"
import { inforList } from "../../constants/dashboard"
import config from "@/config";
import {

    TableCell,

    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import LoadingModal from "../modal/LoadingModal";

export interface InforSheetProps {
    token: string | undefined
}

export default function InforSheet ( {token} : InforSheetProps) { 

    const {sendRequest, isLoading, clearError, error} = useHttpClient()
    const [info, setInfor] = useState<any>(); 
    const [openLoading, setOpenLoading] = useState(false)
    useEffect(() => {
        if(!token) return ;
        let data  ;
        setOpenLoading(true)
        const fetchInfoSheet = async () => {
            try{
            data = await sendRequest(
                config.serverRuntimeConfig.backendAPI + '/company/infor',
                'GET' , {
                    'Authorization' : `Bearer ${token}` 
                }
            )

            setInfor(data.data) ; 

            }
            catch (error) {
                console.log(error)
            }
            setOpenLoading(false)
        }
        fetchInfoSheet() ; 
    }, [token])

    return (
        <>
        {openLoading &&
        <LoadingModal
            open = {isLoading} 
            onClose={() =>{clearError(); setOpenLoading(false) } }
            messOnDone={"Hoàn thành"}
            messOnError={error}
            messOnLoading="Đang lấy dữ liệu"
            isError = {!!error}
        /> }
        {
        info &&
        inforList.map(i => (
            <TableRow>
              <TableCell>
                <div className="font-medium">{i.label}</div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{(info as any)[i.value]}</div>
              </TableCell>
            </TableRow>
          ))}
        
        </>
    )
}