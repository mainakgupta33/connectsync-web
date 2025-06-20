interface ClientPrincipal {
    identityProvider: string;
    userId: string;
    userDetails: string;
    userRoles: string[];
  }
  
  interface UserInfo {
    clientPrincipal: ClientPrincipal | null;
  }
  
  class AuthService {
    private userInfo: UserInfo | null = null;
  
    async getUserInfo(): Promise<UserInfo> {
      if (this.userInfo) {
        return this.userInfo;
      }
  
      try {
        const response = await fetch('/.auth/me');
        if (response.ok) {
          this.userInfo = await response.json();
          return this.userInfo;
        }
      } catch (error) {
        console.error('Failed to get user info:', error);
      }
  
      return { clientPrincipal: null };
    }
  
    async isAuthenticated(): Promise<boolean> {
      const userInfo = await this.getUserInfo();
      return userInfo.clientPrincipal !== null;
    }
  
    async getUser(): Promise<ClientPrincipal | null> {
      const userInfo = await this.getUserInfo();
      return userInfo.clientPrincipal;
    }
  
    getLoginUrl(): string {
      // Add post_login_redirect_uri to redirect back to the app after login
      const redirectUri = encodeURIComponent(window.location.origin);
      return `/.auth/login/aad?post_login_redirect_uri=${redirectUri}`;
    }
  
    getLogoutUrl(): string {
      // Add post_logout_redirect_uri to redirect back to the app after logout
      const redirectUri = encodeURIComponent(window.location.origin);
      return `/.auth/logout?post_logout_redirect_uri=${redirectUri}`;
    }
  
    login(): void {
      window.location.href = this.getLoginUrl();
    }
  
    logout(): void {
      window.location.href = this.getLogoutUrl();
    }
  
    clearCache(): void {
      this.userInfo = null;
    }
  }
  
  export const authService = new AuthService();