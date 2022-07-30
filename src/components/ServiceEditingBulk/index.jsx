import { useState } from 'react'
//
import fileDownload from 'js-file-download'
//
import config from '../../config'
import routes from '../../routes'
//
import './ServiceEditingBulk.css'



const ServiceEditingBulk = () => {

    const [csvDataUpload, setCsvDataUpload] = useState(null)



    const onDownloadCsv = () => {
        config.api_host.get(routes.export_download).then(r => {
            fileDownload(r.data, 'services.csv')
        })
    }


    const onUploadCsv = () => {
        config.api_host.post(routes.import_services, csvDataUpload)
    }


    return (
        <div className='service_editing_bulk'>
            <div className='service_editing_bulk_one'>
                <h4 className='service_editing_bulk_one_title'>
                    Массовое заполнение услуг
                </h4>
                <button
                    onClick={onDownloadCsv}
                    className='service_editing_bulk_one_btn'
                >
                    Скачать все услуги
                </button>
                {/* <CSVDownload data={JSON.parse(csvData)} target="_blank" />; */}
            </div>
            <div className='service_editing_bulk_two'>
                <h4 className='service_editing_bulk_two_title'>
                    Загрузить отредактированные услуги
                </h4>
                <input
                    id="file"
                    name="file"
                    type='file'
                    accept='.csv'
                    onChange={e => setCsvDataUpload(e.target.files[0])}
                />
                <br />
                <button
                    onClick={onUploadCsv}
                    className='service_editing_bulk_one_btn'
                >
                    Отправить
                </button>
            </div>
        </div>
    )
}

export default ServiceEditingBulk
