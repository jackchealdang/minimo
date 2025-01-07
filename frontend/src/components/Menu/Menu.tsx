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
      <Dialog modal={false}>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <DialogTrigger asChild>
                <MenubarItem>
                  Create Todo
                  <MenubarShortcut></MenubarShortcut>
                </MenubarItem>
              </DialogTrigger>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Todo</DialogTitle>
            {/* <DialogDescription>Create Todo</DialogDescription> */}
          </DialogHeader>
          <CreateTodoForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
