export type DirectoryInfo = {
    exists: boolean;
    path: string;
    paths: Path[];
};

type Path = {
    entry_type: string;
    name: string;
    path: string;
    blacklisted: boolean;
    language: {
        name: string;
    };
    extension: string;
};
