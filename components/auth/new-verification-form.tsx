"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { newVerification } from "@/actions/auth/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";

export const NewVerificationForm = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [headerLabel, setHeaderLabel] = useState(
    "Confirming your verification"
  );
  const [isVerified, setIsVerified] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams ? searchParams.get("token") : null;

  const onSubmit = useCallback(() => {
    if (!token || isVerified) {
      setMessage("Check Your Email to Confirm");
      setHeaderLabel("Email Confirmation Required");
      setLoading(false);
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          setMessage("Verification successful! Redirecting to login...");
          setHeaderLabel("Verification Successful");
          setIsVerified(true);
          setTimeout(() => {
            router.push("/auth/login");
          }, 500);
        } else if (data.error) {
          toast.error(data.error);
          setMessage(data.error);
          setHeaderLabel("Verification Failed");
        }
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setMessage("Something went wrong!");
        setHeaderLabel("Error Occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, router, isVerified]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel={headerLabel}
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center p-4">
        {loading ? (
          <p className="text-gray-500 animate-pulse">Loading...</p>
        ) : (
          <p
            className={`text-center ${
              message && message.includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </CardWrapper>
  );
};
