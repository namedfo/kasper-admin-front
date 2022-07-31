import { useEffect, useState } from 'react';
//
import { toast } from 'react-toastify'
//
import Select from 'react-select';
//
import config from '../../config'
import routes from '../../routes';
//
import './Login.css'
import { useNavigate } from 'react-router';



const Login = ({ selects }) => {
    const [selected, setSelected] = useState(null)
    const [password, setPassword] = useState('')

    const [isDisabledBtn, setIsDisabledBtn] = useState(true)

    const navigate = useNavigate()


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
                localStorage.setItem('user', JSON.stringify({
                    userData: r.data.data.user,
                    token: r.data.token
                }))
                navigate('/')
            } else {
                toast.error(r.data.message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    enableHtml: true,
                });
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
