import { Navbar, Button, Dropdown, Avatar} from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Header() {
    const path = useLocation().pathname
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleSignout = async () => {
        try{
            const res = await fetch('/api/user/signout', {
                method : 'POST',
            })
            const data = await res.json()
            if(!res.ok)
            {
                console.log(data.message)
            }
            else
            {
                dispatch(signOutSuccess())
            }
        }
        catch(err)
        {
            console.log(err.message)
        }
    }

  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-700 via-cyan-700 to-green-500 rounded-lg text-white'>Nutri</span>Care
        </Link>
        <div className='flex gap-2 md:order-2'>
            {currentUser ? (
                <Dropdown 
                    arrowIcon = {false} 
                    inline 
                    label = {
                        <Avatar
                            alt='user'
                            img={currentUser.profilePicture}
                            rounded
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={'/'}>
                        <Dropdown.Item>Home</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider/>
                    <Dropdown.Item onClick={handleSignout}>
                        Sign Out
                    </Dropdown.Item>   
                </Dropdown>
            ) : (
                <Link to="/Signin">
                    <Button gradientMonochrome="success" outline>
                        Sign In
                    </Button>
                </Link>
            )}
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
            {currentUser ? (
                <Navbar.Link>
                <Dropdown label = 'Resources' inline>
                    <Dropdown.Item>
                        <Link to="/Resources/BMI">
                            BMI Calculator
                        </Link> 
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/Resources/DietRecommender">
                            Diet Recommender
                        </Link> 
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/Resources/ChatBot">
                            Chat Bot
                        </Link> 
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/Resources/FoodAnalysis">
                            Food Analysis
                        </Link> 
                    </Dropdown.Item>
                </Dropdown>
            </Navbar.Link>
            ) : (
                <Navbar.Link disabled>
                    Resources
                </Navbar.Link>
            )}
            
        </Navbar.Collapse>
    </Navbar>
  )
}
