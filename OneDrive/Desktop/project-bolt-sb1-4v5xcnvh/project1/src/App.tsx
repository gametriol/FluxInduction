import React from 'react';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/common/Header';
import { LoginForm } from './components/auth/LoginForm';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {user.role === 'patient' ? (
        <div className="p-8 text-center">
          <h2 className="text-lg font-semibold">Patient view moved</h2>
          <p className="text-sm text-gray-600">Patient dashboard was merged into the main `project` folder. Please open that app for patient features.</p>
        </div>
      ) : (
        <DoctorDashboard />
      )}
    </div>
  );
}

export default App;