import { ToastType } from "@/domain/enums/ToastType";

export type Toast = {
    type: ToastType;
    content: string;
    lifetime: number;
};
