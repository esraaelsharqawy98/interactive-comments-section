import { useState } from "react";
import CurrentUserImg from '../../assets/images/avatars/image-juliusomo.png';

function ReplyForm(props) {
    const [inputValue, setInputValue] = useState("");
    function handleReplyPost() {
        const replyContent = `@${props.replyingTo} ${inputValue}`;
        props.AddReply(replyContent);
        setInputValue("");
    }

    function handleOnChange(event) {
        setInputValue(event.target.value);
    }

    return (
        <div className="Form">
            <img src={CurrentUserImg} alt="current user image" />
            <textarea
                value={inputValue}
                onChange={handleOnChange}
            />
            <button onClick={handleReplyPost}>REPLY</button>
        </div>
    );
}

export default ReplyForm;
