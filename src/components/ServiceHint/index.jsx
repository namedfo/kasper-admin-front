import { memo } from 'react'
//
import Modal from 'react-modal'
//
import './ServiceHint.css'


Modal.setAppElement('#root')

const customStyles = {
    overlay: {
        background: 'none',
        height: '50px'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        top: '10%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        borderRadius: '15px',
        padding: '20px 25px',

        width: '96%',
        height: 'auto'
    },
};


const ServiceHint = ({ isOpen, text }) => {
    return (
        <Modal 
            isOpen={isOpen}
            style={customStyles}
        >
            <p>
                {text}
            </p>
        </Modal>
    )
}

export default memo(ServiceHint)