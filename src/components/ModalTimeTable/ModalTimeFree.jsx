import Modal from 'react-modal'


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
        padding: '20px 25px 20px  25px',
        borderRadius: '15px',

        width: '40%',
        height: 'auto',
        overflow: 'inherit'
    },
};



const ModalTimeFree = ({ selectedTime, dateFormat, modalIsOpen, closeModal }) => {

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <div className='flex flex-col'>
                <span className='text-slate-800 text-[20px] font-medium'>
                    Current date: {dateFormat}
                </span>
                <span className='text-slate-800 text-[20px] font-medium'>
                    Selected time: {selectedTime}
                </span>
            </div>
        </Modal>
    )
}

export default ModalTimeFree;
