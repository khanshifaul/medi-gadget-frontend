"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define your schema with the correct field names
const PasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(1, "New password is required"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

// Define the expected response type
interface UpdatePasswordResponse {
  success?: string;
  error?: string;
}

// Mock updatePassword function for demonstration purposes
const updatePassword = async (
  values: z.infer<typeof PasswordSchema>
): Promise<UpdatePasswordResponse> => {
  // Simulate an API call to update the password
  return new Promise((resolve) => {
    setTimeout(() => {
      if (values.newPassword === values.confirmPassword) {
        resolve({ success: "Password updated successfully!" });
      } else {
        resolve({ error: "Passwords do not match." });
      }
    }, 1000);
  });
};

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PasswordSchema>) => {
    startTransition(() => {
      updatePassword(values)
        .then((data) => {
          if (data.error) {
            form.reset();
            toast.error(data.error); // Use toast for error
          }

          if (data.success) {
            form.reset();
            toast.success(data.success); // Use toast for success
          }
        })
        .catch(() => toast.error("Something went wrong")); // Use toast for error
    });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label>Current Password</label>
            <input
              {...form.register("currentPassword")}
              disabled={isPending}
              placeholder="******"
              type="password"
            />
            <p>{form.formState.errors.currentPassword?.message}</p>
          </div>
          <div>
            <label>New Password</label>
            <input
              {...form.register("newPassword")}
              disabled={isPending}
              placeholder="******"
              type="password"
            />
            <p>{form.formState.errors.newPassword?.message}</p>
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              {...form.register("confirmPassword")}
              disabled={isPending}
              placeholder="******"
              type="password"
            />
            <p>{form.formState.errors.confirmPassword?.message}</p>
          </div>
        </div>
        <button disabled={isPending} type="submit" className="w-full">
          Update Password
        </button>
      </form>
    </div>
  );
};
