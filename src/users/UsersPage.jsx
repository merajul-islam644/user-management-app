import React, { useContext } from 'react'
import Users from "../users/users"
import CreateUser from '@/createuser/CreateUser'
import { Button } from '@/components/ui/button'
import { UsersContext } from '@/context/UsersContext'
import Modal from '@/modal/Modal'
import Pagination from './Pagination'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
const Message = ({content, setOpen})=>{
  return(
    <div className={`flex flex-col gap-2 justify-center items-center h-100`}>
      <h1>{content}</h1>
      <Button onClick={()=> setOpen(true)} className="bg-sky-500 hover:bg-sky-600">Create User</Button>
    </div>
  )
}
const UsersPage = () => {
  const { deleteUser, users, loading, error, open, setOpen, openModal, setOpenModal, selectedUser, setSelectedUser, openEditModal, setOpenEditModal, confirmUpdate, updatedUser, setSearch, isSearchMode, paginationUsers} = useContext(UsersContext)
  
  return (
    <div className='bg-gradient-to-br from-sky-100 to-pink-100'>
        <div className='md:top-16 top-18 fixed md:right-4 right-9 shadow-lg'>
          {!error && <Button onClick={()=> setOpen(true)} className="bg-sky-500 hover:bg-sky-600">Create User</Button>}
        </div>
        
        {users.length > 0 && (
          <div className="md:top-16 top-0 fixed left-4">
            <div className="relative">
              <Input
                className="bg-white pl-10 shadow-lg"
                placeholder="Search by user's name..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
        )}

        <div className='min-h-[calc(100vh)]'>
          <div className='flex flex-wrap justify-center gap-2 md:pt-26 md:pb-10 pb-12 pt-28'>
            {loading ? (
              <Message content={"Data is loading..."}/>
            ): error ? (
              <Message 
                setOpen={setOpen}
                content={"No user found. click create user to set one up."}/>
            ):paginationUsers.length === 0 ?(
              <div className='flex justify-center items-center h-85'>
                <p>No results found...</p>
              </div>
            ) :(
              paginationUsers.map((user) => 
              <Users
                key={user.id}
                setOpen={()=> {
                  setSelectedUser(user);
                  setOpen(true);
                }}
                setOpenModal={()=> {
                  setSelectedUser(user);
                  setOpenModal(true);
                }}
                user={user}
              />
            )
            )}
          </div>
        </div>
        {(users.length > 10 && !isSearchMode) && <Pagination/>}
        <div>
          <CreateUser
            open={open}
            onClose={()=> {
              setOpen(false);
              setSelectedUser(null);
            }}
          />
        </div>
        {/* Delete Modal */}
        <Modal
          openModal={openModal}
          title='Confirmation'
          description='Do you really want to delete this user?'
          onClose={() => setOpenModal(false)}
          onConfirm={()=> {
            deleteUser(selectedUser.id);
            setOpenModal(false);
            setSelectedUser(null);
          }}
        />
        {/* Edit Modal */}
        <Modal
          openModal={openEditModal}
          title='Confirmation'
          description='Do you really want to update this user?'
          onClose={() => setOpenEditModal(false)}
          onConfirm={()=> {
            updatedUser(confirmUpdate);
          }}
        />
    </div>
  )
}

export default UsersPage;