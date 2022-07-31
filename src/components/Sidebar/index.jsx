import { Link, useLocation } from 'react-router-dom'
//
import showPage from '../../showPage'
//
import './Sidebar.css'


const Sidebar = () => {

    const { pathname } = useLocation()

    return (
        <div className="sidebar">
            <div className='sidebar_header'>
                <h4 className='sidebar_header_title'>
                    Sidebar
                </h4>
            </div>
            <div className='sidebar_content'>
                {showPage.map(el => {
                    if (!el.isShow || el.isShow === "false") return  
                    return (
                        <Link
                            key={el.path}
                            className={`sidebar_content_item ${pathname === el.path && 'sidebar_content_item_active'}`}
                            to={el.path}
                        >
                            <span className='sidebar_content_item_title'>
                                {el.title}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}


export default Sidebar
