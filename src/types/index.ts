export interface Employee {
  id?: string;
  name: string;
  email: string;
  department: string;
  role: string;
  manager: string;
  startDate: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt?: string;
  updatedAt?: string;
}

export interface Department {
  id: string;
  name: string;
  groups: string[];
  licenseType: string;
  emailTemplate: string;
  manager: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  department: string;
  isDefault: boolean;
}

export interface OnboardingBatch {
  id: string;
  fileName: string;
  totalEmployees: number;
  processedEmployees: number;
  failedEmployees: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  employees: Employee[];
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userName: string;
  details: string;
  timestamp: string;
  status: 'success' | 'error' | 'warning';
}

export interface DashboardStats {
  totalEmployees: number;
  activeOnboarding: number;
  completedToday: number;
  failedProcesses: number;
  averageProcessingTime: number;
  recentActivity: AuditLog[];
}