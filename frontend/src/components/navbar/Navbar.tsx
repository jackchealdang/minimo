import { useEffect, useState } from 'react';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { LogInForm } from '../LogInForm/LoginForm';
import Menu from '../Menu/Menu';
import { ModeToggle } from '../mode-toggle';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { User } from '@supabase/supabase-js';
import { useSupabase } from '@/contexts/SupabaseContext';
import { toast } from 'sonner';

function Navbar() {
  const supabase = useSupabase();

  async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut({scope: 'local'});
    if (error) {
      toast('Error signing out');
      return
    }
    toast('Signed out!')
  }

  useEffect(() => {
      getUser();
  }, []);

  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <div className='w-full flex items-center justify-between text-center'>
      <div className='flex items-center gap-5'>
        <h1 className='font-bold'>Minimo</h1>
        <Menu/>
      </div>
      {/* <div className="border rounded-full">
                <a>Getting Started</a>
            </div> */}
      <div className='flex items-center gap-x-3'>
        {user ? (<>
          {user.email}
          <Button onClick={() => signOut()}>Sign out</Button>
        </>) : <>
        <Dialog open={showSignUpForm} onOpenChange={setShowSignUpForm} modal={false}>
          <DialogTrigger asChild>
            <Button variant={'outline'}>Sign Up</Button>
          </DialogTrigger>
          <DialogContent className='max-w-lg'>
            <DialogHeader>
              <DialogTitle>Sign up with Minimo</DialogTitle>
              <DialogDescription>
                Create an account to manage your Todos anywhere!
              </DialogDescription>
            </DialogHeader>
            <SignUpForm closeParentDialog={() => setShowSignUpForm(false)}/>
          </DialogContent>
        </Dialog>
        <Dialog open={showLoginForm} onOpenChange={setShowLoginForm} modal={false}>
          <DialogTrigger asChild>
            <Button variant={'outline'}>Log In</Button>
          </DialogTrigger>
          <DialogContent className='max-w-lg'>
            <DialogHeader>
              <DialogTitle>Log In</DialogTitle>
              <DialogDescription>
                Create an account to manage your Todos anywhere!
              </DialogDescription>
            </DialogHeader>
            <LogInForm closeParentDialog={() => setShowLoginForm(false)}/>
          </DialogContent>
        </Dialog>
        </>}
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
