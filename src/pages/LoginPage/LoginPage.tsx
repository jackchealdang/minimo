import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogInForm } from "../../components/LogInForm/LogInForm";
import { MainLayout } from "../MainLayout/MainLayout";

export function LoginPage() {

    return (
        <MainLayout>
        <div className="flex w-full h-full items-center justify-center">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Log In</CardTitle>
                </CardHeader>
                <CardContent>
                    <LogInForm/>
                </CardContent>
            </Card>
        </div>
        </MainLayout>
    )
}