import { type ClassValue, clsx } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { EntityError } from "./http";
import { toast } from "@/components/ui/use-toast";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
    return path.startsWith("/") ? path.slice(1) : path;
};

export const handleErrorApi = ({
    error,
    setError,
    duration,
}: {
    error: any;
    setError?: UseFormSetError<any>;
    duration?: number;
}) => {
    if (error instanceof EntityError && setError) {
        error.payload.errors.forEach((item) => {
            setError(item.field, {
                type: "server",
                message: item.message,
            });
        });
    } else {
        toast({
            title: "Lỗi",
            description: error?.payload?.message ?? "Lỗi không xác định",
            variant: "destructive",
            duration: duration ?? 5000,
        });
    }
};

const isBrowser = typeof window !== "undefined";

//Lấy ra accessToken trên LocalStorage
export const getAccessTokenFromLocalStorage = () =>
    isBrowser ? localStorage.getItem("accessToken") : null;

//Lấy ra refreshToken trên LocalStorage
export const getRefreshTokenFromLocalStorage = () =>
    isBrowser ? localStorage.getItem("refreshToken") : null;

//Set accessToken trên LocalStorage
export const setAccessTokenToLocalStorage = (value: string) =>
    isBrowser && localStorage.setItem('accessToken', value)
//Set refreshToken trên LocalStorage
export const setRefreshTokenToLocalStorage = (value: string) =>
    isBrowser && localStorage.setItem('refreshToken', value)