import React from 'react';
import { AuditLog } from '../../types';
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

interface RecentActivityProps {
  activities: AuditLog[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getStatusIcon = (status: AuditLog['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <p className="text-sm text-gray-500">Latest onboarding activities and system events</p>
      </div>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No recent activity</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(activity.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.details}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-gray-400">by {activity.userName}</p>
                  <span className="text-xs text-gray-300">•</span>
                  <p className="text-xs text-gray-400">{formatTime(activity.timestamp)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;