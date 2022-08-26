import { useEffect, useState } from 'react';
//
import Modal from 'react-modal'
//
import { IoMdClose } from 'react-icons/io'
//
import config from '../../config'
import routes from '../../routes'
//
import './ModalTimeTable.css'

const timeTableRows = Object.keys({ "01:00": null, "01:05": null, "01:10": null, "01:15": null, "01:20": null, "01:25": null, "01:30": null, "01:35": null, "01:40": null, "01:45": null, "01:50": null, "01:55": null, "02:00": null, "02:05": null, "02:10": null, "02:15": null, "02:20": null, "02:25": null, "02:30": null, "02:35": null, "02:40": null, "02:45": null, "02:50": null, "02:55": null, "03:00": null, "03:05": null, "03:10": null, "03:15": null, "03:20": null, "03:25": null, "03:30": null, "03:35": null, "03:40": null, "03:45": null, "03:50": null, "03:55": null, "04:00": null, "04:05": null, "04:10": null, "04:15": null, "04:20": null, "04:25": null, "04:30": null, "04:35": null, "04:40": null, "04:45": null, "04:50": null, "04:55": null, "05:00": null, "05:05": null, "05:10": null, "05:15": null, "05:20": null, "05:25": null, "05:30": null, "05:35": null, "05:40": null, "05:45": null, "05:50": null, "05:55": null, "06:00": null, "06:05": null, "06:10": null, "06:15": null, "06:20": null, "06:25": null, "06:30": null, "06:35": null, "06:40": null, "06:45": null, "06:50": null, "06:55": null, "07:00": null, "07:05": null, "07:10": null, "07:15": null, "07:20": null, "07:25": null, "07:30": null, "07:35": null, "07:40": null, "07:45": null, "07:50": null, "07:55": null, "08:00": null, "08:05": null, "08:10": null, "08:15": null, "08:20": null, "08:25": null, "08:30": null, "08:35": null, "08:40": null, "08:45": null, "08:50": null, "08:55": null, "09:00": null, "09:05": null, "09:10": null, "09:15": null, "09:20": null, "09:25": null, "09:30": null, "09:35": null, "09:40": null, "09:45": null, "09:50": null, "09:55": null, "10:00": null, "10:05": null, "10:10": null, "10:15": null, "10:20": null, "10:25": null, "10:30": null, "10:35": null, "10:40": null, "10:45": null, "10:50": null, "10:55": null, "11:00": null, "11:05": null, "11:10": null, "11:15": null, "11:20": null, "11:25": null, "11:30": null, "11:35": null, "11:40": null, "11:45": null, "11:50": null, "11:55": null, "12:00": null, "12:05": null, "12:10": null, "12:15": null, "12:20": null, "12:25": null, "12:30": null, "12:35": null, "12:40": null, "12:45": null, "12:50": null, "12:55": null, "13:00": null, "13:05": null, "13:10": null, "13:15": null, "13:20": null, "13:25": null, "13:30": null, "13:35": null, "13:40": null, "13:45": null, "13:50": null, "13:55": null, "14:00": null, "14:05": null, "14:10": null, "14:15": null, "14:20": null, "14:25": null, "14:30": null, "14:35": null, "14:40": null, "14:45": null, "14:50": null, "14:55": null, "15:00": null, "15:05": null, "15:10": null, "15:15": null, "15:20": null, "15:25": null, "15:30": null, "15:35": null, "15:40": null, "15:45": null, "15:50": null, "15:55": null, "16:00": null, "16:05": null, "16:10": null, "16:15": null, "16:20": null, "16:25": null, "16:30": null, "16:35": null, "16:40": null, "16:45": null, "16:50": null, "16:55": null, "17:00": null, "17:05": null, "17:10": null, "17:15": null, "17:20": null, "17:25": null, "17:30": null, "17:35": null, "17:40": null, "17:45": null, "17:50": null, "17:55": null, "18:00": null, "18:05": null, "18:10": null, "18:15": null, "18:20": null, "18:25": null, "18:30": null, "18:35": null, "18:40": null, "18:45": null, "18:50": null, "18:55": null, "19:00": null, "19:05": null, "19:10": null, "19:15": null, "19:20": null, "19:25": null, "19:30": null, "19:35": null, "19:40": null, "19:45": null, "19:50": null, "19:55": null, "20:00": null, "20:05": null, "20:10": null, "20:15": null, "20:20": null, "20:25": null, "20:30": null, "20:35": null, "20:40": null, "20:45": null, "20:50": null, "20:55": null, "21:00": null, "21:05": null, "21:10": null, "21:15": null, "21:20": null, "21:25": null, "21:30": null, "21:35": null, "21:40": null, "21:45": null, "21:50": null, "21:55": null, "22:00": null, "22:05": null, "22:10": null, "22:15": null, "22:20": null, "22:25": null, "22:30": null, "22:35": null, "22:40": null, "22:45": null, "22:50": null, "22:55": null, "23:00": null, "23:05": null, "23:10": null, "23:15": null, "23:20": null, "23:25": null, "23:30": null, "23:35": null, "23:40": null, "23:45": null, "23:50": null, "23:55": null })



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
        height: '96%',
        overflow: 'inherit'
    },
};


const ModalTimeTable = ({ modalIsOpen, closeModal, modalTimeParams }) => {
    const [data, setData] = useState(null)

    const fetchBuildTimeTable = async () => {
        try {
            await config.api_host.post(routes.post_build_time_table, modalTimeParams)
                .then(r => {
                    if (r.status === 200) {
                        setData(r.data)
                    }
                })
        } catch (error) {

        }
    }

    useEffect(() => {
        if (modalIsOpen) {
            document.getElementById('root').style.overflow = 'hidden'
            fetchBuildTimeTable()
        }

        return () => {
            document.getElementById('root').style.overflow = 'auto'
        }
    }, [modalIsOpen])




    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <button onClick={closeModal} className='modal_schedule_header_btn_close'>
                <IoMdClose size={30} />
            </button>
            <div>
                <table className='modal_time_content_table'>
                    <thead>
                        <tr>
                            <th style={{
                                width: '80px',
                                backgroundColor: '#bed3f0',
                                color: "#36406f",
                            }}>
                                Часы
                            </th>
                            <th style={{
                                backgroundColor: '#bed3f0',
                                color: "#36406f",
                            }}>
                                Червонюк Юлия Евгеньевна
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ width: '80px' }}>
                                02:05
                            </td>
                            <td>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        border: '2px solid white',
                                        borderRadius: '50%',
                                        backgroundColor: 'green',
                                        height: '20px',
                                        width: '20px'
                                    }} />
                                    <span style={{ fontWeight: 600, marginLeft: '5px' }}>
                                        Червонюк Юлия Евгеньевна
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '80px' }}>
                                02:05
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '80px' }}>
                                02:05
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '80px' }}>
                                02:05
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '80px' }}>
                                02:05
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '80px' }}>
                                02:05
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '80px' }}>
                                02:05
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '80px' }}>
                                02:05
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '80px' }}>
                                02:05
                            </td>
                            <td>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Modal>
    )
}


export default ModalTimeTable