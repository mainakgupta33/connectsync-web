import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Users, Shield, Zap, Globe } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Branding and features */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">ConnectSync Pro</h1>
                  <p className="text-gray-600">Employee Onboarding Automation</p>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Streamline Your Employee Onboarding
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Automate Microsoft 365 user creation, group assignments, and welcome processes with enterprise-grade security.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Automated Processing</h3>
                  <p className="text-sm text-gray-600">Bulk upload and process employees via Excel files</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Microsoft 365 Integration</h3>
                  <p className="text-sm text-gray-600">Native integration with Azure AD and Graph API</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Enterprise Security</h3>
                  <p className="text-sm text-gray-600">Role-based access control and audit logging</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Department Management</h3>
                  <p className="text-sm text-gray-600">Configure groups and templates per department</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
              <p className="text-gray-600">Sign in with your Microsoft 365 account to continue</p>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.4 2H2v9.4h9.4V2zM22 2h-9.4v9.4H22V2zM11.4 12.6H2V22h9.4v-9.4zM22 12.6h-9.4V22H22v-9.4z"/>
              </svg>
              <span>Sign in with Microsoft 365</span>
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Requires administrator permissions for your Microsoft 365 tenant
              </p>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Required Permissions:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• User.ReadWrite.All - Create and manage user accounts</li>
                <li>• Group.ReadWrite.All - Assign users to groups</li>
                <li>• Mail.Send - Send welcome emails</li>
                <li>• Sites.ReadWrite.All - SharePoint access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;