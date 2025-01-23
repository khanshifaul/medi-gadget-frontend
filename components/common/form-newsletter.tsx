"use client";
import { ADD_NEWSLETTERSUBSCRIBER } from "@/app/api/graphql/mutation";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const NewsletterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [addNewsletterSubscriber] = useMutation(ADD_NEWSLETTERSUBSCRIBER, {
    variables: { email },
  });

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(() => {
      addNewsletterSubscriber({
        variables: { email },
      });
      setTimeout(() => {
        const success = true;
        if (success) {
          toast.success("Subscription successful!");
        } else {
          toast.error("Subscription failed.");
        }
      }, 1000);
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="md:flex gap-5 items-baseline space-y-2">
          <div>
            <input
              value={email}
              onChange={handleEmailChange}
              className="w-full h-12 text-xl rounded-none p-2 border-0 border-accent-foreground border-b-2 shadow-none"
              type="email"
              placeholder="john@company.com"
            />
          </div>
          <Button
            disabled={isPending}
            type="submit"
            size={"lg"}
            className="w-fit h-12 bg-primary text-xl rounded-none p-6"
          >
            Subscribe
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterForm;
