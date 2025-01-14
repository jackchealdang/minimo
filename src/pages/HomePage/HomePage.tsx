import Todo from "@/components/Todo/Todo";
import { MainLayout } from "../MainLayout/MainLayout";

export function HomePage() {

    return (
        <>
        <MainLayout>
            <Todo/>
        </MainLayout>
        </>
    )
}