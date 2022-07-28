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
    const [csvDataUpload, setCvsDataUpload] = useState(null)


    // const formik = useFormik({
    //     initialValues: { 
    //         file: null
    //     },
    //     onSubmit: values => {
    //         console.log(values)
    //         config.api_host.post(routes.import_services, JSON.stringify({file: values.file.target.files[0]}, null, 2)).then(r => {
    //             if (r.status === 200) {
    //                 console.log('save')
    //             }
    //         })
    //     },
    // });



    // useEffect(() => {
    //     config.get(routes.service_download).then(r => {
    //         setCsvData(r.data)
    //         console.log(r.data)
    //     })
    // }, [])

    const onHandleUpload = () => {
        console.log(csvDataUpload)
    }

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
                <input
                    id="file"
                    name="file"
                    type='file'
                    accept='.csv'
                    onChange={e => setCvsDataUpload(e.target.files[0])}
                />
                <br />
                <button
                    onClick={onHandleUpload}
                    className='service_editing_one_btn'
                >
                    Отправить
                </button>
            </div>
        </div>
    )
}

export default ServiceEditing