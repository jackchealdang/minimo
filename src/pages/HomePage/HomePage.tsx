import Todo from "@/components/Todo/Todo";
import { MainLayout } from "../MainLayout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { HeroSection } from "@/components/HeroSection/HeroSection";

export function HomePage() {
    const { user } = useAuth();

    return (
        <>
        <MainLayout>
            {user ? <Todo/> : <HeroSection/>}
        </MainLayout>
        </>
    )
}