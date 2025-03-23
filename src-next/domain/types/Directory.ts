export type Directory = {
    entry: Entry;
    children: Entry[];
};

export type Entry = {
    name: string;
    extension: string | null;
    path: string | null;
    entryType: EntryType;
    meta: EntryMeta;
    miaMeta: MiaMeta;
};

export type EntryMeta = {
    size: number;
    created: Date;
    modified: Date;
    isHidden: boolean;
};

export type MiaMeta = {
    language: Language | undefined;
    isBlacklisted: boolean;
    isFavorite: boolean;
    tags: number[];
};

export type Language = {
    name: string;
    extensions: string[];
};

export enum EntryType {
    FILE = "File",
    DIRECTORY = "Directory",
}
