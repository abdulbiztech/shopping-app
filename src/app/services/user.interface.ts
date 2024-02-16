// user.interface.ts
export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    confirmPassword:string;
    acceptTerms:boolean;
  }
