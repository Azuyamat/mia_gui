import React from "react";
import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "@/hooks/useFormContext.ts";
import { SettingDefinition } from "@/domain/types/Config";
import Errors from "@/components/form/Errors.tsx";
import styles from "@/styles/components/form/Form.module.css";

export default function ArrayField({
    definition,
    ...props
}: {
    definition: SettingDefinition;
    props: React.InputHTMLAttributes<HTMLInputElement>;
}): React.ReactElement {
    const field = useFieldContext<string[]>();
    const errors = useStore(field.store, (state) => state.meta.errors);

    return (
        <div className={styles.field}>
            <label>
                <h4>{definition.label}</h4>
                <input
                    {...props}
                    placeholder={`Enter ${definition.label}`}
                    value={field.state.value.join(",")}
                    onChange={(e) =>
                        field.handleChange(e.target.value.split(",") || [])
                    }
                    type={"text"}
                />
                <p className={styles.description}>{definition.description}</p>
                <Errors errors={errors} />
            </label>
        </div>
    );
}
