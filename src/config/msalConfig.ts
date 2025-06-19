import { Configuration, PopupRequest } from '@azure/msal-browser';

// For Azure Static Web Apps, environment variables are available without VITE_ prefix
// during build time, but we need to handle both local development and production
const getClientId = () => {
  // Try VITE_ prefixed version first (for local development)
  console.log("Hey");
  console.log('client Id : ',import.meta.env.VITE_AZURE_CLIENT_ID);
  console.log('client Id : ',import.meta.env.AZURE_CLIENT_ID);

  if (import.meta.env.VITE_AZURE_CLIENT_ID) {
    console.log('client Id : ',import.meta.env.VITE_AZURE_CLIENT_ID);
    return import.meta.env.VITE_AZURE_CLIENT_ID;
  }
  
  // For Azure Static Web Apps, try without prefix
  if (import.meta.env.AZURE_CLIENT_ID) {
    return import.meta.env.AZURE_CLIENT_ID;
  }
  
  // Fallback - this should not happen in production
  console.error('Azure Client ID not found in environment variables');
  return '';
};

const getTenantId = () => {
  // Try VITE_ prefixed version first (for local development)
  if (import.meta.env.VITE_AZURE_TENANT_ID) {
    return import.meta.env.VITE_AZURE_TENANT_ID;
  }
  
  // For Azure Static Web Apps, try without prefix
  if (import.meta.env.AZURE_TENANT_ID) {
    return import.meta.env.AZURE_TENANT_ID;
  }
  
  // Default to common for multi-tenant
  return 'common';
};

export const msalConfig: Configuration = {
  auth: {
    clientId: getClientId(),
    authority: `https://login.microsoftonline.com/${getTenantId()}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest: PopupRequest = {
  scopes: [
    'User.ReadWrite.All',
    'Group.ReadWrite.All',
    'Mail.Send',
    'Sites.ReadWrite.All',
    'Directory.ReadWrite.All'
  ],
};

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphUsersEndpoint: 'https://graph.microsoft.com/v1.0/users',
};