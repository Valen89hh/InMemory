import { Toast } from "react-hot-toast";

const SuccessToast = ({t, msg}: {t: Toast, msg: string}) => {
    return ( 
        <div
            className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md p-4 w-full bg-white shadow-lg rounded-md pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            ✅ {msg}
        </div>
     );
}
 
export default SuccessToast;