import React from "react";
import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "@/hooks/useFormContext.ts";
import { SettingDefinition } from "@/domain/types/Config";
import Errors from "@/components/form/Errors.tsx";
import styles from "@/styles/components/form/Form.module.css";

export default function ArrayField(
    props: {
        definition: SettingDefinition;
    } & React.InputHTMLAttributes<HTMLInputElement>
): React.ReactElement {
    const { definition, ...rest } = props;
    const field = useFieldContext<string[]>();
    const errors = useStore(field.store, (state) => state.meta.errors);

    return (
        <div className={styles.field}>
            <label>
                <h4>{definition.label}</h4>
                <input
                    {...rest}
                    placeholder={`Enter ${definition.label}`}
                    value={field.state.value.join(",")}
                    onChange={(e) => {
                        console.log(
                            "ArrayField onChange",
                            e.target.value.split(",") || []
                        );
                        field.handleChange(e.target.value.split(",") || []);
                    }}
                    type={"text"}
                />
                <p className={styles.description}>{definition.description}</p>
                <Errors errors={errors} />
            </label>
        </div>
    );
}
