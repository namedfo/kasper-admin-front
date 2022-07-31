import { useEffect, useState } from 'react'
// components
import Login from '../../components/Login'
//
import routes from '../../routes'
import config from '../../config'
//
import './PLogin.css'



const PLogin = () => {
    const [selects, setSelectes] = useState([])


    useEffect(() => {
        config.api_host(routes.get_list).then(r => {
            setSelectes(r.data)
        })
    }, [])


    return (
        <div className='p_login'>
            <Login selects={selects} />
        </div>
    )
}

export default PLogin