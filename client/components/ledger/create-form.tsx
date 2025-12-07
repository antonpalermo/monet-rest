import * as z from "zod";
import { useForm } from "@tanstack/react-form";

import { Input } from "@ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@ui/field";
import { useLedger } from "@hooks/use-ledger";

export const formSchema = z.object({
  name: z
    .string()
    .min(5, "Ledger name must be at least 5 characters long")
    .max(50, "Ledger name must be at most 50 characters long")
});

export function CreateLedgerForm() {
  const { createLedger } = useLedger();

  const form = useForm({
    defaultValues: {
      name: ""
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      await createLedger(value);
    }
  });

  return (
    <form
      id="ledger-create-form"
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="name"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="Salmon transactions"
                  autoComplete="off"
                  aria-invalid={isInvalid}
                />
                <FieldDescription>
                  Give your ledger a meaningful name
                </FieldDescription>
              </Field>
            );
          }}
        />
      </FieldGroup>
    </form>
  );
}
