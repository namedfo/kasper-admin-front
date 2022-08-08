import { useEffect } from "react"

const Modal = ({ 
    children
 }) => {



    useEffect(() => {
        document.querySelector('body').style.overflow = 'hidden'


        return () => {
            document.querySelector('body').style.overflow = 'auto'
        }
    }, [])


    return (
        <div className='wrapper_modal'>
            <div className="modal">
                {children}
            </div>
        </div>
    )
}


export default Modal