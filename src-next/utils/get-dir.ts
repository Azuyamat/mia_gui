import { Directory } from "@/domain/types/Directory.ts";
import { invoke } from "@tauri-apps/api/core";

const GET_DIR_COMMAND = "get_dir";

export type GetDirOptions = {
    show_hidden: boolean;
    show_blacklisted: boolean;
    fuzzy: boolean;
};

export async function getDir(
    path: string,
    options: GetDirOptions
): Promise<Directory> {
    return invoke(GET_DIR_COMMAND, { path, options });
}

export class GetDirBuilder {
    static readonly DEFAULT_OPTIONS: GetDirOptions = {
        show_hidden: true,
        show_blacklisted: true,
        fuzzy: false,
    };

    private readonly path: string;
    private readonly options: GetDirOptions;

    constructor(
        path: string,
        options: GetDirOptions = GetDirBuilder.DEFAULT_OPTIONS
    ) {
        this.path = path;
        this.options = options;
    }

    showHidden(value: boolean): GetDirBuilder {
        this.options.show_hidden = value;
        return this;
    }

    showBlacklisted(value: boolean): GetDirBuilder {
        this.options.show_blacklisted = value;
        return this;
    }

    fuzzy(value: boolean): GetDirBuilder {
        this.options.fuzzy = value;
        return this;
    }

    async build(): Promise<Directory> {
        return getDir(this.path, this.options);
    }
}
