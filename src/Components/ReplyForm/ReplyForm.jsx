import CurrentUserImg from '/images/avatars/image-juliusomo.png';

function ReplyForm({AddReply,replyingTextValue,onChangeReplyText}) {

    return (
        <div className="Form">
            <img src={CurrentUserImg} alt="current user image" />
            <textarea
                value={replyingTextValue}
                onChange={onChangeReplyText}
            />
            <button onClick={AddReply}>REPLY</button>
        </div>
    );
}

export default ReplyForm;
