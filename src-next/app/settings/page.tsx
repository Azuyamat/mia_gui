"use client";

import React from "react";
import { useConfig } from "@/contexts/ConfigContext.tsx";
import { useAppForm } from "@/hooks/useAppForm.ts";
import { settingDefinitions } from "@/domain/types/Config.ts";
import Form from "@/components/form/Form.tsx";
import { z } from "zod";
import { useToast } from "@/contexts/ToastContext.tsx";
import ToastFactory from "@/domain/factories/ToastFactory.ts";

export default function Page(): React.ReactElement {
    const { addToast, editToast } = useToast();
    const { config, setConfig, saveConfig } = useConfig();
    const form = useAppForm({
        defaultValues: config,
        onSubmit: ({ value }) => {
            const id = addToast(
                ToastFactory.createInfoToast("Saving settings...")
            );
            setConfig(value);
            saveConfig();
            editToast(
                id,
                ToastFactory.createSuccessToast("Settings saved successfully!")
            );
        },
    });

    return (
        <Form>
            <form
                onBlur={() => {
                    form.handleSubmit();
                }}
            >
                {settingDefinitions.map((setting) => {
                    return (
                        <form.AppField
                            key={setting.id}
                            name={setting.id}
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    try {
                                        await setting.zodSchema.parseAsync(
                                            value
                                        );
                                        return undefined;
                                    } catch (error) {
                                        if (error instanceof z.ZodError) {
                                            return error.formErrors.formErrors;
                                        }
                                    }
                                },
                            }}
                        >{(field) => {
                            const isArray = Array.isArray(
                                field.state.value
                            );

                            if (isArray) {
                                return (
                                    <field.ArrayField
                                        definition={setting}
                                    />
                                );
                            } else {
                                return (
                                    <field.TextField definition={setting} />
                                );
                            }
                        }}</form.AppField>
                    );
                })}
            </form>
        </Form>
    );
}
