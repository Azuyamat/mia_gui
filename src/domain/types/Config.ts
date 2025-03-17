import { IDE } from "@/domain/types/IDE";

export type Config = {
    naming: string;
    outputDir: string | undefined;
    blacklistedFileNames: string[];
    blacklistedFolderNames: string[];
    blacklistedFileExtensions: string[];
    favoriteDirs: string[];

    defaultDir: string;
    color: string | undefined;

    ides: IDE[];
};
