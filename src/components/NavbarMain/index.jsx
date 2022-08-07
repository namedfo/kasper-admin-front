//
import Select from 'react-select'
//
import { TbFilePencil } from 'react-icons/tb'
import { RiLightbulbFlashFill } from 'react-icons/ri'
import { MdPersonSearch } from 'react-icons/md'
//
import './NavbarMain.css'



const NavbarMain = () => {
    return (
        <div className='navbar_main'>
            <Select
                placeholder="Поиск по врачу..."
            />
            <input
                placeholder='Поиск по названию услуги...'
                className='navbar_main_input'
                type="text"
            />
            <input
                placeholder='Возраст'
                className='navbar_main_input'
                type="text"
            />
            <div className='navbar_main_btns'>
                <button className='navbar_main_btn'>
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