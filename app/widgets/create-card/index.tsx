"use client";
import { toast } from "sonner";
import FormWrapper, { useZodForm } from "~/components/app-form";
import { InputGroup } from "~/components/input-group";
import { TextareaGroup } from "~/components/textarea-group";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useCreateWishCardAction } from "~/services/actions";
import { CreateCardFormSchema, type CreateCardFormType } from "./schema";

export default function CreateCardForm() {
  const form = useZodForm({
    schema: CreateCardFormSchema,
  });

  const {
    formState: { errors: formErrors },
  } = form;

  const [createWishCard, { isLoading }] = useCreateWishCardAction();

  const handleInput = (name: keyof CreateCardFormType, value: string) => {
    form.setValue(name, value);
    form.clearErrors(name);
  };

  const handleCreateCard = (payload: CreateCardFormType) => {
    createWishCard(payload)
      .then((res) => {
        console.log(res);
        toast.success("Card created successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong. Please try again later.");
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a card</Button>
      </DialogTrigger>

      <DialogContent>
        <FormWrapper form={form} onSubmit={form.handleSubmit(handleCreateCard)}>
          <DialogHeader>
            <DialogTitle>Create a card</DialogTitle>
            <DialogDescription>
              Create a wonderful card for your special someone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5">
            <InputGroup
              label="Title"
              name="title"
              placeholder="Happy Birthday"
              errorMsg={formErrors.title}
              onChange={(evt) => handleInput("title", evt.target.value)}
            />

            <TextareaGroup
              label="Message"
              name="message"
              placeholder="Enter your wonderful message..."
              errorMsg={formErrors.content}
              onChange={(evt) => handleInput("content", evt.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <Button type="submit" loading={isLoading}>
              Create
            </Button>
          </DialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
