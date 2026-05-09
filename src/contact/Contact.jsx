import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setSuccess(false);

    await new Promise((res) => setTimeout(res, 1500));

    setLoading(false);
    setSuccess(true);
    form.reset({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-pink-100 px-6 pt-16">
      <Card className="shadow-xl rounded-2xl max-w-lg w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Contact Me
          </CardTitle>

          <p className="text-gray-500 text-center mt-2">
            Have feedback or want to discuss this project?  
            Feel free to reach out using the form below.
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Message about this project"
                        className="resize-none h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <Button
                disabled={loading}
                className="bg-gradient-to-r from-sky-500 to-pink-500 text-white font-semibold rounded-lg shadow-md mt-2 py-2"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>

              {success && (
                <p className="text-green-500 text-sm text-center mt-2">
                  Message sent successfully!
                </p>
              )}

              <p className="text-xs text-gray-400 text-center mt-6">
                This form is part of a portfolio project: <br />
                User Management Dashboard
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;