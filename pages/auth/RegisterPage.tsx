import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone 
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks';
import { validateEmail, validatePhone, validatePassword } from '../../utils/helpers';
import { VALIDATION_RULES } from '../../utils/constants';
import type { AuthScreen, AuthFormData } from '../../types';

interface RegisterPageProps {
  onScreenChange: (screen: AuthScreen) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onScreenChange }) => {
  const { register, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedHipaa, setAcceptedHipaa] = useState(false);

  const { values, errors, getFieldProps, validateForm, setValue } = useForm(
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      userType: '',
      organizationCode: '',
      password: '',
    } as Partial<AuthFormData>,
    {
      firstName: (value) => {
        if (!value?.trim()) return 'First name is required';
        return null;
      },
      lastName: (value) => {
        if (!value?.trim()) return 'Last name is required';
        return null;
      },
      email: (value) => {
        if (!value) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return null;
      },
      phone: (value) => {
        if (!value) return 'Phone number is required';
        if (!validatePhone(value)) return 'Please enter a valid phone number';
        return null;
      },
      userType: (value) => {
        if (!value) return 'Please select your account type';
        return null;
      },
      organizationCode: (value) => {
        if (!value) return 'Organization code is required';
        if (!VALIDATION_RULES.organizationCode.pattern.test(value)) {
          return VALIDATION_RULES.organizationCode.message;
        }
        return null;
      },
      password: (value) => {
        if (!value) return 'Password is required';
        const validation = validatePassword(value);
        return validation.isValid ? null : validation.errors[0];
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!acceptedTerms) {
      alert('Please accept the Terms of Service and Privacy Policy');
      return;
    }
    
    if (!acceptedHipaa) {
      alert('Please acknowledge the HIPAA Notice of Privacy Practices');
      return;
    }

    try {
      await register(values as AuthFormData);
      onScreenChange('verify-email');
    } catch (error) {
      // Error is handled by auth context
    }
  };

  return (
    <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">Join the secure medical platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <Input
                placeholder="John"
                className="h-12 border-gray-200 focus:border-blue-500"
                {...getFieldProps('firstName')}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <Input
                placeholder="Doe"
                className="h-12 border-gray-200 focus:border-blue-500"
                {...getFieldProps('lastName')}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="doctor@hospital.com"
                className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                {...getFieldProps('email')}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                {...getFieldProps('phone')}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <Select 
              value={values.userType} 
              onValueChange={(value) => setValue('userType', value)}
            >
              <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="provider">Healthcare Provider</SelectItem>
                <SelectItem value="staff">Medical Staff</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="patient">Patient</SelectItem>
              </SelectContent>
            </Select>
            {errors.userType && (
              <p className="mt-1 text-sm text-red-600">{errors.userType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Code
            </label>
            <Input
              placeholder="Enter your organization code"
              className="h-12 border-gray-200 focus:border-blue-500"
              {...getFieldProps('organizationCode')}
            />
            <p className="text-xs text-gray-500 mt-1">
              Contact your IT administrator for the organization code
            </p>
            {errors.organizationCode && (
              <p className="mt-1 text-sm text-red-600">{errors.organizationCode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500"
                {...getFieldProps('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="terms" 
                className="mt-1" 
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <button type="button" className="text-blue-600 hover:text-blue-500 font-medium">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-blue-600 hover:text-blue-500 font-medium">
                  Privacy Policy
                </button>
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="hipaa" 
                className="mt-1" 
                checked={acceptedHipaa}
                onCheckedChange={(checked) => setAcceptedHipaa(checked as boolean)}
              />
              <label htmlFor="hipaa" className="text-sm text-gray-600">
                I acknowledge the{' '}
                <button type="button" className="text-blue-600 hover:text-blue-500 font-medium">
                  HIPAA Notice of Privacy Practices
                </button>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading === 'loading'}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium shadow-lg"
          >
            {loading === 'loading' ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <button
              type="button"
              onClick={() => onScreenChange('login')}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};