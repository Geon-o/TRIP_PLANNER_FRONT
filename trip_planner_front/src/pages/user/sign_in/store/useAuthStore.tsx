import {create} from "zustand/react";
import {persist} from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
    clearAccessToken: () => void;
}

export const useAuthStore = create<AuthState>(
    persist(
        (set) => ({
            accessToken: null,
            setAccessToken: (accessToken) => set({ accessToken }),
            clearAccessToken: () => set({ accessToken: null }),
        }),
        {
            name: "auth-storage",
        }
    )
)