"use client"
import { useForm } from "react-hook-form"
import LoadingModal from "@/components/modal/LoadingModal"
import { useRouter } from "next/navigation"
import Link from "next/link";

import { useState } from "react"
import { useHttpClient } from "@/shared/hooks/http-hook"
import { AuthResponse } from "@/shared/schema/AuthReponse"
import { UserData } from "@/shared/hooks/auth-hook"
import { BackEndURL } from "@/config";

import { useAuthContext } from "@/components/shared/AppProvider"
import CenterCard from "./ui/CenterCard"
import Input from "@/components/ui/Input"

type FormData = {
    matkhau: string,
    masothue: string,
    nguoidaidien: string,
    sdt: string,
    email: string,
    diachi: string,
    tencongty: string,
}

const RegisterForm = () => {
    const router = useRouter();
    const [openLoader, setOpenLoader] = useState(false);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        defaultValues: {
            matkhau: "",
            nguoidaidien: "",
            masothue: "",
            sdt: "",
            email: "",
            diachi: "",
            tencongty: ""
        }
    })
    const { sendRequest, isLoading, error, clearError } = useHttpClient()
    const auth = useAuthContext() ; 
    const onSubmit = handleSubmit(async (formData: FormData) => {

        let data;
        setOpenLoader(true)
        console.log(formData)
        try {
            data = await sendRequest(
                `${BackEndURL}/regis-sheet/create`, 'POST', {
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



    return (
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
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Đăng ký Công ty Thành viên</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <Input
                            type="text"
                            label="Mã số thuế"
                            id="masothue"
                            errors={errors}
                            disabled={isSubmitting}
                            register={{
                                ...register("masothue", { required: true })
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            label="Tên công ty"
                            id="tencongty"
                            errors={errors}
                            disabled={isSubmitting}
                            register={{
                                ...register("tencongty", { required: true })
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            label="Người đại diện"
                            id="nguoidaidien"
                            errors={errors}
                            disabled={isSubmitting}
                            register={{
                                ...register("nguoidaidien", { required: true })
                            }}
                        />
                    </div>


                    <div className="mb-4">
                        <Input
                            type="text"
                            label="Địa chỉ"
                            id="diachi"
                            errors={errors}
                            disabled={isSubmitting}
                            register={{
                                ...register("diachi", { required: true })
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            label="Số điện thoại"
                            id="sdt"
                            errors={errors}
                            disabled={isSubmitting}
                            register={{
                                ...register("sdt", { required: true })
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="email"
                            label="Email"
                            id="email"
                            errors={errors}
                            disabled={isSubmitting}
                            register={{
                                ...register("email", { required: true })
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="password"
                            label="Mật khẩu"
                            id="matkhau"
                            errors={errors}
                            disabled={isSubmitting}
                            register={{
                                ...register("matkhau", { required: true })
                            }}
                        />
                    </div>
                    <Link href="/signin">Quay về đăng nhập</Link>

                    <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Đăng ký </button>
                </form>
            </CenterCard>
        </>)
}

export default RegisterForm;