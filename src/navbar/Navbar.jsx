import { Input } from '@/components/ui/input';
import { UsersContext } from '@/context/UsersContext';
import { LogOut, Menu, Search } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';

const Navbar = () => {
    const {filterUser} = useContext(UsersContext)
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const hideNavbarRoutes = ["/", "/registerpage"];
  const hideRoutes = hideNavbarRoutes.includes(location.pathname);
  const selector = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("loginUser")
    navigate("/")
    toast.success("Logout successfully")
  }

  return (
    <div className="bg-pink-300 text-white p-4 fixed w-full z-50">
      <div className="flex justify-between items-center">
        <div>
          <p className='cursor-pointer font-bold text-lg'>Logo</p>
        </div>

        {/* Search (mobile only) */}
        {(!hideRoutes && location.pathname === "/userspage") && (
        <div className="flex md:hidden flex-1 mx-3">
            <div className="relative w-full">
            <Input
                className="bg-white pl-10 text-gray-700 text-sm"
                placeholder="Search by user name..."
                onChange={(e) => filterUser(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
        </div>
        )}

        {!hideRoutes ? (
          <>
            <div className="hidden md:flex gap-3">
              <p className={`cursor-pointer hover:text-gray-100 ${selector === "/homepage" && "border-b"}`}>
                <Link to="/homepage">Home</Link>
              </p>
              <p className={`cursor-pointer hover:text-gray-100 ${selector === "/userspage" && "border-b"}`}>
                <Link to="/userspage">Users</Link>
              </p>
              <p className={`cursor-pointer hover:text-gray-100 ${selector === "/contactpage" && "border-b"}`}>
                <Link to="/contactpage">Contact</Link>
              </p>
              <p className={`cursor-pointer hover:text-gray-100 ${selector === "/blogspage" && "border-b"}`}>
                <Link to="/blogspage">Blogs</Link>
              </p>
              <div className='flex justify-between items-center gap-0.5 cursor-pointer border pr-1 rounded'>
                <LogOut color="red" className='h-3'/>
                <p onClick={handleLogout} className='hover:text-gray-100'>Logout</p>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <Menu className="h-6 w-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
            </div>
          </>
        ) : (
          <div className='flex gap-3'>
            {location.pathname === "/" ? (
              <p className='cursor-pointer'>
                <Link to="/registerpage">Register</Link>
              </p>
            ) : (
              <p className='cursor-pointer'>
                <Link to="/">Login</Link>
              </p>
            )}
          </div>
        )}
      </div>

    <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={() => setIsOpen(false)}
        >
        <div
            className={`absolute top-0 right-0 h-full w-64 bg-pink-50 shadow-xl p-6 flex flex-col gap-6 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-end">
            <p className="cursor-pointer font-bold text-pink-600 text-xl" onClick={() => setIsOpen(false)}>
                ✕
            </p>
            </div>

            <Link
            to="/homepage"
            className={`text-gray-800 hover:text-pink-600 transition-colors text-lg ${selector === "/homepage" && "font-bold text-pink-800"}`}
            onClick={() => setIsOpen(false)}
            >
            Home
            </Link>
            <Link
            to="/userspage"
            className={`text-gray-800 hover:text-pink-600 transition-colors text-lg ${selector === "/userspage" && "font-bold text-pink-800"}`}
            onClick={() => setIsOpen(false)}
            >
            Users
            </Link>
            <Link
            to="/contactpage"
            className={`text-gray-800 hover:text-pink-600 transition-colors text-lg ${selector === "/contactpage" && "font-bold text-pink-800"}`}
            onClick={() => setIsOpen(false)}
            >
            Contact
            </Link>
            <Link
            to="/blogspage"
            className={`text-gray-800 hover:text-pink-600 transition-colors text-lg ${selector === "/blogspage" && "font-bold text-pink-800"}`}
            onClick={() => setIsOpen(false)}
            >
            Blogs
            </Link>

            <div
            onClick={()=>{setIsOpen(false);handleLogout()}}
            className="flex items-center justify-center gap-2 bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-red-200 transition-colors cursor-pointer mt-4"
            >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Navbar;
