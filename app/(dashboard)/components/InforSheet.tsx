'use client'

import { useHttpClient } from "@/shared/hooks/http-hook"
import { inforList, candidateInforList } from "../constants/dashboard"

import {

    TableCell,

    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import LoadingModal from "./modal/LoadingModal";
import { BackEndURL } from "@/config";
import { useAuthContext } from "@/components/shared/AppProvider";
export interface InforSheetProps {
    token: string | undefined,
    context? : string ,
    email ? : string ,
}
export default function InforSheet ( {token} : InforSheetProps) { 
    const auth = useAuthContext() ; 
    const {sendRequest, isLoading, clearError, error} = useHttpClient()
    const [info, setInfor] = useState<any>(); 
    const [openLoading, setOpenLoading] = useState(false);
    useEffect(() => {
        if(!auth.token) return ;
        setOpenLoading(true)
        const fetchInfoSheet = async () => {
            try{
            let data;
            if(!auth.token) return;
            if (auth.type?.toLowerCase() ==='doanh nghiệp') {

            
            data = await sendRequest(
                BackEndURL + '/company/infor',
                'GET' , {
                    'Authorization' : `Bearer ${auth.token}` 
                }
            )
            }
            else {
                data = await sendRequest (
                    BackEndURL + '/candidate/get/'+auth.userId
                )
            }

            setInfor(data.data) ; 

            }
            catch (error) {
                console.log(error)
            }
            setOpenLoading(false)
        }
        fetchInfoSheet() ; 
    }, [auth.token, token])

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
        info && auth.type?.toLowerCase() ==='doanh nghiệp' &&
        inforList.map(i => (
            <TableRow>
              <TableCell>
                <div className="font-medium">{i.label}</div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{(info as any)[i.value]}</div>
              </TableCell>
            </TableRow>
          ))
          }
        {
        info && auth.type?.toLowerCase() ==='ứng viên' &&
        candidateInforList.map(i => (
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