import React from 'react';
import { Employee } from '../../types';
import { CheckCircle, AlertTriangle, Calendar, Mail, Building2, User } from 'lucide-react';

interface EmployeePreviewProps {
  validEmployees: Employee[];
  invalidEmployees: Employee[];
  onProcessEmployees: () => void;
  loading: boolean;
}

const EmployeePreview: React.FC<EmployeePreviewProps> = ({
  validEmployees,
  invalidEmployees,
  onProcessEmployees,
  loading
}) => {
  const totalEmployees = validEmployees.length + invalidEmployees.length;

  const EmployeeCard: React.FC<{ employee: Employee; isValid: boolean }> = ({ employee, isValid }) => (
    <div className={`border rounded-lg p-4 ${isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            {isValid ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
            <h4 className="font-semibold text-gray-900">{employee.name}</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{employee.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{employee.department}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{employee.role}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{employee.startDate}</span>
            </div>
          </div>
          
          {employee.manager && (
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Manager:</span> {employee.manager}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Employee Data Preview</h3>
            <p className="text-sm text-gray-500">
              Review the parsed employee data before processing
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{validEmployees.length}</div>
              <div className="text-xs text-gray-500">Valid</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{invalidEmployees.length}</div>
              <div className="text-xs text-gray-500">Invalid</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalEmployees}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>

        {validEmployees.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-green-700 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Valid Employees ({validEmployees.length})</span>
              </h4>
              
              {validEmployees.length > 0 && (
                <button
                  onClick={onProcessEmployees}
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  <span>{loading ? 'Processing...' : 'Process Valid Employees'}</span>
                </button>
              )}
            </div>
            
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {validEmployees.map((employee, index) => (
                <EmployeeCard key={index} employee={employee} isValid={true} />
              ))}
            </div>
          </div>
        )}

        {invalidEmployees.length > 0 && (
          <div>
            <h4 className="font-medium text-red-700 flex items-center space-x-2 mb-4">
              <AlertTriangle className="h-5 w-5" />
              <span>Invalid Employees ({invalidEmployees.length})</span>
            </h4>
            
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {invalidEmployees.map((employee, index) => (
                <EmployeeCard key={index} employee={employee} isValid={false} />
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Note:</strong> Invalid employees will not be processed. Please fix the issues in your Excel file and re-upload.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePreview;