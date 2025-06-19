import React, { useState } from 'react';
import { Employee } from '../types';
import FileUpload from '../components/Upload/FileUpload';
import EmployeePreview from '../components/Upload/EmployeePreview';
import { apiService } from '../services/apiService';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const Upload: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [validationResult, setValidationResult] = useState<{ valid: Employee[]; invalid: Employee[] } | null>(null);
  const [processing, setProcessing] = useState(false);
  const { addOnboardingBatch } = useStore();

  const handleFileProcessed = (processedEmployees: Employee[]) => {
    setEmployees(processedEmployees);
  };

  const handleValidationResult = (result: { valid: Employee[]; invalid: Employee[] }) => {
    setValidationResult(result);
  };

  const handleProcessEmployees = async () => {
    if (!validationResult?.valid.length) return;

    setProcessing(true);
    try {
      const batch = await apiService.batchCreateEmployees(validationResult.valid);
      addOnboardingBatch(batch);
      toast.success(`Started processing ${validationResult.valid.length} employees`);
      
      // Reset state
      setEmployees([]);
      setValidationResult(null);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to process employees';
      toast.error(errorMsg);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Employee Data</h1>
        <p className="text-gray-600">Upload and process employee data for automated onboarding</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Process</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  employees.length > 0 ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium">Upload Excel File</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  validationResult ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium">Validate Data</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  processing ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  3
                </div>
                <span className="text-sm font-medium">Process Employees</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <FileUpload
            onFileProcessed={handleFileProcessed}
            onValidationResult={handleValidationResult}
          />
        </div>
      </div>

      {validationResult && (
        <EmployeePreview
          validEmployees={validationResult.valid}
          invalidEmployees={validationResult.invalid}
          onProcessEmployees={handleProcessEmployees}
          loading={processing}
        />
      )}
    </div>
  );
};

export default Upload;