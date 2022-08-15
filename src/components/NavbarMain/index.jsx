import { useEffect, useState } from 'react'
//
import Select from 'react-select'
//
import { useNavigate } from 'react-router'
//
import { TbFilePencil } from 'react-icons/tb'
import { RiLightbulbFlashFill } from 'react-icons/ri'
import { MdPersonSearch } from 'react-icons/md'
//
import ModalPatients from '../ModalPatients'
import ModalLamp from '../ModalLamp'
//
import config from '../../config'
import routes from '../../routes'
//
import './NavbarMain.css'




const NavbarMain = ({ getServices, searchByAge, setSearchByAge }) => {
    const [listDoctors, setListDoctors] = useState([])

    const [modalIsOpenLamp, setModalIsOpenLamp] = useState(false)
    const [modalIsOpenPatients, setModalIsOpenPatients] = useState(false)

    const [searchByDoctor, setSearchByDoctor] = useState(null)
    const [searchByService, setSearchByService] = useState('')

    const navigate = useNavigate()


    const onClear = () => {
        getServices()


        setSearchByDoctor(null)
        setSearchByService('')
        setSearchByAge('')
    }


    useEffect(() => {
        (async () => {
            await config.api_host.get(routes.doctors_all).then(r => {
                if (r.status === 200) {
                    const newListDoctors = r.data.map(doctor => ({
                        value: doctor.id,
                        label: doctor.name
                    }))
                    setListDoctors(newListDoctors)
                }
            })
        })()
    }, [])





    const onSearchByDoctorId = selectedDoctor => {
        setSearchByDoctor(selectedDoctor)
        getServices({
            doctor_id: selectedDoctor.value
        })
    }


    const handleKeyDownSearch = (event, type, value) => {
        if (event.key === 'Enter') {
            getServices({
                [type]: value
            })
        }
    }


    // 
    const openModalLamp = () => {
        setModalIsOpenLamp(true)
    }
    const closeModalLamp = () => {
        setModalIsOpenLamp(false)
    }

    // 
    const openModalPatients = () => {
        setModalIsOpenPatients(true)
    }
    const closeModalPatients = () => {
        setModalIsOpenPatients(false)
    }


    return (
        <div className='navbar_main'>
            <ModalLamp
                modalIsOpen={modalIsOpenLamp}
                closeModal={closeModalLamp}
            />
            <ModalPatients
                modalIsOpen={modalIsOpenPatients}
                closeModal={closeModalPatients}
            />
            <Select
                defaultValue={searchByDoctor}
                onChange={onSearchByDoctorId}
                options={listDoctors}
                className='navbar_main_select'
                placeholder="Поиск по врачу..."
            />
            <input
                value={searchByService}
                onChange={e => setSearchByService(e.target.value)}
                onKeyDown={e => handleKeyDownSearch(e, 'search', searchByService)}
                placeholder='Поиск по названию услуги...'
                className='navbar_main_input search_service'
                type="text"
            />
            <input
                value={searchByAge}
                onChange={e => setSearchByAge(e.target.value)}
                onKeyDown={e => handleKeyDownSearch(e, 'age', searchByAge)}
                placeholder='Возраст'
                className='navbar_main_input search_age'
                type="number"
            />
            <button onClick={onClear} className='navbar_main_btn'>
                Очистить
            </button>
            <button onClick={() => navigate('/feedback-management')} className='navbar_main_btn'>
                <TbFilePencil size={24} />
            </button>
            <button onClick={openModalPatients} className='navbar_main_btn'>
                <MdPersonSearch size={24} />
            </button>
            <button onClick={openModalLamp} className='navbar_main_btn'>
                <RiLightbulbFlashFill color='#f4db78' size={24} />
            </button>
        </div>
    )
}

export default NavbarMain