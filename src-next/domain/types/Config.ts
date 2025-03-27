import { z } from "zod";

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
    color: z.string().optional().or(z.string().includes("#").length(7)),
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
    definitionType: SettingDefinitionType;
    zodSchema: z.ZodType<ConfigSchema[keyof Config]>;
};

export const settingDefinitions: SettingDefinition[] = [
    {
        id: "naming",
        label: "Naming Convention",
        description: "The naming convention for the generated zip file",
        definitionType: SettingDefinitionType.TEXT,
        zodSchema: configSchema.shape.naming,
    },
    {
        id: "defaultDir",
        label: "Default Directory",
        description: "The default directory to open when the app starts",
        definitionType: SettingDefinitionType.FILE,
        zodSchema: configSchema.shape.defaultDir,
    },
    {
        id: "outputDir",
        label: "Output Directory",
        description: "The directory where the generated zip file will be saved",
        definitionType: SettingDefinitionType.FILE,
        zodSchema: configSchema.shape.outputDir,
    },
    {
        id: "blacklistedFileNames",
        label: "Blacklisted File Names",
        description:
            "Files with these names will not be included in the generated zip file",
        definitionType: SettingDefinitionType.TEXT,
        zodSchema: configSchema.shape.blacklistedFileNames,
    },
    {
        id: "blacklistedFolderNames",
        label: "Blacklisted Folder Names",
        description:
            "Folders with these names will not be included in the generated zip file",
        definitionType: SettingDefinitionType.TEXT,
        zodSchema: configSchema.shape.blacklistedFolderNames,
    },
    {
        id: "blacklistedFileExtensions",
        label: "Blacklisted File Extensions",
        description:
            "Files with these extensions will not be included in the generated zip file",
        definitionType: SettingDefinitionType.TEXT,
        zodSchema: configSchema.shape.blacklistedFileExtensions,
    },
    {
        id: "color",
        label: "Color",
        description: "The accent color of the app",
        definitionType: SettingDefinitionType.TEXT,
        zodSchema: configSchema.shape.color,
    },
];
