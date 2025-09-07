"use client"

import { Users } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface SessionContext{
    user: Users | null
}

const sessionContext = createContext<SessionContext>({user: null})
export  function SessionProvider({children}){
    
    const [user, setUser] = useState(null)
    async function getUser() {
        const res = await fetch("/api/auth/session")
        const data = await res.json()
        setUser(data.data)
        console.log("user:", data)
    }

    useEffect(()=>{
        getUser()
    }, [])

    return(
        <sessionContext.Provider value={{user}}>{children}</sessionContext.Provider>
    )
}
export function useSession(){
    const session = useContext(sessionContext)
    return session
}