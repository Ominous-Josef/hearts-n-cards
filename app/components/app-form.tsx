import { zodResolver } from "@hookform/resolvers/zod";
import type { ComponentProps, ReactNode } from "react";
import {
	type FieldValues,
	FormProvider,
	type Resolver,
	useForm,
	type UseFormProps,
	type UseFormReturn,
} from "react-hook-form";
import type { z, ZodObject } from "zod";

/** Type for useZodForm hook props */
interface UseZodFormProps<T extends ZodObject<any>>
  extends Omit<UseFormProps<z.infer<T>>, "resolver"> {
  schema: T;
}

/**
 * Custom hook to create form with Zod schema validation
 */
export const useZodForm = <T extends ZodObject<any>>({
  schema,
  ...formConfig
}: UseZodFormProps<T>): UseFormReturn<z.infer<T>> => {
  return useForm<z.infer<T>>({
    ...formConfig,
    resolver: zodResolver(schema) as Resolver<z.infer<T>>,
  });
};

// Type for AppForm component props
export interface FormProps<T extends FieldValues>
  extends Omit<ComponentProps<"form">, "children"> {
  form: UseFormReturn<T>;
  disabled?: boolean;
  children: ReactNode;
}

const FormWrapper = <T extends FieldValues>({
  form,
  disabled,
  children,
  ...formProps
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form {...formProps}>
        <fieldset
          disabled={form.formState.isSubmitting || disabled}
          className="grid gap-6 border-none"
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
