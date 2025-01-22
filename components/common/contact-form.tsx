"use client";

import { sendMessage } from "@/actions/message-sender";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessagesSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const ContactForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof MessagesSchema>>({
    resolver: zodResolver(MessagesSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof MessagesSchema>) => {
    startTransition(() => {
      sendMessage(values).then((data) => {
        toast(data.error);
        toast(data.success);
      });
    });
  };

  return (
    <div className="flex flex-col  w-[100%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex grow flex-col w-full gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Your name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-xl rounded-none p-6 border-0 border-b-2 shadow-none"
                      type="text"
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium self-stretch mt-11 max-md:max-w-full max-md:mt-10">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-xl rounded-none p-6 border-0 border-b-2 shadow-none"
                      type="email"
                      placeholder="john@company.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium self-stretch mt-11 max-md:max-w-full max-md:mt-10">
                    Subject
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full text-xl rounded-none p-6 border-0 border-b-2 shadow-none"
                      type="text"
                      placeholder="This is an optional"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium self-stretch mt-11 max-md:max-w-full max-md:mt-10">
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full text-xl rounded-none p-6 border-0 border-b-2 shadow-none"
                      placeholder="Hi! i’d like to ask about"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-grow flex-row justify-between gap-5 items-center my-8">
              <Button
                onClick={() => {
                  form.handleSubmit(onSubmit);
                }}
                disabled={isPending}
                type="submit"
                variant="default"
                size="lg"
                className="bg-primary border-b-2 border-[color:var(--Primary,#B88E2F)] w-[237px] rounded-none py-8"
              >
                Submit
              </Button>
              <div className="w-full"></div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
