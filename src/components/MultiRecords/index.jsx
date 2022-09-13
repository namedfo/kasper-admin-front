import { useState } from 'react';
//
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// components
import MultiRecord from './MultiRecord';
import ModalSchedule from '../ModalSchedule';
// 
import config from '../../config';
import routes from '../../routes';





const MultiRecords = ({
    setMultiRecords,
    multiRecords,
    searchByAge
}) => {

    const [multiSlots, setMultiSlots] = useState([])
    const [isModalSchedule, setIsModalSchedule] = useState(false)


    const onCloseModalSchedule = () => setIsModalSchedule(false)

    const onOpenModalSchedule = () => setIsModalSchedule(true)

    const fetchMultislots = async strict => {
        let newMultiRecords = []
        multiRecords.forEach(service => {
            let data = {}

            service.doctors.forEach(doctor => {
                if (searchByAge?.length > 0) {
                    if (+searchByAge >= +doctor.age[0] && +searchByAge <= +doctor.age[1]) {
                        data = {
                            ...data,
                            [doctor.id]: doctor.duree
                        }
                    }
                } else {
                    data = {
                        ...data,
                        [doctor.id]: doctor.duree
                    }
                }
            })


            newMultiRecords = [...newMultiRecords, {
                name: service.serv_name,
                data
            }]

        })

        await config.api_host.post(`${routes.post_multislots}?strict=${strict}`, newMultiRecords)
            .then(r => {
                if (r.status === 200) {
                    setMultiSlots(r.data)
                    onOpenModalSchedule()
                }
            })
    }

    const resultPrice = () => {
        if (multiRecords.length === 0) {
            return '0₽'
        }


        const resultMinPrice = multiRecords.reduce((prev, next) => prev + next.minPrice, 0)
        const resultMaxPrice = multiRecords.reduce((prev, next) => prev + next.maxPrice, 0)

        if (resultMinPrice === resultMaxPrice) {
            return `${resultMinPrice}₽`
        }

        return `${resultMinPrice}₽ - ${resultMaxPrice}₽`
    }


    const onRemoveRecord = code => {
        setMultiRecords(prev => prev.filter(el => el.code !== code))
    }




    const onDragEnd = result => {

        if (!result.destination) {
            return;
        }
        const newItems = [...multiRecords]

        const [removed] = newItems.splice(result.source.index, 1)

        newItems.splice(result.destination.index, 0, removed)

        setMultiRecords(newItems)
    }





    return (
        <div className="p_main_multi_recording_wrapper">
            <ModalSchedule
                multiSlots={multiSlots}
                modalIsOpen={isModalSchedule}
                closeModal={onCloseModalSchedule}
                multiRecords={multiRecords}
            />
            <div className="p_main_multi_recording">
                <div className="p_main_multi_recording_header">
                    <h3 className="p_main_multi_recording_header_title">
                        Мультизапись
                    </h3>
                </div>
                <div className="p_main_multi_recording_content">
                    <button onClick={() => fetchMultislots(0)} className="p_main_multi_recording_content_btn">
                        В любом порядке
                    </button>
                    <button onClick={() => fetchMultislots(1)} className="p_main_multi_recording_content_btn">
                        В строгом порядке
                    </button>
                    <button className="p_main_multi_recording_content_btn">
                        В одно время
                    </button>
                    <button className="p_main_multi_recording_content_btn">
                        Пересекающиеся услуги
                    </button>
                </div>
                <div style={{ width: '100%', borderBottom: '1.5px solid gray', paddingBottom: '10px' }}>
                    <button className="p_main_multi_recording_content_btn">
                        Итого: {resultPrice()}
                    </button>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='droppable'>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="p_main_multi_recording_footer"
                            >
                                {multiRecords?.map((service, index) => (
                                    <Draggable key={service.id} draggableId={String(service.id)} index={index}>
                                        {(provided, snapshot) => (
                                            <MultiRecord
                                                provided={provided}
                                                snapshot={snapshot}
                                                service={service}
                                                onRemoveRecord={onRemoveRecord}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}


export default MultiRecords