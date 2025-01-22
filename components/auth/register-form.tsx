"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { register } from "@/actions/auth/register";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/lib/zod";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      try {
        const data = await register(values);
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Email Verification Token Sent");
          router.push("/auth/new-verification");
        }
      } catch {
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label>Name</label>
            <Input
              {...form.register("name")}
              disabled={isPending}
              placeholder="John Doe"
            />
            <p>{form.formState.errors.name?.message}</p>
          </div>
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
          <div>
            <label>Password</label>
            <Input
              {...form.register("password")}
              disabled={isPending}
              placeholder="******"
              type="password"
            />
            <p>{form.formState.errors.password?.message}</p>
          </div>
          <div>
            <label>Confirm Password</label>
            <Input
              {...form.register("confirmPassword")}
              disabled={isPending}
              placeholder="******"
              type="password"
            />
            <p>{form.formState.errors.confirmPassword?.message}</p>
          </div>
        </div>
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>
    </CardWrapper>
  );
};
