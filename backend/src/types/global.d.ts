// src/types/global.d.ts

declare module '@/services/auth.service' {
    export const loginUser: (credentials: { email: string; password: string }) => Promise<{
        token: string;
        user: {
            id: number;
            email: string;
        };
    }>;
}

declare module '@/stores/auth' {
    import { Ref } from 'vue';

    export const useAuthStore: () => {
        user: Ref<{
            id: number;
            email: string;
            firstName?: string;
            lastName?: string;
            role?: string;
        } | null>;
        token: Ref<string>;
        login: (credentials: { email: string; password: string }) => Promise<void>;
        register: (userData: any) => Promise<void>;
        logout: () => void;
    };
}

declare module '@/middlewares/validation.middleware' {
    import { RequestHandler } from 'express';
    export const validateRequest: (schema: any) => RequestHandler;
}
