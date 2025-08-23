"use client";
import FormWrapper, { useZodForm } from "~/components/app-form";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { CreateCardFormSchema } from "./schema";

export default function CreateCardForm() {
  const form = useZodForm({
    schema: CreateCardFormSchema,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a card</Button>
      </DialogTrigger>

      <DialogContent>
        <FormWrapper form={form}>
          <DialogHeader>
            <DialogTitle>Create a card</DialogTitle>
            <DialogDescription>
              Create a wonderful card for your special someone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input name="title" type="text" />
            </div>

            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                name="content"
                placeholder="Enter your wonderful message..."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
