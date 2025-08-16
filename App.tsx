import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthContainer } from './components/AuthContainer';
import { AppContainer } from './components/AppContainer';

// Main App Content Component
const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading === 'loading') {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <AppContainer /> : <AuthContainer />;
};

// Loading Screen Component
const LoadingScreen: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading MedFlow EMR</h2>
      <p className="text-gray-600">Initializing secure healthcare platform...</p>
    </div>
  </div>
);

// Main App Component
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}