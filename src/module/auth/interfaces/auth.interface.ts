export interface JwtPayload {
    sub: string;
    username: string;
  }
  
  export interface TokenResponse {
    access_token: string;
    user: UserResponse;
  }
  
  export interface UserResponse {
    id: string;
    username: string;
  }
  