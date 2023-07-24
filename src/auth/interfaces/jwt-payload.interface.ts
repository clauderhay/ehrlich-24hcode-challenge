import { Role } from "../enum/roles.enum";

export interface JwtPayload {
    sub: number; // User ID
    email: string;
    role: Role; // User roles (e.g., 'user', 'administrator')
    
    // Add other relevant fields as needed
  }