import { cookies, headers } from "next/headers";
import jwt from 'jsonwebtoken'

export async function auth() {
    try{
        const cookiesStore = await cookies()
        const headersStore = await headers()
        const token = cookiesStore.get('auth-token')?.value || headersStore.get('authorization')?.split(' ')[1]
        if (!token) return null
        const payload = jwt.verify(token, process.env.JWT_SECRET!)
        return payload
    } catch(e){
        console.error(e);
        return null
    }
}