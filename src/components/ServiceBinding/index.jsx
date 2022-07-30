import { type } from '@testing-library/user-event/dist/type';
import { useState } from 'react';
//
import Select from 'react-select';
//
import ServiceBindingTable from '../ServiceBindingTable';
//
import config from '../../config'
import routes from '../../routes'
//
import './ServiceBinding.css'




const ServiceBinding = ({ defaultData }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const [selectedDoctor, setSelectedDoctor] = useState(null)


    const data = defaultData.map(el => ({
        value: el.id,
        label: el.name
    }))

    const getSelectedDoctor = id => {
        setSelectedDoctor({})
        config.api_host.get(`${routes.doctor}?id=${id}`).then(r => {
            let finalResult = {}

            r.data.services.forEach(service => {
                finalResult[service.service_id] = {
                    service_id: service.service_id,
                    name: service.name,
                    cells: {}
                }

                r.data.schedules.forEach(schedule => {
                    finalResult[service.service_id].cells[schedule.schedule_id] = null
                })
            })

            r.data.services.forEach(service => {
                finalResult[service.service_id].cells[service.schedule_id] = service
            })


            let resultInArray = []
            for (let [key, value] of Object.entries(finalResult)) {
                resultInArray = [...resultInArray, value]
            }


            const resultWithCells = resultInArray.map(e => {

                let resultCells = []
                for (let [key, value] of Object.entries(e.cells)) {
                    resultCells = [...resultCells, value]
                }

                return {
                    ...e,
                    cells: resultCells
                }
            })

            resultWithCells.map(e => {
                r.data.default_schedules.forEach(i => {
                    if (i.service_id === e.service_id) {
                        return {
                            cells: e.cells.unshift(i)
                        }
                    } else {
                        return {
                            ...e,
                            cells: e.cells.unshift(null)
                        }
                    }
                })
            })
            

            setSelectedDoctor({
                services: r.data.services,
                schedules: r.data.schedules,
                resultWithCells,
                finalResult
            })

        })
    }



    const onHandleSelectedOption = selected => {
        setSelectedOption(selected)

        getSelectedDoctor(selected.value)
    }

    const onUpdateSelectedDoctor = () => {
        getSelectedDoctor(selectedDoctor.value)
    }




    return (
        <div className='service_binding'>
            <div className='service_binding_header'>
                <h4 className='service_binding_header_title'>
                    Привязка услуг
                </h4>
            </div>
            <div className='service_binding_content'>
                <div className='service_binding_content_doctors'>
                    <span className='service_binding_content_doctors_title'>
                        Заполнение услуг для врача: <b>{selectedOption?.label || '...'}</b>
                    </span>
                    <div style={{ display: 'flex', flexDirection: ' row' }}>
                        <div style={{ width: '100%' }}>
                            <Select
                                styles={{
                                    width: '100%'
                                }}
                                defaultValue={selectedOption}
                                onChange={onHandleSelectedOption}
                                options={data}
                            />
                        </div>
                        <button
                            onClick={onUpdateSelectedDoctor}
                            className='service_binding_content_doctors_btn_update'
                        >
                            Обновить
                        </button>
                    </div>
                </div>
                <div className='service_binding_content_divider' />
                <div className='service_binding_content_wrapper_info'>
                    <div className='service_binding_content_info'>
                        <div className='service_binding_content_info_el'>
                            <div
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#5ba75b',
                                    marginRight: '2px'
                                }}
                            />
                            Самостоятельное расписание
                        </div>
                        <div className='service_binding_content_info_el'>
                            <div
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#90a7fc',
                                    marginRight: '2px'
                                }}
                            />
                            Наследуется
                        </div>
                        <div className='service_binding_content_info_el'>
                            <div
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#ffa2a2',
                                    marginRight: '2px'
                                }}
                            />
                            Выключено
                        </div>
                        <div className='service_binding_content_info_el'>
                            <div
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#ff9800',
                                    marginRight: '2px'
                                }}
                            />
                            Не сохранено
                        </div>
                        <div className='service_binding_content_info_el'>
                            <div
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'white',
                                    marginRight: '2px'
                                }}
                            />
                            Не настроено
                        </div>
                    </div>
                    <button className='service_binding_content_info_btn_save'>
                        Сохранить
                    </button>
                </div>
                <div className='service_binding_content_wrapper_table'>
                    {selectedDoctor && selectedDoctor.resultWithCells
                        ? <ServiceBindingTable 
                            onUpdateSelectedDoctor={onUpdateSelectedDoctor} 
                            selectedDoctor={selectedDoctor}
                        />
                        : (
                            <span>
                                Select doctor
                            </span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ServiceBinding