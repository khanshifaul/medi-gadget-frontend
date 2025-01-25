"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { login } from "@/actions/auth/login";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoginSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams ? searchParams.get("callbackUrl") : null;

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values, callbackUrl).then((data) => {
        if (data?.error) {
          form.reset();
          toast.error(data.error);
        }

        if (data?.success) {
          form.reset();
          toast.success(data.success);
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true);
        }
      });
    });

    startTransition(() => {
      setTimeout(() => {
        const success = true;
        if (success) {
          toast.success("Login successful!");
          router.push("/auth/login");
        } else {
          toast.error("Login failed.");
        }
      }, 1000);
    });
  };

  return (
    <CardWrapper
      headerLabel={showTwoFactor ? "Two Factor Authentication" : "Welcome back"}
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial={!showTwoFactor}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {showTwoFactor ? (
            <div className="flex flex-col justify-center items-center">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} {...form.register("twoFactorCode")} />
                  <InputOTPSlot index={1} {...form.register("twoFactorCode")} />
                  <InputOTPSlot index={2} {...form.register("twoFactorCode")} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} {...form.register("twoFactorCode")} />
                  <InputOTPSlot index={4} {...form.register("twoFactorCode")} />
                  <InputOTPSlot index={5} {...form.register("twoFactorCode")} />
                </InputOTPGroup>
              </InputOTP>
              <p>{form.formState.errors.twoFactorCode?.message}</p>
            </div>
          ) : (
            <>
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
                <Button
                  size="sm"
                  variant="link"
                  asChild
                  className="px-0 font-normal"
                >
                  <Link href="/auth/reset">Forgot password?</Link>
                </Button>
                <p>{form.formState.errors.password?.message}</p>
              </div>
            </>
          )}
        </div>
        <Button disabled={isPending} type="submit" className="w-full">
          {showTwoFactor ? "Confirm" : "Login"}
        </Button>
      </form>
    </CardWrapper>
  );
};
