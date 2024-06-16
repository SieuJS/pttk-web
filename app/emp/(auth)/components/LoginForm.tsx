"use client"

import {useForm} from "react-hook-form"
import Input from "@/components/ui/Input";

import LoadingModal from "@/components/modal/LoadingModal";

import {
    FormData,
    loginAction,
    ResponseData
} from "@/app/emp/(auth)/actions/loginAction"
import { useState } from "react";
import saveData from "@/utils/saveAcc";

const LoginForm = () => {

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

    const [isLoading, setIsLoading] = useState(false) ;
    const [open, setIsOpen] = useState (false);
    const [response, setResponse] = useState({message : ""});

    const onClose = () => {
        setIsOpen (false)
        
    }
    
    const onSubmit = handleSubmit (async (data : FormData) => {
        setIsOpen(true)
        setIsLoading(true);
        let resData = await loginAction (data);
        setResponse(resData) ;
        if(resData?.ok) {
            saveData(resData, 'Nhân viên tiếp nhận')
        }
        setIsLoading(false)
        reset();
    })

    


    return (
        <>
    <LoadingModal
        isLoading = {isLoading} 
        open = {open}
        onClose={onClose}
        messOnLoading="Chúng tôi đang tiến hành đăng nhập"
        messOnDone= {response.message}
    />
    <div className="mt-10 flex items-center justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back!</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <Input 
                    type="text" 
                    label="Username"
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
                        label="Password"
                        id="password" 
                        errors = {errors}
                        disabled = {isSubmitting}
                        register={{
                            ...register ("password", {required : true})
                        }}
                        />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" checked/>
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
                    </div>
                    <a href="#"
                        className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
                        Account</a>
                </div>
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
            </form>
        </div>
    </div>
    </>
    )
}

export default LoginForm;