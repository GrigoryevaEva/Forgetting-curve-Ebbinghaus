export interface IUser {
    id: string;
    email: string;
    created_at: number;
}

// И для логина и для регистрации
export interface IAuthPayload {
    email: string;
    password: string;
}
