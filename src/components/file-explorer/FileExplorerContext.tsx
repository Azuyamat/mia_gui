"use client";

import React from "react";
import useCurrentPath from "@/hooks/useCurrentPath.ts";
import styles from "@/styles/components/file-explorer/ContextButtons.module.css";
import { FaArrowLeft, FaClock, FaFile, FaFolder, FaHome } from "react-icons/fa";
import { EntryType } from "@/domain/types/Directory.ts";
import useDirectory from "@/hooks/useDirectory.ts";
import { DurationFormatter } from "@/utils/format-utils.ts";

export default function FileExplorerContext(
    props: ReturnType<typeof useDirectory>
): React.ReactElement {
    const { directory, getByType, searchDuration } = props;
    const { goToParent, goToDefaultDir } = useCurrentPath();

    return (
        <div className={styles.content}>
            <div>
                <button
                    onClick={goToDefaultDir}
                    title={"Go to default directory"}
                >
                    <FaHome />
                </button>
                <button onClick={goToParent} title={"Go to parent directory"}>
                    <FaArrowLeft />
                </button>
            </div>
            {directory && (
                <div>
                    <p>
                        {getByType(EntryType.FILE).length}{" "}
                        <span>
                            <FaFile />
                        </span>
                    </p>
                    <p>
                        {getByType(EntryType.DIRECTORY).length}{" "}
                        <span>
                            <FaFolder />
                        </span>
                    </p>
                    {searchDuration && (
                        <p>
                            {DurationFormatter.format(searchDuration)}
                            <span>
                                <FaClock />
                            </span>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
