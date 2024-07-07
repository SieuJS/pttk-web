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
import { CircularProgress, Modal } from '@mui/material'
interface DetailProps {
    maphieudangtuyen: string;
}

function HiringDetail({ maphieudangtuyen }: DetailProps) {
    const router = useRouter();
    const auth = AuthHook();
    const [modal, setModal] = useState(false)
    const [data, setData] = useState<FormData>() ;
    const {sendRequest, isLoading, error, clearError} = useHttpClient() ;
    
    const doApply = async () => {
        try {
            setModal(true)
            let response = await sendRequest(
                BackEndURL+'/candidate/apply/'+maphieudangtuyen,
                'POST',
                {
                    'Authorization' : `Bearer ${auth.token}` 
                }
            )
            setModal(false)
        }
        catch (err) {
            console.log(err) ; 
        }
    }


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
    <Modal
    open = {modal}
    onClose={() => {setModal(false); clearError()}}   
    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[600px] flex justify-center'
    >
        <>
        {error && (<div>{error}</div>)}
        {isLoading && <CircularProgress/>}
        </>
    </Modal>
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
                <div className="border mt-2 mb-2"></div>
            </CardContent> 
            <div className="mt-4 ml-4">
              <Button disabled = {!auth.token} onClick={doApply}>Apply Now</Button>
            </div>          
        </>
  )
}

export default HiringDetail