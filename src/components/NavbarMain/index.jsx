import { useEffect, useState } from 'react'
//
import Select from 'react-select'
//
import { TbFilePencil } from 'react-icons/tb'
import { RiLightbulbFlashFill } from 'react-icons/ri'
import { MdPersonSearch } from 'react-icons/md'
//
import config from '../../config'
import routes from '../../routes'
//
import './NavbarMain.css'



const NavbarMain = ({ getServices }) => {
    const [listDoctors, setListDoctors] = useState([])

    const [searchByDoctor, setSearchByDoctor] = useState(null)
    const [searchByService, setSearchByService] = useState('')
    const [searchByAge, setSearchByAge] = useState('')


    const onClear = () => {
        getServices()
        

        setSearchByDoctor(null)
        setSearchByService('')
        setSearchByAge('')
    }


    useEffect(() => {
        (async () => {
            config.api_host.get(routes.doctors_all).then(r => {
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

    return (
        <div className='navbar_main'>
            <Select
                defaultValue={searchByDoctor}
                onChange={setSearchByDoctor}
                options={listDoctors}
                className='navbar_main_select'
                placeholder="Поиск по врачу..."
            />
            <input
                value={searchByService}
                onChange={e => setSearchByService(e.target.value)}
                placeholder='Поиск по названию услуги...'
                className='navbar_main_input search_service'
                type="text"
            />
            <input
                value={searchByAge}
                onChange={e => setSearchByAge(e.target.value)}
                placeholder='Возраст'
                className='navbar_main_input search_age'
                type="number"
            />
            <div className='navbar_main_btns'>
                <button onClick={onClear} className='navbar_main_btn'>
                    Очистить
                </button>
                <button className='navbar_main_btn'>
                    <TbFilePencil size={24} />
                </button>
                <button className='navbar_main_btn'>
                    <MdPersonSearch size={24} />
                </button>
                <button className='navbar_main_btn'>
                    <RiLightbulbFlashFill color='#f4db78' size={24} />
                </button>
            </div>
        </div>
    )
}

export default NavbarMain