import React, { useEffect } from 'react';
import { Users, UserCheck, AlertTriangle, Clock } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import ActivityChart from '../components/Dashboard/ActivityChart';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { useStore } from '../store/useStore';
import { apiService } from '../services/apiService';

const Dashboard: React.FC = () => {
  const { dashboardStats, setDashboardStats, setLoading } = useStore();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const stats = await apiService.getDashboardStats();
        setDashboardStats(stats);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [setDashboardStats, setLoading]);

  // Mock data for demonstration
  const chartData = [
    { name: 'Mon', onboarded: 12, failed: 1 },
    { name: 'Tue', onboarded: 19, failed: 2 },
    { name: 'Wed', onboarded: 15, failed: 0 },
    { name: 'Thu', onboarded: 22, failed: 3 },
    { name: 'Fri', onboarded: 18, failed: 1 },
    { name: 'Sat', onboarded: 8, failed: 0 },
    { name: 'Sun', onboarded: 5, failed: 0 },
  ];

  const mockRecentActivity = [
    {
      id: '1',
      action: 'Batch Employee Onboarding',
      userId: 'admin',
      userName: 'Admin User',
      details: 'Successfully onboarded 15 employees from HR_Batch_2024_01.xlsx',
      timestamp: new Date().toISOString(),
      status: 'success' as const,
    },
    {
      id: '2',
      action: 'Department Configuration',
      userId: 'admin',
      userName: 'Admin User',
      details: 'Updated Engineering department group mappings',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'success' as const,
    },
    {
      id: '3',
      action: 'Email Template Update',
      userId: 'admin',
      userName: 'Admin User',
      details: 'Modified welcome email template for Sales department',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      status: 'warning' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your employee onboarding process and system performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Employees"
          value={dashboardStats?.totalEmployees || 0}
          icon={Users}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Onboarding"
          value={dashboardStats?.activeOnboarding || 0}
          icon={Clock}
          color="yellow"
        />
        <StatsCard
          title="Completed Today"
          value={dashboardStats?.completedToday || 0}
          icon={UserCheck}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Failed Processes"
          value={dashboardStats?.failedProcesses || 0}
          icon={AlertTriangle}
          color="red"
          trend={{ value: -20, isPositive: true }}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart data={chartData} />
        <RecentActivity activities={dashboardStats?.recentActivity || mockRecentActivity} />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Upload Employees</h4>
                <p className="text-sm text-gray-500">Bulk upload via Excel file</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Manage Departments</h4>
                <p className="text-sm text-gray-500">Configure group mappings</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">View Audit Logs</h4>
                <p className="text-sm text-gray-500">Review system activity</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;