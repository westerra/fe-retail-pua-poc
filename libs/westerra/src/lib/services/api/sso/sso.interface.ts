export interface SsoInterface {
  name?: string;
  ssourl?: string;
}

export interface ErrorState {
  error?: {
      type?: string;
      message: string;
      link?: string;
      linkText?: string;
      description?: string;
  };
  isLoading?: boolean;
}