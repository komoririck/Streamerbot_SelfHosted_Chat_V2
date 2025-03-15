import PropTypes from "prop-types";

//import { YoutubeTypeChatter, TwitchTypeChatter } from "./ChatSVGAddonList";

let YoutubeTypeChatter = '';
let TwitchTypeChatter = '';

const Chatbubble = ({ userName, userMessage, date, typeAndPlataform, donateAmount, profilePicture, messageId, typeChatterTag, rankInfo, memberTier, donateType }) => {


    const normalMessage = (
        <div className={`msg-container ${typeChatterTag} default user-${userName}`} id={`msg-${messageId}`}>
            <div className="content">
                <div className="author-photo">
                    <img draggable="false" alt="" height="60" width="60" src={profilePicture} />
                    <div className="text-line"></div>
                </div>
                <div className="text-wrapper">
                    <div className="text-block">
                        <div className="user-block">
                            <p className="user">
                                {userName} {rankInfo}
                            </p>
                        </div>
                        <div className="content-message">
                            {(Number(typeAndPlataform) === 2 || Number(typeAndPlataform) === 4)
                                ? userMessage
                                : "Replace with findRepeatedWords function"}
                        </div>
                    </div>
                </div>
            </div>
            <div className="platform-icon">
                {Number(typeAndPlataform) === 2 || Number(typeAndPlataform) === 4 ? YoutubeTypeChatter : TwitchTypeChatter}
            </div>
            <div className="msg-shape">
                <div className="section-1"></div>
                <div className="section-2">
                    <div className="filler"></div>
                </div>
                <div className="section-3"></div>
            </div>
        </div>
    );

    const donateMessage = (
        <div className="alert default" id="msg-32">
            <div className="content">
                <div className="alert-content-wrap">
                    <div className="alert-text">
                        <p className="user">{userName}</p>
                        <p>Doou {donateAmount} {donateType}!</p>
                    </div>
                </div>
            </div>
            <div className="alert-author-photo" width="60" height="60">
                <img id="img" draggable="false" alt="" src={profilePicture} />
            </div>
            <div className="msg-shape">
                <div className="section-1"></div>
                <div className="section-2">
                    <div className="filler"></div>
                </div>
                <div className="section-3"></div>
            </div>
        </div>
    );

    const memberChat = (
        <div className="alert default" id="msg-31">
            <div className="content">
                <div className="alert-content-wrap">
                    <div className="alert-text">
                        <p className="user">
                            Bem-Vindo!! <span className="mention">{userName}</span>
                        </p>
                        <p>Um novo {memberTier} se juntou a nós!</p>
                    </div>
                </div>
            </div>
            <div className="alert-author-photo" width="60" height="60">
                <img id="img" draggable="false" alt="" src={profilePicture} />
            </div>
            <div className="msg-shape">
                <div className="section-1"></div>
                <div className="section-2">
                    <div className="filler"></div>
                </div>
                <div className="section-3"></div>
            </div>
        </div>
    );

    return (
        <>
            {Number(donateAmount) > 0 ? donateMessage : (Number(typeAndPlataform) === 2 || Number(typeAndPlataform) === 4) ? normalMessage : memberChat}
        </>
    );
};

Chatbubble.propTypes = {
    userName: PropTypes.string.isRequired,
    userMessage: PropTypes.string,
    date: PropTypes.string,
    typeAndPlataform: PropTypes.number,
    donateAmount: PropTypes.number,
    profilePicture: PropTypes.string,
    messageId: PropTypes.number,

    typeChatterTag: PropTypes.string,
    rankInfo: PropTypes.string,
    memberTier: PropTypes.string,
    donateType: PropTypes.string,
};

export default Chatbubble;


