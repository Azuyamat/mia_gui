import { IDE } from "@/domain/types/IDE";

export type Config = {
    naming: string;
    outputDir: string | undefined;
    blacklistedFileNames: string[];
    blacklistedFolderNames: string[];
    blacklistedFileExtensions: string[];

    defaultDir: undefined;
    color: string | undefined;

    ides: IDE[];
};
