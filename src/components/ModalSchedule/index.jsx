import { useEffect, useState } from 'react';
//
import Modal from 'react-modal'
//
import { IoMdClose } from 'react-icons/io'
//
import padTo2Digits from '../../utils/padTo2Digits'
//
import './ModalSchedule.css'
import ModalTimeTable from '../ModalTimeTable';




Modal.setAppElement('#root')

const customStyles = {
    overlay: {
        background: 'rgba(35, 35, 35, 0.5)'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        top: '100px',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px 25px',

        width: '96%',
        overflow: 'inherit'
    },
};


const ModalSchedule = ({ 
    modalIsOpen, 
    closeModal, 
    multiSlots, 
    timeReceptions
}) => {

    const [modalIsTime, setModalIsTime] = useState(false)
    const [modalTimeParams, setModalTimeParams] = useState(null)


    useEffect(() => {
        if (modalIsOpen) {
            document.getElementById('root').style.overflow = 'hidden'
        }

        return () => {
            document.getElementById('root').style.overflow = 'auto'
        }
    }, [modalIsOpen])

    const shortDayWeek = {
        0: 'ВС',
        1: 'ПН',
        2: 'ВТ',
        3: 'СР',
        4: 'ЧТ',
        5: 'ПТ',
        6: 'СБ'
    }

    const dates = multiSlots?.dates?.map((prevDate, index) => {
        const date = new Date(prevDate)

        const newDate = `${padTo2Digits(date.getDate())}.${padTo2Digits(date.getMonth() + 1)}.${date.getFullYear()}`
        const dayWeek = date.getDay()

        return {
            id: index,
            date: newDate,
            shortDayWeek: shortDayWeek[dayWeek]
        }
    })

    const onOpenModalTime = () => {
        setModalIsTime(true)
    }
    const onCloseModalTime = () => {
        setModalIsTime(false)
    }

    const onClickActive = (prevDate, result) => {
        const date = (+new Date(prevDate) / 1000) + 3600 * 6 
        let newResult = []
        for (let [, value] of Object.entries(result)) {
            newResult = [ ...newResult, Object.keys(value) ]
        }

        
        const params = {
            date: date,
            doctors: newResult[0].map(el => +el)
        }
        onOpenModalTime()
        setModalTimeParams(params)
    }


    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <ModalTimeTable 
                modalTimeParams={modalTimeParams} 
                modalIsOpen={modalIsTime} 
                closeModal={onCloseModalTime} 
                timeReceptions={timeReceptions}
            />
            <button onClick={closeModal} className='modal_schedule_header_btn_close'>
                <IoMdClose size={30} />
            </button>
            <div style={{ overflowX: 'auto' }}>
                <table className='modal_schedule_content_table'>
                    <thead>
                        <tr>
                            <th>

                            </th>
                            {dates?.map(date => (
                                <th key={date.id}>
                                    <p className='modal_schedule_content_table_head_th_date'>
                                        {date.date}
                                    </p>
                                    <div>
                                        <span className='modal_schedule_content_table_head_th_day'>
                                            {date.shortDayWeek}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: '700' }}>
                                Клиника
                            </td>
                            {multiSlots?.dates?.map(date => (
                                <td 
                                    onClick={multiSlots?.result[date] ? () => onClickActive(date, multiSlots?.result[date]) : undefined}
                                    key={date} style={{ backgroundColor: multiSlots?.result[date] ? '#aad48c' : '#f8cbac' }}>

                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </Modal>
    )
}


export default ModalSchedule