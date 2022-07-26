import { useNavigate } from 'react-router'
//
import './Navbar.css'



const Navbar = () => {

    const navigate = useNavigate()

    return (
        <div className='navbar'>
            <span onClick={() => navigate('/')} className='navbar_logo'>
                Kasper Admin
            </span>
        </div>
    )
}

export default Navbar