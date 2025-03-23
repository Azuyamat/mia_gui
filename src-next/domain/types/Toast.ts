import { ToastType } from "@/domain/enums/ToastType.ts";

export type Toast = BasicToast;

export type BasicToast = {
    id: string;
    message: string;
    type: ToastType;
    duration: number;
};

export type ActiveToast = {
    startTimestamp: number;
} & Toast;
