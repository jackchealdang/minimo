import Navbar from "@/components/Navbar/Navbar"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function MainLayout({children}: Props) {

    return (
        <div>
            <header>
                <Navbar/>
            </header>
            <main>
                {children}
            </main>
            <footer>

            </footer>
        </div>
    )
}