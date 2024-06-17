"use client" 
import {useForm} from "react-hook-form"
import LoadingModal from "@/components/modal/LoadingModal"
import { useRouter } from "next/navigation"

import { useState } from "react"
import { useHttpClient } from "@/shared/hooks/http-hook"
import { AuthResponse } from "@/shared/schema/AuthReponse"
import { UserData } from "@/shared/hooks/auth-hook"
import config from "@/config"

import { useAuthContext } from "@/components/shared/AppProvider"
import CenterCard from "./ui/CenterCard"
import Input from "@/components/ui/Input"
import { MdCollectionsBookmark } from "react-icons/md"
type FormData = {
    password : string ,
    cccd : string , 
    hoten : string ,
    sdt : string , 
    email : string , 
    diachi: string      

}

const SignUp = () => {
    const router = useRouter();
    const {
        register, 
        setValue, 
        handleSubmit, 
        formState : {errors, isSubmitting},
        reset,
    } = useForm<FormData>({
        defaultValues : {
            password : "", 
            hoten: "",
            cccd : "", 
            sdt : "",
            email : "",
            diachi : ""
        }
    })

    const onSubmit = handleSubmit( async (formData : FormData) => {
        console.log(formData)
    })



    return(
    <>
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
                type = "password"
                label="Mật khẩu"
                id = "password"
                errors = {errors}
                disabled = {isSubmitting}
                register={{
                    ...register ("password", {required : true})
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
        <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Đăng ký Ứng viên</button>
    </form>
    </CenterCard>
    </>)
}

export default SignUp