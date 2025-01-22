import { useState } from 'react'
import {Link} from 'react-router-dom'
import { LogOut, Search,Menu } from 'lucide-react'
import { useAuthStore } from '../store/authUser'
import { useContentStore } from '../store/content'

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const {user,logout} = useAuthStore()
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const {content ,setContentType} =useContentStore()
    


  return (

        <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 '>
            <div className='flex flex-row items-center gap-10 z-50'>
                <Link to='/'>
                    <img src="/netflix-logo.png" alt="logo" className='w-32 sm:w-40'/>
                </Link>
                {/* desktop navbar */}
                <div className='hidden sm:flex gap-2 items-center '>
                    <Link to="/" className='hover:underline' onClick={()=>setContentType('movie')}>
                        Movies
                    </Link>
                    <Link to="/" className='hover:underline' onClick={()=>setContentType('tv')}>
                        Tv Shows
                    </Link>
                    <Link to="/history" className='hover:underline'>
                        Search History
                    </Link>
                </div>
                </div>
                <div className='flex  gap-2 items-center z-50 '>
                    
                    <Link to={"/search"} className='hover:underline size-6'>
                    <Search className="size-6 cursor-pointer"/>
                    </Link>
                    <img src={user.image} alt="Avatar" className='h-8 rounded cursor-pointer' />
                    <LogOut className='size-6 cursor-pointer ' onClick={logout}></LogOut>
                    <div className='sm:hidden'>
                        <Menu className="size-6 cursor-pointer" onClick={toggle}/>
                    </div>

                

            </div>
            {/* mobile navbar */}
            {isOpen && (
                <div className='w-full sm:hidden mt-4  z-50 bg-black border rounded border-gray-800'>
                    <Link to="/" className='block hover:underline p-2' onClick={toggle}>Movies</Link>
                    <Link to="/" className='block hover:underline p-2' onClick={toggle}>Tv shows</Link>
                    <Link to="/history" className='block hover:underline p-2' onClick={toggle}>Search History</Link>
                </div>    
            ) }


        </header>
      

  )
}

export default Navbar
