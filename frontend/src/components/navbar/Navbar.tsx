import Menu from '../Menu/Menu';
import { ModeToggle } from '../mode-toggle';

function Navbar() {
  return (
    <div className='w-full flex items-center justify-between text-center'>
      <div className='flex items-center gap-5'>
        <h1 className='font-bold'>ToDo</h1>
        <Menu/>
      </div>
      {/* <div className="border rounded-full">
                <a>Getting Started</a>
            </div> */}
      <div className='flex'>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
