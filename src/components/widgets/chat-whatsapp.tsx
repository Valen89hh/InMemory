import { SocialIcon } from "react-social-icons";

const ChatWhatsapp = () => {
    return ( 
        <div className="fixed bottom-10 right-10 z-20">
            <SocialIcon
                network="whatsapp"
                href={"https://wa.me/51993672965?text=Hola,%20me%20gustaría%20obtener%20más%20información."}
                target="_blank" rel="noopener noreferrer"
            />
        </div>
     );
}
 
export default ChatWhatsapp;