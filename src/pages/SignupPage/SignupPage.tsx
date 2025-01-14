import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import { MainLayout } from '../MainLayout/MainLayout';

export function SignupPage() {
  return (
    <MainLayout>
    <div className='flex w-full h-full items-center justify-center mt-44'>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
    </MainLayout>
  );
}
