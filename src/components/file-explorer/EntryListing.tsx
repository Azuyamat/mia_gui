import { Entry, EntryType } from "@/domain/types/Directory.ts";
import React from "react";
import styles from "@/styles/components/file-explorer/Entries.module.css";
import { useContextMenu } from "@/contexts/ContextMenuContext.tsx";
import { FaBan, FaEyeSlash, FaFile, FaFolder } from "react-icons/fa";
import EntryActionButton from "@/components/file-explorer/EntryActionButton.tsx";
import useCurrentPath from "@/hooks/useCurrentPath.ts";

type EntryListingProps = {
    entry: Entry;
    buttons?: ReturnType<typeof EntryActionButton>[];
};

export default function EntryListing({
    entry,
    buttons,
}: EntryListingProps): React.ReactElement {
    const { setPath } = useCurrentPath();
    const { show } = useContextMenu();

    return (
        <li
            key={entry.path}
            className={styles.entry}
            onClick={() => {
                if (entry.entryType === EntryType.DIRECTORY && entry.path) {
                    setPath(entry.path);
                }
                show(<p>{entry.name}</p>);
            }}
        >
            <div>
                {entry.miaMeta.isBlacklisted && (
                    <span>
                        <FaBan color={"#EE3333"} />
                    </span>
                )}
                {entry.meta.isHidden && (
                    <span>
                        <FaEyeSlash color={"#888"} />
                    </span>
                )}
                <span>
                    {entry.entryType === EntryType.DIRECTORY ? (
                        <FaFolder />
                    ) : (
                        <FaFile />
                    )}
                </span>
                <span>{entry.name}</span>
            </div>
            {buttons && <div className={styles.buttons}>{buttons}</div>}
        </li>
    );
}
