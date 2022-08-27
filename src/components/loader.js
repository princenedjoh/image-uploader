import "../assets/css/loader.css"
import {useRef} from 'react'

export let uploadMain 

const Loader = ()=>{

    uploadMain = useRef(null)


    return(
        <>
            <div className="uploadMain" ref={uploadMain}>
                <div className="loaderTitle">
                    Uploading
                </div>
                <div className="progressBar">
                    <div className="progressBar2">

                    </div>
                </div>
            </div>
        </>
    )
}

export default Loader