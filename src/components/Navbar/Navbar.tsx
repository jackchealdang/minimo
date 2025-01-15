import { useState } from 'react';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import Menu from '../Menu/Menu';
import { ModeToggle } from '../mode-toggle';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { useSupabase } from '@/contexts/SupabaseContext';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { LogInForm } from '../LogInForm/LogInForm';
import { Link } from 'react-router-dom';
import { LogInIcon } from 'lucide-react';

function Navbar() {
  const { user } = useAuth();
  const supabase = useSupabase();

  async function signOut() {
    const { error } = await supabase.auth.signOut({scope: 'local'});
    if (error) {
      toast('Error signing out');
      return
    }
    toast('Signed out!')
  }

  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <div className='w-full flex items-center justify-between text-center'>
      <div className='items-center gap-5 flex'>
        <Link to='/minimo'>
          <h1 className={`${user ? 'hidden' : 'block'} sm:block font-bold`}>Minimo.</h1>
        </Link>
        {user &&
        (<Menu/>)
        }
      </div>
      {/* <div className="border rounded-full">
                <a>Getting Started</a>
            </div> */}
      <div className='flex items-center gap-x-3'>
        {user ? (<>
        <div className='hidden sm:block'>
          {user.email}
        </div>
        <ModeToggle />
          <Button variant={'outline'} onClick={() => signOut()}>Sign out</Button>
        </>) : <>
        <ModeToggle/>
        <Dialog open={showSignUpForm} onOpenChange={setShowSignUpForm} modal={false}>
          {/* <DialogTrigger asChild> */}
            <Button variant={'ghost'} asChild>
              <Link to='/minimo/signup'>
                Sign Up
              </Link>
              </Button>
          {/* </DialogTrigger> */}
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
          {/* <DialogTrigger asChild> */}
            <Button variant='outline' className='outline outline-1 -outline-offset-1 outline-primary' asChild>
              <Link className='flex items-center gap-x-1 text-rp' to="/minimo/login">
                Log In{" "}<LogInIcon/>
              </Link>
            </Button>
                {/* </DialogTrigger> */}
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
      </div>
    </div>
  );
}

export default Navbar;
