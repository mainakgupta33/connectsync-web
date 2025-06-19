import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Upload, 
  Settings, 
  FileText, 
  Activity,
  Building2,
  Mail
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/upload', icon: Upload, label: 'Upload Employees' },
    { to: '/employees', icon: Users, label: 'Employee Management' },
    { to: '/departments', icon: Building2, label: 'Departments' },
    { to: '/templates', icon: Mail, label: 'Email Templates' },
    { to: '/audit', icon: Activity, label: 'Audit Logs' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="bg-white h-full shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ConnectSync Pro</h1>
            <p className="text-sm text-gray-500">Employee Onboarding</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-2 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;