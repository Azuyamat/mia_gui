import { z } from "zod";
import React from "react";
import TextField from "@/components/form/TextField.tsx";

export type Config = {
    naming: string;
    outputDir: string | undefined;
    blacklistedFileNames: string[];
    blacklistedFolderNames: string[];
    blacklistedFileExtensions: string[];

    defaultDir: string | undefined;
    color: string | undefined;
};

export const configSchema = z.object({
    naming: z.string().nonempty(),
    outputDir: z.string().optional(),
    blacklistedFileNames: z.array(z.string()),
    blacklistedFolderNames: z.array(z.string()),
    blacklistedFileExtensions: z.array(z.string()),
    defaultDir: z.string().optional(),
    color: z.string().optional(),
});

export type ConfigSchema = z.infer<typeof configSchema>;

export enum SettingDefinitionType {
    TEXT,
    FILE,
}

export type SettingDefinition = {
    id: keyof Config;
    label: string;
    description: string;
    component: React.ComponentType<{ definition: SettingDefinition }>;
    zodSchema: z.ZodType<ConfigSchema[keyof Config]>;
};

export const settingDefinitions: SettingDefinition[] = [
    {
        id: "naming",
        label: "Naming Convention",
        description: "The naming convention for the generated zip file",
        component: TextField,
        zodSchema: configSchema.shape.naming,
    },
    {
        id: "defaultDir",
        label: "Default Directory",
        description: "The default directory to open when the app starts",
        component: TextField,
        zodSchema: configSchema.shape.defaultDir,
    },
    {
        id: "outputDir",
        label: "Output Directory",
        description: "The directory where the generated zip file will be saved",
        component: TextField,
        zodSchema: configSchema.shape.outputDir,
    },
    {
        id: "blacklistedFileNames",
        label: "Blacklisted File Names",
        description:
            "Files with these names will not be included in the generated zip file",
        component: TextField,
        zodSchema: configSchema.shape.blacklistedFileNames,
    },
    {
        id: "blacklistedFolderNames",
        label: "Blacklisted Folder Names",
        description:
            "Folders with these names will not be included in the generated zip file",
        component: TextField,
        zodSchema: configSchema.shape.blacklistedFolderNames,
    },
    {
        id: "blacklistedFileExtensions",
        label: "Blacklisted File Extensions",
        description:
            "Files with these extensions will not be included in the generated zip file",
        component: TextField,
        zodSchema: configSchema.shape.blacklistedFileExtensions,
    },
    {
        id: "color",
        label: "Color",
        description: "The color of the app",
        component: TextField,
        zodSchema: configSchema.shape.color,
    },
];
