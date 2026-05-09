import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useSaveLoginUser, useGetRegisterUser } from '@/authentication/useAuthentication';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const LoginPage = () => {
  const addUser = useSaveLoginUser();
  const getRegisterUser = useGetRegisterUser();
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    const isValidUser = getRegisterUser.some(
      (user) => user.email === values.email && user.password === values.password
    );
    if (!isValidUser) {
      setError("Invalid email or password");
      return;
    }
    addUser(values);
    form.reset();
    setError("");
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-sky-100 to-pink-100'>
      <form className='bg-white rounded p-4 w-90' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex justify-center'>
          <Label className="text-lg">Login Form</Label>
        </div>

        <Form {...form}>
          <div className='flex flex-col gap-3 my-3'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your E-mail" {...field} autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          </div>

          <div className='flex justify-center'>
            <p className='text-muted-foreground'>
              You don't have an account/<Link className='cursor-pointer text-blue-500' to={"/registerpage"}>Register</Link>
            </p>
          </div>

          <div className='flex justify-center mt-3'>
            <Button className="cursor-pointer bg-sky-500 hover:bg-sky-500" type="submit">Login</Button>
          </div>
        </Form>
      </form>
    </div>
  );
};

export default LoginPage;