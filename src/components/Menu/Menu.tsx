import { useState } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '../ui/menubar';
import { CreateTodoForm } from '../CreateTodoForm/CreateTodoForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';

export default function Menu() {
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <>
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm} modal={false}>
        <Menubar className='hidden sm:flex'>
          <MenubarMenu>
            <MenubarTrigger className='hover:bg-accent hover:text-accent-foreground'>File</MenubarTrigger>
            <MenubarContent>
              <DialogTrigger asChild>
                <MenubarItem disabled={user ? false : true}>
                  Create Todo
                  <MenubarShortcut></MenubarShortcut>
                </MenubarItem>
              </DialogTrigger>
              <MenubarItem disabled>
                Create Folder
                <MenubarShortcut></MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                Settings
                <MenubarShortcut></MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className='hover:bg-accent hover:text-accent-foreground'>Edit</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className='hover:bg-accent hover:text-accent-foreground'>Help</MenubarTrigger>
            <MenubarContent>
              <MenubarItem disabled>
                Shortcuts
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
          <MenubarTrigger className='hover:bg-accent hover:text-accent-foreground'>About</MenubarTrigger>
            <MenubarContent>
              <MenubarItem disabled>
                About Minimo
              </MenubarItem>
              <MenubarItem disabled>What's new</MenubarItem>
              <MenubarItem disabled>Roadmap</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <DialogTrigger asChild>
          <Button className='font-extrabold text-lg'>+</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Todo</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <CreateTodoForm closeParentDialog={() => setShowCreateForm(false)}/>
        </DialogContent>
      </Dialog>
    </>
  );
}
