import { memo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Field, FieldError, FieldGroup } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { useCreatePost } from "@/hooks/useCreatePost";
import { toast, Toaster } from "./ui/toast";

const formSchema = z.object({
  title: z.string().nonempty({ error: "title is required" }),
  body: z.string().nonempty({ error: "body is required" }),
});

export type CreatePostProps = {
  userId: number;
  hidden?: boolean;
};

export const CreatePost = memo(function CreatePost({
  userId,
  hidden,
}: CreatePostProps) {
  const [open, setOpen] = useState(false)

  const createPost = useCreatePost(userId);

  const form = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      createPost.mutate(
        {
          ...value,
          userId,
        },
        {
          onSuccess: () => {
            setOpen(false)
            form.reset()
            toast.add({ title: "Post created", type: "success" });
          },
          onError: (error) => {
            toast.add({
              title: "Error creating post",
              type: "error",
              description: error.message,
            });
          },
        },
      );
    },
  });

  return (
    <Dialog open={open} onOpenChange={open => setOpen(open)}>
      <DialogTrigger
        render={
          <Button variant="outline" hidden={hidden}>
            Create new post
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-lg pb-4">Create post</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <form.Field
              name="title"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>Title</Label>
                    <Input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="body"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>Body</Label>
                    <Textarea
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
        <Toaster />
      </DialogContent>
    </Dialog>
  );
});
