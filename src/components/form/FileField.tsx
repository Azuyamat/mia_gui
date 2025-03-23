import { SettingDefinition } from "@/domain/types/Config.ts";
import React from "react";
import { useFieldContext } from "@/hooks/useFormContext.ts";
import { useStore } from "@tanstack/react-form";
import styles from "@/styles/components/form/Form.module.css";
import Errors from "@/components/form/Errors.tsx";

export default function FileField({
    definition,
}: {
    definition: SettingDefinition;
}): React.ReactElement {
    const field = useFieldContext<string>();
    const errors = useStore(field.store, (state) => state.meta.errors);

    return (
        <div className={styles.field}>
            <label>
                <h4>{definition.label}</h4>
                <input
                    placeholder={`Enter ${definition.label}`}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type={"file"}
                />
                <p className={styles.description}>{definition.description}</p>
                <Errors errors={errors} />
            </label>
        </div>
    );
}
