import React from 'react';

const Departments: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Department Configuration</h1>
        <p className="text-gray-600">Configure department mappings, groups, and onboarding templates</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Coming Soon</h3>
        <p className="text-gray-600 mb-6">Department configuration interface will be available in the next release.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900">Group Mappings</h4>
            <p className="text-sm text-gray-600 mt-2">Map departments to M365 groups</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900">License Assignment</h4>
            <p className="text-sm text-gray-600 mt-2">Configure licenses per department</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900">Templates</h4>
            <p className="text-sm text-gray-600 mt-2">Department-specific templates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;