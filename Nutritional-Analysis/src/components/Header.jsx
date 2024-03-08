import { Navbar, Button } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
export default function Header() {
    const path = useLocation().pathname
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-700 via-cyan-700 to-green-500 rounded-lg text-white'>Nutri</span>Care
        </Link>
        <div className='flex gap-2 md:order-2'>
            <Link to="/Signin">
                <Button gradientMonochrome="success" outline>
                    Sign In
                </Button>
            </Link>
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={'div'}>
                <Link to="/">
                    Home
                </Link>
            </Navbar.Link> 
            <Navbar.Link active={path === '/About'} as={'div'}>
                <Link to="/About" >
                    About
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/Resources'} as={'div'}>
                <Link to="/Resources">
                    Resources
                </Link>
            </Navbar.Link>   
        </Navbar.Collapse>
    </Navbar>
  )
}
