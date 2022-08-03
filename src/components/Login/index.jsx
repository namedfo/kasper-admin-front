import { useEffect, useState } from 'react';
//
import { useFormik } from 'formik';
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
    const [isLoading, setIsLoading] = useState(false)

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
            setIsLoading(true)

            config.api_host.post(routes.login, {
                username: values.username.value,
                password: values.password
            }).then(r => {

                if (r.data.status === true) {
                    localStorage.setItem('token', r.data.token)
                    localStorage.setItem('userData', JSON.stringify({ userData: r.data.data.user }))


                    setTimeout(() => {
                        setIsLoading(false)

                        navigate(linkReturn.get('return') ?? '/')
                    }, 3000)
                }
            }).catch(e => setIsLoading(false))
        }
    })




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
                    disabled={isLoading || !formik.dirty}
                    type="submit"
                    className={`login_form_btn_login ${(isLoading || !formik.dirty) && 'login_form_btn_login_disabled'}`}
                >
                    {!isLoading ? 'Войти' : 'Вход...'}
                </button>
            </form>
        </div>
    )
}


export default Login
