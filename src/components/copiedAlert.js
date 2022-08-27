import '../assets/css/copiedAlert.css'
import {useRef} from 'react'

export let copiedMain

const CopiedAlert = ()=>{
    
    copiedMain = useRef(null)
    
    return(
        <>
            <div className="copiedMain" ref={copiedMain}>
                Copied
            </div>
        </>
    )
}

export default CopiedAlert