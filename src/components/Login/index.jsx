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
import { useFormik } from 'formik';



const Login = ({ selects }) => {
    const [isDisabledBtn, setIsDisabledBtn] = useState(true)

    const navigate = useNavigate()

    const location = useLocation()
    const linkReturn = new URLSearchParams(location.search)


    const options = selects.map(select => ({
        value: select.LOGIN,
        label: `${select.name} (${select.LOGIN})`
    }))

    const formik = useFormik({
        initialValues: {
            username: null,
            password: ''
        },
        onSubmit: values => {
            config.api_host.post(routes.login, {
                username: values.username.value,
                password: values.password
            }).then(r => {
                if (r.data.status === true) {
                    localStorage.setItem('token', r.data.token)
                    localStorage.setItem('userData', JSON.stringify({ userData: r.data.data.user }))


                    setTimeout(() => {
                        navigate(linkReturn.get('return') ?? '/')
                    }, 1500)
                }
            })
        }
    })




    useEffect(() => {
        if (formik.values.username && formik.values.password.length > 0) {
            setIsDisabledBtn(false)
        } else {
            setIsDisabledBtn(true)
        }
    }, [formik.values.username, formik.values.password])

    return (
        <div className='login'>
            <img className='login_logo' src={config.logo_login} />
            <h2 className='login_title'>
                Вход в систему
            </h2>
            <form onSubmit={formik.handleSubmit} className='login_form'>
                <Select
                    id="username"
                    defaultValue={formik.values.username}
                    onChange={selectedOption => {
                        formik.setFieldValue('username', selectedOption)
                    }}
                    placeholder='Выберите логин'
                    className='login_form_select'
                    options={options}
                />
                <input
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder='Пароль'
                    className='login_form_input'
                    type="password"
                />
                <button
                    disabled={isDisabledBtn}
                    type="submit"
                    className={`login_form_btn_login ${isDisabledBtn && 'login_form_btn_login_disabled'}`}
                >
                    Войти
                </button>
            </form>
        </div>
    )
}


export default Login
