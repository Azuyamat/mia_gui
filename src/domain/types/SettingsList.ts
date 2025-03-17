export type SettingsList = Setting<any>[];
export type Setting<T> = {
    name: string;
    details?: string | string[];
    placeholder?: string;
    value: T;
    id: string;
};
