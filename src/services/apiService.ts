import { Employee, Department, EmailTemplate, OnboardingBatch, AuditLog, DashboardStats } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem('accessToken');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    return this.request<DashboardStats>('/dashboard/stats');
  }

  // Employee Management
  async getEmployees(): Promise<Employee[]> {
    return this.request<Employee[]>('/employees');
  }

  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    return this.request<Employee>('/employees/create', {
      method: 'POST',
      body: JSON.stringify(employee),
    });
  }

  async batchCreateEmployees(employees: Omit<Employee, 'id'>[]): Promise<OnboardingBatch> {
    return this.request<OnboardingBatch>('/employees/batch', {
      method: 'POST',
      body: JSON.stringify({ employees }),
    });
  }

  async getOnboardingStatus(batchId: string): Promise<OnboardingBatch> {
    return this.request<OnboardingBatch>(`/employees/status/${batchId}`);
  }

  // File Processing
  async uploadExcelFile(file: File): Promise<{ fileId: string; url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${API_BASE_URL}/upload/excel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async processExcelFile(fileId: string): Promise<Employee[]> {
    return this.request<Employee[]>(`/files/process/${fileId}`, {
      method: 'POST',
    });
  }

  async validateEmployeeData(employees: Employee[]): Promise<{ valid: Employee[]; invalid: Employee[] }> {
    return this.request<{ valid: Employee[]; invalid: Employee[] }>('/files/validate', {
      method: 'POST',
      body: JSON.stringify({ employees }),
    });
  }

  // Department Management
  async getDepartments(): Promise<Department[]> {
    return this.request<Department[]>('/departments');
  }

  async updateDepartmentMapping(departmentId: string, mapping: Partial<Department>): Promise<Department> {
    return this.request<Department>(`/departments/mapping`, {
      method: 'POST',
      body: JSON.stringify({ departmentId, mapping }),
    });
  }

  async getAvailableGroups(): Promise<{ id: string; displayName: string }[]> {
    return this.request<{ id: string; displayName: string }[]>('/groups/available');
  }

  // Email Templates
  async getEmailTemplates(): Promise<EmailTemplate[]> {
    return this.request<EmailTemplate[]>('/templates');
  }

  async createEmailTemplate(template: Omit<EmailTemplate, 'id'>): Promise<EmailTemplate> {
    return this.request<EmailTemplate>('/templates', {
      method: 'POST',
      body: JSON.stringify(template),
    });
  }

  async updateEmailTemplate(templateId: string, template: Partial<EmailTemplate>): Promise<EmailTemplate> {
    return this.request<EmailTemplate>(`/templates/${templateId}`, {
      method: 'PUT',
      body: JSON.stringify(template),
    });
  }

  async sendWelcomeEmail(employeeId: string, templateId: string): Promise<void> {
    return this.request<void>('/templates/send', {
      method: 'POST',
      body: JSON.stringify({ employeeId, templateId }),
    });
  }

  // Audit Logs
  async getAuditLogs(): Promise<AuditLog[]> {
    return this.request<AuditLog[]>('/audit/logs');
  }

  async logActivity(action: string, details: string): Promise<void> {
    return this.request<void>('/audit/log', {
      method: 'POST',
      body: JSON.stringify({ action, details }),
    });
  }

  // Health Check
  async healthCheck(): Promise<{ status: string; services: Record<string, string> }> {
    return this.request<{ status: string; services: Record<string, string> }>('/monitoring/health');
  }
}

export const apiService = new ApiService();