import React, { ReactNode } from 'react';
import { 
  Stethoscope, 
  Pill, 
  FileText, 
  Calendar 
} from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Medical Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <Stethoscope className="h-32 w-32 text-blue-600 transform rotate-12" />
        </div>
        <div className="absolute top-40 right-20">
          <Pill className="h-24 w-24 text-green-600 transform -rotate-12" />
        </div>
        <div className="absolute bottom-40 left-20">
          <FileText className="h-28 w-28 text-purple-600 transform rotate-6" />
        </div>
        <div className="absolute bottom-20 right-40">
          <Calendar className="h-20 w-20 text-red-600 transform -rotate-6" />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          {/* Logo and Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{APP_CONFIG.name}</h1>
            <p className="text-gray-600">{APP_CONFIG.tagline}</p>
          </div>

          {children}

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>{APP_CONFIG.copyright}</p>
            <p className="mt-1">{APP_CONFIG.compliance.join(' | ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};