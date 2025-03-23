import { createFormHook } from "@tanstack/react-form";
import TextField from "@/components/form/TextField.tsx";
import ArrayField from "@/components/form/ArrayField.tsx";
import { fieldContext, formContext } from "@/hooks/useFormContext.ts";

export const { useAppForm } = createFormHook({
    fieldComponents: {
        TextField,
        ArrayField,
    },
    formComponents: {},
    fieldContext,
    formContext,
});
