import React, { useContext, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { UsersContext } from "@/context/UsersContext"

const inputs = [
  { name: "name", type: "text", placeholder: "Enter user's name", label: "Name", nameError : "User already added with this name"},
  {name: "email", type: "email", placeholder: "Enter a valid email", label: "E-mail", emailError : "User already added with this E-mail"},
];
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
});

const CreateUser = ({ onClose, open }) => {
  const { isEditMode, addUser, selectedUser, users, setOpenEditModal, setConfirmUpdate} = useContext(UsersContext)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const findName = form.watch("name");
  const findEmail = form.watch("email");
  const testingEmail = users.some((user)=> user.email === findEmail);
  const testingName = users.some((user)=> user.name === findName);
  
  useEffect(()=>{
    if(selectedUser){
      form.reset(selectedUser)
    } else {
      form.reset({ name: "", email: "" })
    }
  },[isEditMode, selectedUser, form])

  const onSubmit = (values) => {
    if(isEditMode){
      const payload = {...selectedUser, ...values}
      setOpenEditModal(true)
      setConfirmUpdate(payload)
    } else {
      if(testingName || testingEmail){
        return;
      } else{
        const payload = { ...values, id: crypto.randomUUID()}
        addUser(payload)
      }
  }
    form.reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <DialogHeader>
              <DialogTitle>Create User</DialogTitle>
              <DialogDescription>
                Please fill in the user details below to create a new user.
              </DialogDescription>
            </DialogHeader>

            {inputs.map((input) => (
            <FormField
                key={input.name}
                control={form.control}
                name={input.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{input.label}</FormLabel>
                    <FormControl>
                      <Input {...field} type={input.type} placeholder={input.placeholder} />
                    </FormControl>
                    <FormMessage />
                    {testingName && !isEditMode && <p className="text-red-500 text-xs mt-1">{input.nameError}</p>}
                    {testingEmail && !isEditMode && <p className="text-red-500 text-xs mt-1">{input.emailError}</p>}
                  </FormItem>
                )}
              />
            ))}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="default" className="bg-sky-500 hover:bg-sky-500">
                {isEditMode ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateUser;
