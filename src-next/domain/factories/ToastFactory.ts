import { ToastType } from "@/domain/enums/ToastType";
import { Toast } from "@/domain/types/Toast";
import React from "react";

const DEFAULT_LIFETIME = 1000;

export default class ToastFactory {
    static createToast(
        type: ToastType,
        message: React.ReactNode,
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
        content: React.ReactNode,
        lifetime: number = DEFAULT_LIFETIME
    ): Toast {
        return this.createToast(ToastType.INFO, content, lifetime);
    }

    static createSuccessToast(
        content: React.ReactNode,
        lifetime: number = DEFAULT_LIFETIME
    ): Toast {
        return this.createToast(ToastType.SUCCESS, content, lifetime);
    }

    static createErrorToast(
        content: React.ReactNode,
        lifetime: number = DEFAULT_LIFETIME
    ): Toast {
        return this.createToast(ToastType.ERROR, content, lifetime);
    }

    static createWarningToast(
        content: React.ReactNode,
        lifetime: number = DEFAULT_LIFETIME
    ): Toast {
        return this.createToast(ToastType.WARNING, content, lifetime);
    }
}
