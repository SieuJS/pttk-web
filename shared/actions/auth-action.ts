'use server'

import { cookies } from 'next/headers'

export async function loginAction(data : any) {
    await cookies().set({
        name: 'clientToken',
        value: data.token,
        httpOnly: true,
        path: '/',
    })

}

export async function logoutAction () {
    await cookies().delete('clientToken')
}