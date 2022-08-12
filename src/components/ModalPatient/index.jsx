import { useEffect, useState } from 'react';
//
import Modal from 'react-modal'
//
import { IoMdClose } from 'react-icons/io'
//
import config from '../../config';
import routes from '../../routes';
//
import './ModalPatient.css'


Modal.setAppElement('#root')


const customStyles = {
    overlay: {
        background: 'rgba(35, 35, 35, 0.5)'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px 25px',

        width: '96%',
        height: '96%'
    },
};


const ModalPatient = ({ modalIsOpen, closeModal, patientId }) => {

    const [patient, setPatient] = useState()


    useEffect(() => {
        if (modalIsOpen) {
            document.getElementById('root').style.overflow = 'hidden'
        }

        return () => {
            document.getElementById('root').style.overflow = 'auto'
        }
    }, [modalIsOpen])


    useEffect(() => {
        if (patientId) {
            config.api_host.post(routes.get_patient_info, {
                id: patientId
            }).then(r => {
                if (r.status === 200) {
                    setPatient(r.data)
                }
            })
        }
    }, [patientId])



    return (
        <Modal
            style={customStyles}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
        >
            <button onClick={closeModal} className='modal_patient_btn_close'>
                <IoMdClose size={30} />
            </button>
            <div className='modal_patient_header'>
                <h4 className='modal_patient_header_fullname'>Преловская Ирина Михайловна</h4>
                <div className='modal_patient_header_info'>
                    <span className='modal_patient_header_info_phone'>
                        Телефон: <b>+7(911)985-5986</b>
                    </span>
                    <span className='modal_patient_header_info_email'>
                        Email: <b>почта</b>
                    </span>
                    <span className='modal_patient_header_info_birthday'>
                        Дата рождения: <b>26.04.1938 (возраст 84)</b>
                    </span>
                    <span className='modal_patient_header_info_emk'>
                        № ЭМК: <b>1000011</b>
                    </span>
                </div>
                <h3 style={{ marginTop: '20px' }}>Приёмы пациента</h3>
                <h3 style={{ marginTop: '30px' }}>Дополнительная информация</h3>
            </div>
        </Modal>
    )
}

export default ModalPatient