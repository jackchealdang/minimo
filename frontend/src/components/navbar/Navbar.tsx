import { ModeToggle } from '../mode-toggle';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from '../ui/menubar';

function Navbar() {
  return (
    <div className='w-full flex items-center justify-between text-center'>
      <div className='flex items-center gap-5'>
        <h1 className='font-bold'>ToDo</h1>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>
                    Create Todo
                    <MenubarShortcut></MenubarShortcut>
                </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
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
