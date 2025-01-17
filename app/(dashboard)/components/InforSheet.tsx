'use client'

import { useHttpClient } from "@/shared/hooks/http-hook"
import { inforList, candidateInforList } from "../constants/dashboard"
import {  Modal } from "@mui/material";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import LoadingModal from "@/components/modal/LoadingModal";
import { BackEndURL } from "@/config";
import { useAuthContext } from "@/components/shared/AppProvider";
import { Button } from "./ui/button";
import Input from "./ui/input";
import {useForm } from 'react-hook-form'
import { Card, CardDescription, CardHeader, CardContent } from "./ui/card";
import { useRouter } from "next/navigation";
import Router from "next/router";
import CircularProgress from "@mui/joy/CircularProgress";
export interface InforSheetProps {
    token: string | undefined,
    context? : string ,
    email ? : string ,
}

export interface EditForm { 
  email : string | undefined ; 
  tencongty : string | undefined ; 
  nguoidaidien : string | undefined ;
  diachi : string | undefined; 
}

export default function InforSheet ( {token} : InforSheetProps) { 
    const auth = useAuthContext() ; 
    const {sendRequest, isLoading, clearError, error} = useHttpClient()
    const [info, setInfor] = useState<any>(); 
    const [openLoading, setOpenLoading] = useState(false);
    const [editModal , setEditModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const closeEditHandler = () => {
      setEditModal(false);
      setSuccess(false);
      clearError() ;
      router.push('/') ; 
      router.replace('/dashboard');

      router.refresh(); 
    
    } 
    const {
      getValues, 
      register,
      formState : {errors, isSubmitting},
      handleSubmit, 
      reset
      
    } = useForm<EditForm>(
      {
        defaultValues : {
          email : '' , 
          tencongty : '', 
          nguoidaidien : '', 
          diachi : ''
        }
      }
    )
 
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
    }, [auth.token, token, success])


    const onSubmitEdit = handleSubmit( async(formData : EditForm) => {
      console.log(formData);
      try {
        let response = await sendRequest(BackEndURL + '/regis-sheet/update' , 
          'POST' , 
          {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${auth.token}` 
          }, JSON.stringify(formData)
        )
        setSuccess(true)
      }catch (err) {

      }
    })

    return (
        <>

        <Modal
        open = {editModal}
        onClose={closeEditHandler}
        >
            <Card>
              <CardHeader>Chỉnh sửa thông tin
              <CardDescription>
                Bỏ trống nếu bạn không muốn chỉnh sửa
              </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmitEdit}>
                <Input
                  id = 'tencongty'
                  label="Tên công ty"
                  register={{...register('tencongty')}}
                />
                <Input
                  id = 'nguoidaidien'
                  label = 'Người đại diện'
                  register={{...register('nguoidaidien')}}
                />
                <Input
                  id = 'email' 
                  label="Email"
                  register={{...register('email')}}
                />
                <Input
                  id = 'diachi'
                  label="Địa chỉ"
                  register={{...register(
                    'diachi'
                  )}}
                />
                <div className="flex gap-4">
                <Button className="mt-4" onClick={closeEditHandler} variant={'destructive'}>Huỷ</Button>
                <Button className="mt-4" disabled = {success}>
                  
                  {
                    isLoading ? <CircularProgress/> : success ? "Thành công" :
                    "Chỉnh sửa"
                  }

                </Button>
                </div>
                </form>
                <div className="text-red-500">{error}</div>
              </CardContent>
            </Card>

        </Modal>

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
        inforList.map((i) => (
            <TableRow key = {i.value} >
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
            <TableRow key = {i.value}>
              <TableCell>
                <div className="font-medium">{i.label}</div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{(info as any)[i.value]}</div>
              </TableCell>
            </TableRow>
          ))}
        <TableRow className="">
          <TableCell>

          { auth.type.toLowerCase() === 'doanh nghiệp' &&
        <Button onClick={() => {setEditModal(true)}} className="mt-4">Chỉnh sửa thông tin</Button>
          }
        </TableCell>
        </TableRow>
        </>
    )
}