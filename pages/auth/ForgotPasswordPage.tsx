import React from 'react';
import { 
  Mail, 
  Lock 
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks';
import { validateEmail } from '../../utils/helpers';
import type { AuthScreen } from '../../types';

interface ForgotPasswordPageProps {
  onScreenChange: (screen: AuthScreen) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onScreenChange }) => {
  const { forgotPassword, loading, error } = useAuth();

  const { values, errors, getFieldProps, validateForm } = useForm(
    {
      email: '',
    },
    {
      email: (value) => {
        if (!value) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return null;
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await forgotPassword(values.email);
      // Show success message or redirect
    } catch (error) {
      // Error is handled by auth context
    }
  };

  return (
    <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
            <Lock className="h-6 w-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
          <p className="text-gray-600">Enter your email to receive reset instructions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email address"
                className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                {...getFieldProps('email')}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading === 'loading'}
            className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium shadow-lg"
          >
            {loading === 'loading' ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              "Send Reset Instructions"
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onScreenChange('login')}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};