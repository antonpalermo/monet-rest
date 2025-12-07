import { useForm } from "@tanstack/react-form";

import { Input } from "@ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@ui/field";
import { useLedger } from "@hooks/use-ledger";

import { ledgerSchema } from "@workers/libs/schemas";

export function CreateLedgerForm() {
  const { createLedger } = useLedger();

  const form = useForm({
    defaultValues: {
      name: ""
    },
    validators: {
      onSubmit: ledgerSchema
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
