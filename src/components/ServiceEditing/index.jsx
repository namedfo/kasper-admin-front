import { useFormik } from 'formik'

import { useEffect, useState } from 'react'
//
import { CSVLink, CSVDownload } from "react-csv"
//
import config from '../../config'
import routes from '../../routes'
//
import './ServiceEditing.css'



const ServiceEditing = () => {

    const [csvData, setCsvData] = useState(null)


    const formik = useFormik({
        initialValues: { 
            file: ''
        },
        onSubmit: values => {
            // config.post(routes.post, JSON.stringify(values, null, 2)).then(r => {
            //     if (r.status === 200) {
            //         setDetailInfo(false)
            //     }
            // })
        },
    });

    

    // useEffect(() => {
    //     config.get(routes.service_download).then(r => {
    //         setCsvData(r.data)
    //         console.log(r.data)
    //     })
    // }, [])

    return (
        <div className='service_editing'>
            <div className='service_editing_one'>
                <h4 className='service_editing_one_title'>
                    Массовое заполнение услуг
                </h4>
                <button
                    className='service_editing_one_btn'
                >
                    Скачать все услуги
                </button>
                {/* <CSVDownload data={JSON.parse(csvData)} target="_blank" />; */}
            </div>
            <div className='service_editing_two'>
                <h4 className='service_editing_two_title'>
                    Загрузить отредактированные услуги
                </h4>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        value={formik.values.file}
                        onChange={formik.handleChange}
                        accept=".csv"
                    />
                    <br />
                    <button
                        className='service_editing_one_btn'
                        type="submit">Отправить</button>
                </form>
            </div>
        </div>
    )
}

export default ServiceEditing