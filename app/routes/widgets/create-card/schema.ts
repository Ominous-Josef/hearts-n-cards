import * as zod from "zod";

export const CreateCardFormSchema = zod.object({
  content: zod
    .string({ error: "Content is required" })
    .min(1, { error: "Content is required" }),
  title: zod
    .string({ error: "Title is required" })
    .min(1, { error: "Title is required" }),
  description: zod
    .string({ error: "Description is required" })
    .min(1, { error: "Description is required" }),
  recipient: zod
    .string({ error: "Recipient is required" })
    .min(1, { error: "Recipient is required" }),
  recipientEmail: zod
    .email({ error: "Recipient email is required" })
    .min(1, { error: "Recipient email is required" }),
});

export type CreateCardFormType = zod.infer<typeof CreateCardFormSchema>;
