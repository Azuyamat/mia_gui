import { ToastType } from "@/domain/enums/ToastType.ts";
import React from "react";

export type Toast = BasicToast;

export type BasicToast = {
    id: string;
    message: React.ReactNode;
    type: ToastType;
    duration: number;
};

export type ActiveToast = {
    startTimestamp: number;
} & Toast;
