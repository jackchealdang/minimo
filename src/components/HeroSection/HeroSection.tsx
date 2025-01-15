import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

export function HeroSection() {

    return (
        <div className="w-full h-max flex items-center justify-start mt-48 ml-12">
            <div className="flex flex-col text-left space-y-4">
                <h1 className="text-6xl font-extrabold">Minimo.</h1>
                <h3 className="ml-1">A minimal Todo app.</h3>
                <Link to='/minimo/signup' className={buttonVariants({variant: 'default', className: 'max-w-fit'})}>Get started →</Link>
            </div>
        </div>
    )
}