"use client" 
import {useForm} from "react-hook-form"
import LoadingModal from "@/components/modal/LoadingModal"
import { useRouter } from "next/navigation"

import { useState } from "react"
import { useHttpClient } from "@/shared/hooks/http-hook"
import { AuthResponse } from "@/shared/schema/AuthReponse"
import { UserData } from "@/shared/hooks/auth-hook"
import AuthHook from "@/shared/hooks/auth-hook"
import { BackEndURL } from "@/config"
import CenterCard from "./ui/CenterCard"
import Input from "@/components/ui/Input"
import { Button } from "@/app/(dashboard)/components/ui/button"
type FormData = {
    matkhau : string ,
    cccd : string , 
    hoten : string ,
    sdt : string , 
    email : string , 
    diachi: string      

}

const SignUp = () => {
    const auth = AuthHook();
    const router = useRouter();
    const [openLoader, setOpenLoader] = useState(false);

    const {sendRequest,isLoading, error, clearError} = useHttpClient();
    const {
        register, 
        setValue, 
        handleSubmit, 
        formState : {errors, isSubmitting},
        reset,
    } = useForm<FormData>({
        mode : 'all',
        defaultValues : {
            matkhau : "", 
            hoten: "",
            cccd : "", 
            sdt : "",
            email : "",
            diachi : ""
        }
    })

    const onSubmit = handleSubmit( async (formData : FormData) => {
        let data;
        setOpenLoader(true)
        console.log(formData)
        try {
            data = await sendRequest(
                `${BackEndURL}/candidate/create`, 'POST', {
                'Content-Type': 'application/json'
            }, JSON.stringify(formData));

            let userData : UserData = {
                userId : data.account.username,
                token : data.accessToken,
                type : data.account.type,
                expiredDateToken : null
            }
            await auth.login(userData)
            console.log('success')
            router.push('/')
            router.refresh()
        } catch (err) {
            console.log(err)
        }
        
    })



    return(
    <>
            <LoadingModal
                isLoading={isLoading}
                open={openLoader}
                onClose={() => { clearError(); setOpenLoader(false) }}
                messOnDone={"Đăng ký thành công"}
                messOnLoading="Đang đăng ký"
                messOnError={error}
                isError={!!error}
            />
    <CenterCard>
    <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Đăng ký thành viên</h1>
    <form onSubmit={onSubmit}>
        <div className="mb-4">
            <Input
                type = "email"
                label="Email"
                id = "email"
                errors = {errors}
                disabled = {isSubmitting}
                register={{
                    ...register ("email", {required : true})
                }}
            />
        </div>
        <div className="mb-4">
            <Input
                type = "matkhau"
                label="Mật khẩu"
                id = "matkhau"
                errors = {errors}
                disabled = {isSubmitting}
                register={{
                    ...register ("matkhau", {required : true})
                }}
            />
        </div>
        <div className="mb-4">
            <Input
                type = "text"
                label="Tên ứng viên"
                id = "hoten"
                errors = {errors}
                disabled = {isSubmitting}
                register={{
                    ...register ("hoten", {required : true})
                }}
            />
        </div>
        <div className="mb-4">
            <Input
                type = "text"
                label="CCCD"
                id = "cccd"
                errors = {errors}
                disabled = {isSubmitting}
                register={{
                    ...register ("cccd", {required : true})
                }}
            />
        </div>

        <div className="mb-4">
            <Input
                type = "text"
                label="Địa chỉ"
                id = "diachi"
                errors = {errors}
                disabled = {isSubmitting}
                register={{
                    ...register ("diachi", {required : true})
                }}
            />
        </div>
        <div className="mb-4">
            <Input
                type = "text"
                label="Số điện thoại"
                id = "sdt"
                errors = {errors}
                disabled = {isSubmitting}
                register={{
                    ...register ("sdt", {required : true })
                }}
            />
        </div>
        <Button className="w-full" >Đăng ký ứng viên</Button>
    </form>
    </CenterCard>
    </>)
}

export default SignUp