import { Entry, EntryType } from "@/domain/types/Directory.ts";
import React from "react";
import styles from "@/styles/components/file-explorer/Entries.module.css";
import EntryListing from "@/components/file-explorer/EntryListing.tsx";
import { EntrySort } from "@/domain/enums/EntrySort.ts";
import EntryActionButton from "@/components/file-explorer/EntryActionButton.tsx";
import { FaFileZipper } from "react-icons/fa6";
import useZipDir from "@/hooks/useZipDir.ts";

type SimpleEntriesProps = {
    entries: Entry[];
    sortedBy?: EntrySort;
    query?: string;
    maxEntries?: number;
};

export function SimpleEntries(props: SimpleEntriesProps): React.ReactElement {
    return <Entries {...props} />;
}

type EntriesWithButtonsProps = {} & EntriesProps;

export function EntriesWithButtons({
    buttons,
    ...props
}: EntriesWithButtonsProps): React.ReactElement {
    const zipDir = useZipDir();

    const defaultButtons = (entry: Entry) => {
        const list = [];
        if (entry.entryType == EntryType.DIRECTORY) {
            list.push(
                <EntryActionButton
                    key="zip"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (entry.path) {
                            zipDir(entry.path)
                        }
                    }}
                    title={"Zip folder"}
                >
                    <FaFileZipper />
                </EntryActionButton>
            );
        }
        return list;
    };
    const entriesButton = buttons
        ? (entry: Entry) => {
              return [...buttons(entry), ...defaultButtons(entry)];
          }
        : defaultButtons;

    return <Entries {...props} buttons={entriesButton} />;
}

type EntriesProps = {
    buttons?: (entry: Entry) => ReturnType<typeof EntryActionButton>[];
} & SimpleEntriesProps;

function Entries({
    entries,
    maxEntries,
    buttons,
}: EntriesProps): React.ReactElement {
    const displayedEntries = maxEntries
        ? entries.slice(0, maxEntries)
        : entries;

    return (
        <ul className={styles.entries}>
            {displayedEntries.map((entry) => (
                <EntryListing
                    key={entry.path}
                    entry={entry}
                    buttons={buttons ? buttons(entry) : undefined}
                />
            ))}
        </ul>
    );
}
