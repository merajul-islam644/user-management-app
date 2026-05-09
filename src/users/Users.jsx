import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersContext } from "@/context/UsersContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const users = ({user, setOpenModal, setOpen}) => {
  const {name, email} = user;
  return (
    <Card onClick={()=> setSingleCardOpen(true)} className="w-[300px] bg-pink-400 cursor-pointer">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription className="text-white">Basic details</CardDescription>
      </CardHeader>

      <CardContent className="space-y-1">
        <p className="font-medium text-white">{name}</p>
        <p className="text-sm  text-white">{email}</p>
      </CardContent>
      <CardFooter className='flex gap-3'>
        <Button variant="outline" className="cursor-pointer" onClick={(e)=> {e.stopPropagation();setOpen()}}>Edit</Button>
        <Button variant="destructive" className="cursor-pointer" onClick={(e)=> {e.stopPropagation();setOpenModal()}}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default users;