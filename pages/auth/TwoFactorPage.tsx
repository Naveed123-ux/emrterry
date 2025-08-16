import React from 'react';
import { 
  Shield, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks';

export const TwoFactorPage: React.FC = () => {
  const { verifyTwoFactor, loading, error } = useAuth();

  const { values, errors, getFieldProps, validateForm } = useForm(
    {
      code: '',
    },
    {
      code: (value) => {
        if (!value) return 'Verification code is required';
        if (value.length !== 6) return 'Verification code must be 6 digits';
        return null;
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await verifyTwoFactor(values.code);
      // Success - user will be authenticated
    } catch (error) {
      // Error is handled by auth context
    }
  };

  return (
    <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Verification</h2>
          <p className="text-gray-600">We've sent a verification code to your registered device</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <Input
              type="text"
              placeholder="000000"
              maxLength={6}
              className="h-12 text-center text-2xl tracking-widest border-gray-200 focus:border-blue-500"
              {...getFieldProps('code')}
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Enter the 6-digit code from your authenticator app
            </p>
            {errors.code && (
              <p className="mt-1 text-sm text-red-600">{errors.code}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading === 'loading' || values.code.length !== 6}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg"
          >
            {loading === 'loading' ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              "Verify & Continue"
            )}
          </Button>

          <div className="text-center">
            <button type="button" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
              Resend Code
            </button>
          </div>
        </form>
      </div>

      <Alert className="mt-6 border-blue-200 bg-blue-50">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Two-factor authentication is required for HIPAA compliance and enhanced security.
        </AlertDescription>
      </Alert>
    </Card>
  );
};