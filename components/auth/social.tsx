"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes.config";
import Image from "next/image";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams ? searchParams.get("callbackUrl") : null;

  const onClick = (provider: "google" | "github" | "facebook") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <Image
          src="/icons/google.png"
          alt="Google"
          width={100}
          height={100}
          className="h-5 w-5"
        />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("facebook")}
      >
        <Image
          src="/icons/facebook.png"
          alt="Facebook"
          width={100}
          height={100}
          className="h-5 w-5"
        />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <Image
          src="/icons/github.png"
          alt="Github"
          width={100}
          height={100}
          className="h-5 w-5"
        />
      </Button>
    </div>
  );
};
