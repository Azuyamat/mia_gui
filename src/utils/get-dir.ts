import { Directory } from "@/domain/types/Directory.ts";
import { invoke } from "@tauri-apps/api";

const GET_DIR_COMMAND = "get_dir";

type GetDirOptions = {
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
    private readonly path: string;
    private readonly options: GetDirOptions;

    constructor(path: string) {
        this.path = path;
        this.options = {
            show_hidden: false,
            show_blacklisted: false,
            fuzzy: false,
        };
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
