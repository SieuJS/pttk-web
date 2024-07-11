"use client"


import React , {useEffect, useState} from 'react'
import { CardHeader, CardContent } from '@/components/ui/card'
import { Table,TableBody,TableCell,TableRow } from '@/components/ui/table'
import { useHttpClient } from '@/shared/hooks/http-hook'
import { FormData } from '@/app/(hiring-sheet)/components/CreateSheet'
import { BackEndURL } from '@/config'
import { Button } from '@/app/(dashboard)/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthHook from '@/shared/hooks/auth-hook'
import { useAuthContext } from '../shared/AppProvider'
import { CircularProgress } from '@mui/material'
import { useEdgeStore } from "@/lib/edgestore";
import Input from '@/app/(dashboard)/components/ui/input'

interface DetailProps {
    maphieudangtuyen: string;
}

function HiringDetail({ maphieudangtuyen }: DetailProps) {
    const router = useRouter();
    const auth = useAuthContext() ;
    console.log(auth);
    const [file, setFile] = useState<File> () ;
    const {edgestore} = useEdgeStore() ;
    const [data, setData] = useState<FormData>() ;
    const {sendRequest, isLoading, error, clearError} = useHttpClient() ;
    const [isApplied, setIsApplied] = useState(false);
    const [linkImg, setLinkImg] = useState<string>()
    const [uploadingImg, setIsUploadingImg] = useState(false)
    const uploadImageHandler = async () => {
        setIsUploadingImg(true);
        if (file) {
          const res = await edgestore.publicFiles.upload({
            file,
          });
          console.log(res.url)
          setLinkImg(res.url)
        }
        setIsUploadingImg(false)
      };
    
      useEffect(() => {
        if (file) {
          uploadImageHandler();
        }
      }, [file]);

    const doApply = async () => {
        console.log(linkImg)
        try {
            let response = await sendRequest(
                BackEndURL+'/candidate/apply/'+maphieudangtuyen,
                'POST',
                {
                    'Authorization' : `Bearer ${auth.token}` 
                },
                JSON.stringify({"cv" : linkImg})
            )
            setIsApplied(true)
        }
        catch (err) {
            console.log(err) ; 
        }
    }

    useEffect(()=> {
        if (!auth.token) return ;
        const fetchData = async () => {
            try {
            let response = await sendRequest(
                BackEndURL+'/candidate/check-apply/'+maphieudangtuyen,
                'GET',
                {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth.token}` 
                }

            )
            if(response.isApplied) {
                setIsApplied(true)
            }else{
                setIsApplied(false)
            }
            }
            catch (err) {
                console.log(err)

            }
        }
        fetchData();
    },[auth.token])

    console.log(!auth.token, !file, !!isApplied )

    useEffect(() => {
        const fetchData = async() => {
            try {
                let response ;
                response = await sendRequest(
                    BackEndURL+'/hiring-sheet/get/'+maphieudangtuyen
                )
                setData(response.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData() ;
    }, [maphieudangtuyen])

  return (
    <>
                <CardHeader>
                <h2 className='font-medium'>Job require</h2>
                <div className="border"></div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Giới tính:</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{data?.yeucau?.gioitinh}</div>
                            </TableCell>
                            <TableCell className='border-l'>
                                <div className="font-medium">Bằng cấp:</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{data?.yeucau?.bangcap}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Độ tuổi:</div>
                            </TableCell>
                            <TableCell colSpan={3}>
                                <div className="font-medium">
                                    Từ {data?.yeucau?.tuoimin} đến {data?.yeucau?.tuoimax}
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Mô tả</div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className='font-medium ml-4 mb-2'>
                    {data?.mota}
                </div>
                <div className="border mt-2"></div>
            </CardContent> 
            <div className="ml-4">
            <Input
              label="Chọn hình CV của bạn"
              type="file"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
              }}
              id="file"
            />
              <Button disabled = {(!auth.token || !file || !!isApplied  || !linkImg)} onClick={doApply} className='mt-4'>
                 {isLoading || uploadingImg ? <CircularProgress/> : isApplied ? "Đã ứng tuyển" : "Ứng tuyển"}  
                </Button>
                {error && <div className='text-red-400'>{error}</div>}
            </div>          
        </>
  )
}

export default HiringDetail