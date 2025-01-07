import { ModeToggle } from "../mode-toggle"

function Navbar() {
    return (
        <div className="w-full flex items-center justify-between text-center">
            <div className="">
                <h1 className='font-bold'>ToDo</h1>
            </div>
            {/* <div className="border rounded-full">
                <a>Getting Started</a>
            </div> */}
            <div className="flex">
                <ModeToggle/>
            </div>
        </div>
    )
}

export default Navbar