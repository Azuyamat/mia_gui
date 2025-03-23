import { createFormHook } from "@tanstack/react-form";
import TextField from "@/components/form/TextField.tsx";
import { fieldContext, formContext } from "@/hooks/useFormContext.ts";
import FileField from "@/components/form/FileField.tsx";

export const { useAppForm } = createFormHook({
    fieldComponents: {
        TextField,
        FileField,
    },
    formComponents: {},
    fieldContext,
    formContext,
});
