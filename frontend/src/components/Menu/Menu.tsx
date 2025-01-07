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

export default function Menu() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <>
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm} modal={false}>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className='hover:bg-accent hover:text-accent-foreground'>File</MenubarTrigger>
            <MenubarContent>
              <DialogTrigger asChild>
                <MenubarItem>
                  Create Todo
                  <MenubarShortcut></MenubarShortcut>
                </MenubarItem>
              </DialogTrigger>
              <MenubarItem disabled>
                Create Folder
                <MenubarShortcut></MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
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
