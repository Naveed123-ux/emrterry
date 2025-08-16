import React from 'react';
import { 
  Mail, 
  CheckCircle 
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { useAuth } from '../../contexts/AuthContext';
import type { AuthScreen } from '../../types';

interface VerifyEmailPageProps {
  onScreenChange: (screen: AuthScreen) => void;
  email: string;
}

export const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ 
  onScreenChange, 
  email 
}) => {
  const { resendVerificationEmail, loading } = useAuth();

  const handleResendEmail = async () => {
    try {
      await resendVerificationEmail(email);
      // Show success message
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
          <p className="text-gray-600">We've sent a verification link to</p>
          <p className="font-medium text-gray-900">{email}</p>
        </div>

        <div className="space-y-4">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Please check your email and click the verification link to activate your account.
            </AlertDescription>
          </Alert>

          <Button
            onClick={() => onScreenChange('login')}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Continue to Sign In
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Didn't receive the email?</p>
            <button 
              onClick={handleResendEmail}
              disabled={loading === 'loading'}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              {loading === 'loading' ? 'Sending...' : 'Resend Verification Email'}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};