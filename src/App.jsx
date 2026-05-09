import { Toaster } from './components/ui/sonner';
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';
import { Route, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import UsersPage from './users/UsersPage';
import HomePage from './home/HomePage';
import BlogsPage from './blogs/BlogsPage';
import ContactPage from './contact/ContactPage';

const App = () => {
  return (
    <main>
      <Navbar/>
      <Routes>
        <Route 
          path="/" 
          element={<LoginForm/>}
        />
        <Route
          path="/registerpage"
          element={<RegisterForm/>}
        />
        <Route
          path="/homepage"
          element={<HomePage/>}
        />
        <Route
          path='/userspage'
          element={<UsersPage/>}
        />
        <Route
          path='/contactpage'
          element={<ContactPage/>}
        />
        <Route 
          path='/blogspage' 
          element={<BlogsPage/>}/>
      </Routes>
      <Toaster richColors />
    </main>
  )
}

export default App;