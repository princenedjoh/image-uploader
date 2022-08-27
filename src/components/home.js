import '../assets/css/home.css'
import Loader,{uploadMain} from './loader.js'
import {useRef, useState, useEffect} from 'react'
import CopiedAlert, {copiedMain} from './copiedAlert.js'
import {BsFileEarmarkImage} from 'react-icons/bs'
import {BsCheckCircleFill} from 'react-icons/bs'

const Home = ()=>{
    
    const [file, setFile] = useState(null)



    //declaring refs
    const addImageButtonInput = useRef(null)
    const dropperSubtitle = useRef(null)
    const dropper = useRef(null)
    const imageAdderContainer = useRef(null)
    const dropperImage = useRef(null)
    const imageAdderTitle = useRef(null)
    const checkIcon = useRef(null)
    const imageAdderSubtitle = useRef(null)
    const copyLink = useRef(null)
    const imagelink = useRef(null)

    //copied alert 
    const copiedAlert = ()=>{

    }


    //link variable
    let clipboardLink = null


    //copied to clipboard
    const copyToClipboard = ()=>{
        // const copyText = imagelink.current.textContent.select()
        navigator.clipboard.writeText(clipboardLink);
        copiedMain.current.style.display = 'block'
        setTimeout(() => {
            copiedMain.current.style.display = 'none'
        }, 1000);
    }

    //clicked choose file button
    const chooseFileClick = ()=>{
        addImageButtonInput.current.click()
    }


    //drag over event listener
    const dropperDragOver = (e)=>{
        e.preventDefault()
        dropper.current.style.backgroundColor = '#f4fcf4'
        dropper.current.style.border = '2px dashed green'
        dropperSubtitle.current.textContent = "Release to upload image"
    }

    //drag leave event listener
    const dragLeave = (e)=>{
        e.preventDefault()
        dropperSubtitle.current.textContent = "Drag and drop your image here"
        dropper.current.style.backgroundColor = '#F6F8FB'
        dropper.current.style.border = '2px dashed #97BEF4'
    }


    //when file variable is updated
    useEffect(() => {
        if(file){
            const reader = new FileReader()
            reader.onloadend = ()=>{
                dropper.current.style.backgroundImage = `url('${reader.result}')`
                dropperSubtitle.current.textContent = ""
                dropper.current.style.border = '1px solid white'
                dropperImage.current.style.display = 'none'
                imagelink.current.textContent = reader.result
                clipboardLink = reader.result
            }
            const imageUrl = reader.readAsDataURL(file)
            copyLink.current.style.display = 'flex'
        }

    }, [file])


    //file Selected onchange event listener
    const fileSelected = (e)=>{
        if(file !== e.target.files[0]){
            imageAdderContainer.current.style.display = 'none'
            uploadMain.current.style.display = 'flex'
        }
        setTimeout(() => {
            imageAdderContainer.current.style.display = 'flex'
            uploadMain.current.style.display = 'none'
            dropper.current.style.backgroundColor = '#F6F8FB'
        }, 300)
        setFile(e.target.files[0])
        dropper.current.style.border = '2px dashed #97BEF4'
        imageAdderTitle.current.textContent = "Image successfully updated!"
        checkIcon.current.style.display = 'block'
        imageAdderSubtitle.current.style.display = 'none'
    }

    //drop event listener
    const drop = (e)=>{
        e.preventDefault()
        if(file !== e.dataTransfer.files[0]){
            imageAdderContainer.current.style.display = 'none'
            uploadMain.current.style.display = 'flex'
        }
        setTimeout(() => {
            imageAdderContainer.current.style.display = 'flex'
            uploadMain.current.style.display = 'none'
            dropper.current.style.backgroundColor = '#F6F8FB'
        }, 300)
        setFile(e.dataTransfer.files[0])
        dropper.current.style.border = '2px dashed #97BEF4'
        imageAdderTitle.current.textContent = "Image successfully updated!"
        checkIcon.current.style.display = 'block'
        imageAdderSubtitle.current.style.display = 'none'
    }


    return(
        <>
            <div className="main">
                <div className="imageAdderContainer" ref={imageAdderContainer}>
                    <div className="imageAdderTitle" >
                        <div className="checkIcon" ref={checkIcon}><BsCheckCircleFill
                            fontSize="25px"
                        /></div>
                        <div className="imageAdderTitle" ref={imageAdderTitle}>Upload your Image</div>
                    </div>
                    <div className="imageAdderSubtitle" ref={imageAdderSubtitle}>
                        File should be Jpeg, Png... 
                    </div>
                    <div className="dropper" ref={dropper} 
                            draggable
                            onDragOver={(e)=>dropperDragOver(e)}
                            onDrop={(e)=>drop(e)}
                            onDragLeave={(e)=>dragLeave(e)}
                        >
                        <div className="dropperImage" ref={dropperImage}>
                            < BsFileEarmarkImage fontSize="100px"/>
                        </div>
                        <div className="dropperSubtitle" ref={dropperSubtitle}>
                            Drag and drop your image here
                        </div>
                    </div>
                    <div className="imageName">
                        {file? file.name:null}
                    </div>
                    <div className="imageContainerOr">
                        Or
                    </div>
                    <div className="addImageButton" onClick={(e)=>chooseFileClick(e)} >
                        Choose file
                        <input className="addImageButtonInput"
                            type="file" 
                            ref={addImageButtonInput}
                            onChange={(e)=>fileSelected(e)}
                        ></input>
                    </div>

                    <div className="copyLink" ref={copyLink}>
                        <div className="imagelink" ref={imagelink}>
                            
                        </div>
                        <div className="copyButton" onClick={()=>copyToClipboard()}>
                            Copy link
                        </div>
                    </div>
                </div>

                < Loader/>
                < CopiedAlert/>

            </div>
            <div className="footer">
                <div className="createdBy">Created by </div>
                <span className="username">princenedjoh</span>
                <span className="usernamePeriod"></span>
                <span className="devUrl">devChallenges.io</span>
            </div>
        </>
    )

}



export default Home