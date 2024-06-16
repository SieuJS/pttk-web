import {cookies } from 'next/headers'

export async function POST (request : Request) {
    const res = await request.json(); 
    const accessToken = res.accessToken;
    console.log(accessToken)
    if (!accessToken) {
        return Response.json({message : "Phiên đăng nhập không hợp lệ"}, {status : 400}
        )
    }
    return Response.json({res}, {
        status : 200,
        headers : {
            'Set-Cookie' : `accessToken=${accessToken}`
        }
    })
}