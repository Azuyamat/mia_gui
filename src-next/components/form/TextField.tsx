"use client";

import React from "react";
import { useFieldContext } from "@/hooks/useFormContext.ts";
import { useStore } from "@tanstack/react-form";
import styles from "@/styles/components/form/Form.module.css";
import { SettingDefinition } from "@/domain/types/Config.ts";
import Errors from "@/components/form/Errors.tsx";

export default function TextField(
    props: {
        definition: SettingDefinition;
    } & React.InputHTMLAttributes<HTMLInputElement>
): React.ReactElement {
    const { definition, ...rest } = props;
    const field = useFieldContext<string>();
    const errors = useStore(field.store, (state) => state.meta.errors);

    return (
        <div className={styles.field}>
            <label>
                <h4>{definition.label}</h4>
                <input
                    {...rest}
                    placeholder={`Enter ${definition.label}`}
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type={"text"}
                />
                <p className={styles.description}>{definition.description}</p>
                <Errors errors={errors} />
            </label>
        </div>
    );
}
