import { ToastType } from "@/domain/enums/ToastType";
import { Toast } from "@/domain/types/Toast";

const DEFAULT_LIFETIME = 1000;

export default class ToastFactory {
    static createToast(
        type: ToastType,
        message: string,
        duration: number = DEFAULT_LIFETIME
    ): Toast {
        return {
            id: Math.random().toString(36),
            type,
            message,
            duration,
        };
    }

    static createInfoToast(
        content: string,
        lifetime: number = DEFAULT_LIFETIME
    ): Toast {
        return this.createToast(ToastType.INFO, content, lifetime);
    }

    static createSuccessToast(
        content: string,
        lifetime: number = DEFAULT_LIFETIME
    ): Toast {
        return this.createToast(ToastType.SUCCESS, content, lifetime);
    }

    static createErrorToast(
        content: string,
        lifetime: number = DEFAULT_LIFETIME
    ): Toast {
        return this.createToast(ToastType.ERROR, content, lifetime);
    }

    static createWarningToast(
        content: string,
        lifetime: number = DEFAULT_LIFETIME
    ): Toast {
        return this.createToast(ToastType.WARNING, content, lifetime);
    }
}
