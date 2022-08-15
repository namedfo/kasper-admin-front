import { useEffect, useRef } from "react";

const useOutside = onClose => {
    const ref = useRef(null)


    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    })


    // scalable return 
    return ref
}

export default useOutside