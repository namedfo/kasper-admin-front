import { useState } from 'react';
//
import Select from 'react-select';
//
import _uniqBy from "lodash/uniqBy";
//
import ServiceBindingTable from '../ServiceBindingTable';
//
import config from '../../config'
import routes from '../../routes'
//
import './ServiceBinding.css'




const ServiceBinding = ({ selectedDoctor, setSelectedDoctor, defaultData }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const [changedData, setChangedData] = useState([])


    const data = defaultData.map(el => ({
        value: el.id,
        label: el.name
    }))

    const getSelectedDoctor = id => {
        setSelectedDoctor({})

        config.api_host.get(`${routes.doctor}?doctor_id=${id}`).then(r => {

            if (r && r.data && !r.data.services) {
                setSelectedDoctor({
                    schedules: r.data.schedules,
                    result: []
                })
            }

            const result = _uniqBy(r.data.services, 'service_id').map(item => {
                const cells = r.data.schedules.map(schedule => {
                    return r.data.services.find(
                        service =>
                            service.service_id === item.service_id &&
                            schedule.schedule_id === service.schedule_id
                    ) ?? null
                })

                
                const defaultSchedules = r.data.default_schedules
                if (defaultSchedules && defaultSchedules.some(default_schedule => item.service_id === default_schedule.service_id)) {
                    defaultSchedules.forEach(default_schedule => {
                        if (item.service_id === default_schedule.service_id) {
                            cells.unshift({
                                ...default_schedule,
                                schedule_id: 1
                            })
                        }
                    })
                } else {
                    cells.unshift({})
                }



                return {
                    service_id: item.service_id,
                    name: item.real_name,
                    cells: cells
                }
            })




            setSelectedDoctor({
                schedules: r.data.schedules,
                result
            })

        })
    }



    const onHandleSelectedOption = selected => {
        setSelectedOption(selected)

        getSelectedDoctor(selected.value)
    }

    const onUpdateSelectedDoctor = () => {
        getSelectedDoctor(selectedOption.value)
    }


    const onHandleSaveChangedData = () => {
        changedData.forEach(elem => {
            config.api_host.post(routes.service_by_schedule_save, {
                schedule_id: elem.schedule_id,
                service_id: elem.service_id,
                min_age: elem.min_age,
                max_age: elem.max_age,
                duration: elem.duration,
                active: elem.active
            })
        })

        onUpdateSelectedDoctor()
        setChangedData([])
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
                    {/* <span className='service_binding_content_doctors_title'>
                        Заполнение услуг для врача: <b>{selectedOption?.label || '...'}</b>
                    </span> */}
                    <div style={{ display: 'flex', flexDirection: ' row' }}>
                        <div style={{ width: '100%' }}>
                            <Select
                                styles={{
                                    width: '100%'
                                }}
                                placeholder="Выберите врача…"
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
                    <button
                        onClick={onHandleSaveChangedData}
                        className='service_binding_content_info_btn_save'
                    >
                        Сохранить
                    </button>
                </div>
                <div className='service_binding_content_wrapper_table'>
                    {selectedDoctor && selectedDoctor.result
                        && <ServiceBindingTable
                            selectedDoctor={selectedDoctor}
                            setChangedData={setChangedData}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default ServiceBinding
