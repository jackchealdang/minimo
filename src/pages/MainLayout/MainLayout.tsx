import Navbar from "@/components/Navbar/Navbar"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function MainLayout({children}: Props) {

    return (
        <div className="h-full w-full">
            <header className="sticky top-0">
                <Navbar/>
            </header>
            <main className="">
                {children}
            </main>
            <footer>

            </footer>
        </div>
    )
}