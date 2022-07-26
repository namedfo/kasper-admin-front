//
import './PageContainer.css'





const PageContainer = ({ children }) => {
    return (
        <div className='page_container'>
            {children}
        </div>
    )
}

export default PageContainer