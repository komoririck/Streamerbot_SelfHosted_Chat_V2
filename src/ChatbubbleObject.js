class ChatbubbleObject {

    constructor(userName = "", userMessage = "", date = "", typeAndPlataform = "", donateAmount = "", profilePicture = "", messageId = "") {
        this.userName = userName;
        this.userMessage = userMessage;
        this.date = date;
        this.typeAndPlataform = typeAndPlataform;
        this.donateAmount = donateAmount;
        this.profilePicture = profilePicture;
        this.messageId = messageId;

        //typeChatterTag = "undefined";
        //typeChatterTag = "moderator";
        //typeChatterTag = "broadcaster";
        this.typeChatterTag = 'subscriber';
        this.rankInfo = '';
        this.memberTier = '';
        this.donateType = '';
    }
}
export default ChatbubbleObject;