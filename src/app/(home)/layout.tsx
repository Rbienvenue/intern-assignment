import { Navbar } from "@/components/home/navbar";

export default function HomeLayout({children}){
    return(
        <div className="h-full w-full">
            <Navbar/>
            {children}
        </div>
    )
}