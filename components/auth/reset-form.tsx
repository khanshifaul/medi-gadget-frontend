"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { reset } from "@/actions/auth/reset";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordResetSchema } from "@/lib/zod";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
    startTransition(() => {
      reset(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast.error(data.error); // Use toast for error
          }

          if (data?.success) {
            form.reset();
            toast.success(data.success); // Use toast for success
          }
        })
        .catch(() => toast.error("Something went wrong")); // Use toast for error
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label>Email</label>
            <Input
              {...form.register("email")}
              disabled={isPending}
              placeholder="john.doe@example.com"
              type="email"
            />
            <p>{form.formState.errors.email?.message}</p>
          </div>
        </div>
        <Button disabled={isPending} type="submit" className="w-full">
          Send reset email
        </Button>
      </form>
    </CardWrapper>
  );
};
