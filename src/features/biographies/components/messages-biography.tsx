import ButtonPrimary from "@/components/buttons/button-primary";
import { MessagesState, useMessages } from "../hooks/use-messages";
import { Message } from "@/lib/supabase/models";
import { CircularProgress } from "@mui/material";
import FieldArea from "@/components/form/field-area";
import { Trash2 } from "lucide-react";

const MessagesBiography = ({initialMessage, onChangeMessage}: {initialMessage: MessagesState[], onChangeMessage: (msgs: MessagesState[])=>void}) => {
    const {
        messages, 
        handleAddMessage, 
        handleDeleteMessage, 
        handleUpdateMessage, 
        loadingDelete, 
        focusId, 
        textareaRefs,
        setFocusId
    } = useMessages(initialMessage, onChangeMessage)

    return ( 
        <div className="space-y-4 flex flex-col relative  h-full">
            {loadingDelete && (
                <div className="bg-black z-20 bg-opacity-40 absolute inset-0 flex-col flex justify-center items-center gap-2 text-white">
                    <CircularProgress color="inherit"/>
                    <h3>Eliminando imagen...</h3>
                </div>
            )}
            {messages.length > 0 ? (
                <ul className="space-y-4">
                    {messages.map((msg)=>(
                        <li
                            key={msg.id}
                            className="relative"
                        >
                            <div
                                key={msg.id}
                                className={`border-solid transition-all h-full bg-background px-4 py-2 rounded-ms border-2 space-y-1 ${
                                    focusId === msg.id ? "border-primary" : "border-slate-300"
                                }`}
                            >
                                <textarea
                                    ref={(el) => {
                                    if (el) textareaRefs.current.set(msg.id, el);
                                    }}
                                    placeholder="Ingrese el mensaje"
                                    className="outline-none py-4 px-2 text-center uppercase resize-none min-h-20 bg-transparent w-full border-none text-black"
                                    value={msg.content}
                                    onFocus={() => setFocusId(msg.id)}
                                    onBlur={() => setFocusId(null)}
                                    onChange={(e) => handleUpdateMessage(msg.id, e.target.value)}
                                />
                            </div>
                            <button onClick={()=>handleDeleteMessage(msg.id)} type="button" className="absolute p-1 top-2 rounded-ms hover:bg-red-600 bg-red-500 text-white right-2">
                                <Trash2 size={16}/>
                            </button>
                        </li>
                    ))}
                </ul>
            ): (

                <div className="flex-1 min-h-60 flex justify-center items-center">
                    <span>Sin Mensajes</span>
                </div>
            )}
            <ButtonPrimary onClick={handleAddMessage} type="button" className="rounded-md w-full">
                + Añadir mensaje
            </ButtonPrimary>
        </div>
     );
}
 
export default MessagesBiography;