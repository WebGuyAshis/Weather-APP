import '../assets/css/popupbox.css'

const PopupBox = () =>{
    return(
        <div className="popup-container">
            <div className="popup-box">
                Enter Location
                <input type="text" />
                <button>Search</button>
            </div>
        </div>
    )
}

export default PopupBox;