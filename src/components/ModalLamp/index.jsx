import { useEffect, useState } from 'react';
//
import Modal from 'react-modal'
//
import { IoMdClose } from 'react-icons/io'
//
import config from '../../config';
import routes from '../../routes';
//
import './ModalLamp.css'





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
        padding: '40px',

        width: '400px'
    },
};

Modal.setAppElement("#root")


const ModalLamp = ({ modalIsOpen, closeModal }) => {

    const [url, setUrl] = useState(window.location.href)
    const [text, setText] = useState('')


    useEffect(() => {
        if (modalIsOpen) {
            document.getElementById('root').style.overflow = 'hidden'
        }

        return () => {
            document.getElementById('root').style.overflow = 'auto'
        }
    }, [modalIsOpen])



    const onSubmit = async () => {
        await config.api_host.post(routes.post_feedback_main, {
            url,
            text
        })
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <button onClick={closeModal} className='modal_lamp_btn_close'>
                <IoMdClose size={30} />
            </button>
            <input
                disabled
                value={url}
                onChange={e => setUrl(e.target.value)}
                type="text"
                className='modal_lamp_input'
            />
            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                className='modal_lamp_textarea'
                placeholder='Введите предложение'
                cols="30"
                rows="10"
            />
            <button onClick={onSubmit} className='modal_lamp_submit'>
                Отправить предложение
            </button>
        </Modal>
    )
}


export default ModalLamp