"use client"
import {useForm} from "react-hook-form"
import Input from "@/components/ui/Input";

import LoadingModal from "@/components/modal/LoadingModal";
import Centercard from "@/app/(auth)/components/ui/CenterCard"
import { useRouter } from 'next/navigation'
import {
    FormData, setCookie
} from "@/app/(auth)/actions/loginAction"
import { useState, useContext } from "react";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { AuthResponse } from "@/shared/schema/AuthReponse";
import { UserData } from "@/shared/hooks/auth-hook";
import { BackEndURL } from "@/config"
import Link from "next/link";
import { useAuthContext } from "@/components/shared/AppProvider";
import { Button } from "@/app/(dashboard)/components/ui/button";
const LoginForm = () => {
    const router = useRouter();
    const {
        register,
        setValue,
        handleSubmit, 
        formState : {errors, isSubmitting},
        reset,
    } = useForm<FormData>({
        defaultValues : {
            username : "",
            password : ""
        }
    });
    const auth = useAuthContext()

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [data, setData] = useState<AuthResponse>()
    const [open, setOpen] = useState(false)

    
    const onSubmit = handleSubmit (async (formData : FormData) => {
        let data;
        setOpen(true)
        try {       
            data = await sendRequest(BackEndURL+'/auth/signin', 'POST', {
                'Content-Type': 'application/json'
            }, JSON.stringify(formData));
            let userData : UserData = {
                userId : data.account.username,
                token : data.accessToken,
                type : data.account.type,
                expiredDateToken : null
            }
            await auth.login(userData);

            router.push('/')
            router.refresh()
        }catch (error) 
        {
            console.log(error)
        }
    }
    )

    const onCloseModal = () => {
        clearError();
        setData(undefined);
        setOpen(false)
    }

    return (
        <>
    <LoadingModal
        isLoading = {isLoading} 
        open = {open}
        onClose={onCloseModal}
        messOnLoading="Chúng tôi đang tiến hành đăng nhập"
        messOnDone= {data?.message || ""}
        isError = {!!error} 
        messOnError={error}
    />
        <Centercard>
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Xin chào !!!</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <Input 
                    type="text" 
                    label="Tên tài khoản"
                    id="username" 
                    errors = {errors}
                    disabled = {isSubmitting}
                    register={{
                        ...register ("username", {required : true})
                    }}
                    />
                </div>
                <div className="mb-4">
                    <Input 
                        type="password" 
                        label="Mật khẩu"
                        id="password" 
                        errors = {errors}
                        disabled = {isSubmitting}
                        register={{
                            ...register ("password", {required : true})
                        }}
                        />
                </div>
                <div className="flex items-center justify-between mb-3 border-b-2">
                    <div className="flex items-center">
                        <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" checked/>
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Ghi nhớ</label>
                    </div>
                </div>

                <div className="text-400 grid grid-cols-2 gap-3 py-3 border-b-2">
                    <h3 className="col-span-2 font-bold">Đăng ký tài khoản</h3>
                    <Button variant={'outline'} ><Link href={'/register'}>Doanh nghiệp</Link></Button>
                    <Button variant={'outline'}><Link href={'/signup'}>Ứng viên</Link></Button>

                    <Button className="col-span-2">Đăng nhập</Button>

                </div>
            </form>
    </Centercard>
    </>
    )
}

export default LoginForm;