import { create } from 'zustand';
import { Employee, Department, EmailTemplate, OnboardingBatch, AuditLog, DashboardStats } from '../types';

interface AppState {
  // Authentication
  isAuthenticated: boolean;
  user: any;
  setUser: (user: any) => void;
  setAuthenticated: (authenticated: boolean) => void;

  // Dashboard
  dashboardStats: DashboardStats | null;
  setDashboardStats: (stats: DashboardStats) => void;

  // Employees
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;

  // Departments
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
  addDepartment: (department: Department) => void;
  updateDepartment: (id: string, department: Partial<Department>) => void;

  // Email Templates
  emailTemplates: EmailTemplate[];
  setEmailTemplates: (templates: EmailTemplate[]) => void;
  addEmailTemplate: (template: EmailTemplate) => void;
  updateEmailTemplate: (id: string, template: Partial<EmailTemplate>) => void;

  // Onboarding Batches
  onboardingBatches: OnboardingBatch[];
  setOnboardingBatches: (batches: OnboardingBatch[]) => void;
  addOnboardingBatch: (batch: OnboardingBatch) => void;
  updateOnboardingBatch: (id: string, batch: Partial<OnboardingBatch>) => void;

  // Audit Logs
  auditLogs: AuditLog[];
  setAuditLogs: (logs: AuditLog[]) => void;
  addAuditLog: (log: AuditLog) => void;

  // UI State
  loading: boolean;
  setLoading: (loading: boolean) => void;
  selectedBatch: OnboardingBatch | null;
  setSelectedBatch: (batch: OnboardingBatch | null) => void;
}

export const useStore = create<AppState>((set) => ({
  // Authentication
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ user }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),

  // Dashboard
  dashboardStats: null,
  setDashboardStats: (stats) => set({ dashboardStats: stats }),

  // Employees
  employees: [],
  setEmployees: (employees) => set({ employees }),
  addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),
  updateEmployee: (id, employee) => set((state) => ({
    employees: state.employees.map(emp => emp.id === id ? { ...emp, ...employee } : emp)
  })),

  // Departments
  departments: [],
  setDepartments: (departments) => set({ departments }),
  addDepartment: (department) => set((state) => ({ departments: [...state.departments, department] })),
  updateDepartment: (id, department) => set((state) => ({
    departments: state.departments.map(dept => dept.id === id ? { ...dept, ...department } : dept)
  })),

  // Email Templates
  emailTemplates: [],
  setEmailTemplates: (templates) => set({ emailTemplates: templates }),
  addEmailTemplate: (template) => set((state) => ({ emailTemplates: [...state.emailTemplates, template] })),
  updateEmailTemplate: (id, template) => set((state) => ({
    emailTemplates: state.emailTemplates.map(tmpl => tmpl.id === id ? { ...tmpl, ...template } : tmpl)
  })),

  // Onboarding Batches
  onboardingBatches: [],
  setOnboardingBatches: (batches) => set({ onboardingBatches: batches }),
  addOnboardingBatch: (batch) => set((state) => ({ onboardingBatches: [...state.onboardingBatches, batch] })),
  updateOnboardingBatch: (id, batch) => set((state) => ({
    onboardingBatches: state.onboardingBatches.map(b => b.id === id ? { ...b, ...batch } : b)
  })),

  // Audit Logs
  auditLogs: [],
  setAuditLogs: (logs) => set({ auditLogs: logs }),
  addAuditLog: (log) => set((state) => ({ auditLogs: [...state.auditLogs, log] })),

  // UI State
  loading: false,
  setLoading: (loading) => set({ loading }),
  selectedBatch: null,
  setSelectedBatch: (batch) => set({ selectedBatch: batch }),
}));