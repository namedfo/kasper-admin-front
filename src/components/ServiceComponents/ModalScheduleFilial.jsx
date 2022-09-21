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



const ModalScheduleFilial = ({ modalIsOpen, closeModal }) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <div className='flex flex-col'>
                <span className='text-slate-800 font-bold text-[20px]'>
                    Информация о филиале:
                </span>
                <div className='text-left font-medium'>
                    <p>Адрес: ул. Пушкина, д. 22</p>
                    <p>Yасы работы: с 08:00 до 22:00</p>
                    <p>Телефон: +7 123 456 78 90</p>
                    <p>Как добраться: маршрутка К93, остановка “Библиотека”</p>
                </div>
            </div>
        </Modal>
    )
}


export default ModalScheduleFilial;