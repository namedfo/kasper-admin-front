import { useEffect, useState } from 'react';
//
import Modal from 'react-modal'
//
import { useFormik } from 'formik';
//
import { IoMdClose } from 'react-icons/io'
//
import DatePicker from "react-datepicker";
//
import ModalPatient from '../ModalPatient';
// utils
import padTo2Digits from '../../utils/padTo2Digits'
//
import config from '../../config';
import routes from '../../routes';
//
import './ModalPatients.css'


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

const ModalPatients = ({ modalIsOpen, closeModal }) => {

    const [modalIsPatient, setModalIsPatient] = useState(false)
    const [patientId, setPatientId] = useState(null)

    const [patients, setPatients] = useState([])
    const [activePatient, setActivePatient] = useState(null)

    console.log(patients)


    const getPatients = async (body = {
        surname: '', name: '', middlename: '', phone: '', dob: '', emk: ''
    }) => {
        await config.api_host.post(routes.get_patients_main, body)
            .then(r => {
                if (r.status === 200) {
                    setPatients(r.data)
                }
            })
    }


    const formik = useFormik({
        initialValues: {
            surname: '', // last name
            name: '', // first name
            middlename: '', // middle name
            phone: '', // phone
            dob: '', // date birthday
            emk: '' // emk
        },
        onSubmit: async values => {
            await getPatients(values)
        }
    })



    useEffect(() => {
        (async () => {
            await getPatients()
        })()
    }, [])


    useEffect(() => {
        if (modalIsOpen) {
            document.getElementById('root').style.overflow = 'hidden'
        }

        return () => {
            document.getElementById('root').style.overflow = 'auto'
        }
    }, [modalIsOpen])


    const onClearFormikValues = () => {
        formik.values.surname = ''
        formik.values.name = ''
        formik.values.middlename = ''
        formik.values.phone = ''
        formik.values.dob = ''
        formik.values.emk = ''
    }


    //
    const openModalPatient = () => {
        setModalIsPatient(true)
    }
    const closeModalPatient = () => {
        setModalIsPatient(false)
    }
 

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <ModalPatient 
                patientId={patientId}
                closeModal={closeModalPatient}
                modalIsOpen={modalIsPatient} 
            />
            <button onClick={closeModal} className='modal_patients_btn_close'>
                <IoMdClose size={30} />
            </button>
            <form
                onSubmit={formik.handleSubmit}
                className='modal_patients_header'
            >
                <div className='modal_patients_header_phone_btns'>
                    <input
                        id="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        placeholder='Телефон'
                        className='modal_patients_header_input'
                        type="text"
                    />
                    <button onClick={onClearFormikValues} className='modal_patients_headers_btn_clear' >
                        Очистить
                    </button>
                    <button type="submit" className='modal_patients_header_btn_search'>
                        Искать в расписании
                    </button>
                </div>
                <input
                    id="surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    style={{ marginTop: '10px' }}
                    placeholder='Фамилия'
                    className='modal_patients_header_input'
                    type="text"
                />
                <input
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    style={{ marginTop: '10px' }}
                    placeholder='Имя'
                    className='modal_patients_header_input'
                    type="text"
                />
                <input
                    id="middlename"
                    value={formik.values.middlename}
                    onChange={formik.handleChange}
                    style={{ marginTop: '10px' }}
                    placeholder='Отчество'
                    className='modal_patients_header_input'
                    type="text"
                />
                <div className='modal_patients_header_date_mk'>
                    <DatePicker
                        id="dob"
                        selected={formik.values.dob}
                        onChange={selectedOption => {
                            formik.setFieldValue('dob', selectedOption)
                        }}
                        placeholderText='дд.мм.гггг'
                        className='modal_patients_header_input'
                        type="text"
                    />
                    <input
                        id="emk"
                        value={formik.values.emk}
                        onChange={formik.handleChange}
                        style={{ marginLeft: '10px' }}
                        placeholder='№ ЭМК'
                        className='modal_patients_header_input'
                        type="text"
                    />
                </div>
            </form>
            <table className="modal_patients_content_table">
                <tbody>
                    {patients.map(elem => {

                        const date = new Date(elem.DOB)
                        const years = new Date().getFullYear() - date.getFullYear()
                        const newDate = `${padTo2Digits(date.getDate())}.${padTo2Digits(date.getMonth() + 1)}.${date.getFullYear()}`


                        return (
                            <tr
                                onClick={() => setActivePatient(elem.PATIENTS_ID)}
                                style={{
                                    backgroundColor: activePatient === elem.PATIENTS_ID && '#b4ef9c'
                                }}
                                key={elem.PATIENTS_ID}
                            >
                                <td>{elem.PATIENTS_ID}</td>
                                <td>{elem.PHONE}</td>
                                <td style={{ overflowWrap: 'anywhere' }}>
                                    {elem.F}
                                </td>
                                <td style={{ overflowWrap: 'anywhere' }}>
                                    {elem.N}
                                </td>
                                <td style={{ overflowWrap: 'anywhere' }}>
                                    {elem.M}
                                </td>
                                <td>
                                    {newDate} (возраст {years})
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button onClick={() => {
                                        setPatientId(elem.PATIENTS_ID)
                                        openModalPatient()
                                    }} className='modal_patients_content_table_btn_map'>
                                        Карта
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Modal>
    )
}

export default ModalPatients