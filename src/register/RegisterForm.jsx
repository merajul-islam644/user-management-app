import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Input } from '../components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../components/ui/form';
import { useSaveRegisterUser } from '@/authentication/useAuthentication';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
  gender: z.enum(["male", "female"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
  const { addUser, registerUser } = useSaveRegisterUser();
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      gender: "male",
    }
  });

  const onSubmit = (values) => {
    const existingUser = registerUser.some(user => user.email === values.email);
    if (existingUser) {
      setError("Already registered please login");
      return;
    }

    addUser(values);
    form.reset({ gender: "male" });
    setError("");
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-sky-100 to-pink-100'>
      <form className='bg-white rounded p-4 w-90' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex justify-center mb-3'>
          <Label className="text-xl">Register Form</Label>
        </div>

        <Form {...form}>
          <div className='flex flex-col gap-3 rounded'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} autoComplete="off"/>
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm password" {...field} autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          </div>

          <div className='mt-3'>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <RadioGroup {...field}>
                    <div className='flex gap-5'>
                      <div className='flex gap-2'>
                        <RadioGroupItem className="cursor-pointer" value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className='flex gap-2'>
                        <RadioGroupItem className="cursor-pointer" value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-center mt-3'>
            <p className='text-muted-foreground'>
              You have an account/<Link className='cursor-pointer text-blue-500' to={"/"}>Login</Link>
            </p>
          </div>

          <div className='flex justify-center mt-3'>
            <Button className="cursor-pointer bg-sky-500 hover:bg-sky-500" type='submit' variant='default'>Register</Button>
          </div>
        </Form>
      </form>
    </div>
  )
}

export default RegisterPage;