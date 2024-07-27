import { useState } from "react"
import CurrentUserImg from '../../assets/images/avatars/image-juliusomo.png'

function NewComment(props){
    const [inputValue , setInputValue] = useState("");

    function handleSetOnComment(){
        props.AddNewComment(inputValue);
        setInputValue("");
    }

    function handleOnChange(event){
      setInputValue(event.target.value);
    }
    return(
        <div className="Form">
            <img src={CurrentUserImg}  alt="current user image" />
            <textarea placeholder="Add a comment..." value={inputValue} onChange={handleOnChange} cols="30" rows="10"></textarea>
            <button onClick={handleSetOnComment}>SEND</button>
        </div>
    )
}
export default NewComment;