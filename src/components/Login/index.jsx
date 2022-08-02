import { useEffect, useState } from 'react';
//
import { toast } from 'react-toastify'
//
import { useLocation, useNavigate } from 'react-router';
//
import Select from 'react-select';
//
import config from '../../config'
import routes from '../../routes';
//
import './Login.css'



const Login = ({ selects }) => {
    const [selected, setSelected] = useState(null)
    const [password, setPassword] = useState('')

    const [isDisabledBtn, setIsDisabledBtn] = useState(true)

    const navigate = useNavigate()

    const location = useLocation()
    const linkReturn = new URLSearchParams(location.search)


    const options = selects.map(select => ({
        value: select.LOGIN,
        label: `${select.name} (${select.LOGIN})`
    }))


    const onHandleLogin = () => {
        config.api_host.post(routes.login, {
            username: selected.value,
            password: password
        }).then(r => {
            if (r.data.status === true) {
                localStorage.setItem('token', r.data.token)
                localStorage.setItem('userData', JSON.stringify({userData: r.data.data.user}))


                setTimeout(() => {
                    navigate(linkReturn.get('return') ?? '/')
                }, 1500)
            }
        })

    }

    useEffect(() => {
        if (selected && password.length > 0) {
            setIsDisabledBtn(false)
        } else {
            setIsDisabledBtn(true)
        }
    }, [selected, password])

    return (
        <div className='login'>
            <img className='login_logo' src={config.logo_login} />
            <h2 className='login_title'>
                Вход в систему
            </h2>
            <div className='login_form'>
                <Select
                    defaultValue={selected}
                    onChange={setSelected}
                    placeholder='Выберите логин'
                    className='login_form_select'
                    options={options}
                />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Пароль'
                    className='login_form_input'
                    type="password"
                />
                <button
                    disabled={isDisabledBtn}
                    onClick={onHandleLogin}
                    className={`login_form_btn_login ${isDisabledBtn && 'login_form_btn_login_disabled'}`}
                >
                    Войти
                </button>
            </div>
        </div>
    )
}


export default Login
