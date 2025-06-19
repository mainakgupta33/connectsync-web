import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, X, CheckCircle, AlertCircle } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { Employee } from '../../types';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onFileProcessed: (employees: Employee[]) => void;
  onValidationResult: (result: { valid: Employee[]; invalid: Employee[] }) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileProcessed, onValidationResult }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedFile(file);
    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      // Upload file to Azure Blob Storage
      const uploadResult = await apiService.uploadExcelFile(file);
      
      setUploadStatus('processing');
      
      // Process the uploaded Excel file
      const employees = await apiService.processExcelFile(uploadResult.fileId);
      
      // Validate employee data
      const validationResult = await apiService.validateEmployeeData(employees);
      
      setUploadStatus('completed');
      onFileProcessed(employees);
      onValidationResult(validationResult);
      
      toast.success(`Successfully processed ${employees.length} employee records`);
    } catch (error) {
      setUploadStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'Failed to process file';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  }, [onFileProcessed, onValidationResult]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
    disabled: uploadStatus === 'uploading' || uploadStatus === 'processing',
  });

  const removeFile = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setErrorMessage('');
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
      case 'processing':
        return <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileSpreadsheet className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Processing employee data...';
      case 'completed':
        return 'File processed successfully';
      case 'error':
        return errorMessage;
      default:
        return 'Ready to upload';
    }
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-400 bg-blue-50'
            : uploadStatus === 'error'
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${
          uploadStatus === 'uploading' || uploadStatus === 'processing'
            ? 'cursor-not-allowed opacity-60'
            : ''
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="h-8 w-8 text-gray-400" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isDragActive ? 'Drop your Excel file here' : 'Upload Employee Data'}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop your Excel file here, or click to browse
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: .xlsx, .xls (Max size: 10MB)
            </p>
          </div>
          
          {!isDragActive && (
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              disabled={uploadStatus === 'uploading' || uploadStatus === 'processing'}
            >
              Choose File
            </button>
          )}
        </div>
      </div>

      {uploadedFile && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {getStatusText()}
                </p>
              </div>
            </div>
            
            {uploadStatus === 'idle' || uploadStatus === 'error' ? (
              <button
                onClick={removeFile}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          
          {uploadStatus === 'uploading' || uploadStatus === 'processing' ? (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          ) : null}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Excel File Requirements:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Required columns: Name, Email, Department, Role, Manager, Start Date</li>
          <li>• Email addresses must be valid and unique</li>
          <li>• Start Date should be in MM/DD/YYYY format</li>
          <li>• Department names must match your configured departments</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;