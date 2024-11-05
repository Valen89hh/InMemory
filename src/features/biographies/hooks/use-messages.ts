import { Message } from "@/lib/supabase/models";
import { useEffect, useRef, useState, useTransition } from "react";
import { deleteMessage } from "../actions";
import toast from "react-hot-toast";

export interface MessagesState{
    id: number,
    content: string,
    isNew: boolean
}

export function useMessages(initialMessages: MessagesState[] = [], onChangeMessages: (msgs: MessagesState[])=>void){
    const [messages, setMessages] = useState<MessagesState[]>(initialMessages.map(msg=>({...msg, isNew: false})))
    const [loadingDelete, startLoadingDelete] = useTransition()
    const [focusId, setFocusId] = useState<number | null>(null);
    const textareaRefs = useRef<Map<number, HTMLTextAreaElement>>(new Map());

    useEffect(() => {
        // Enfoca el último textarea añadido
        if (focusId !== null && textareaRefs.current.has(focusId)) {
            textareaRefs.current.get(focusId)?.focus();
        }
    }, [focusId, messages]);


    useEffect(()=>{
        onChangeMessages(messages.filter((msg) => msg.isNew ? msg.content.trim() !== '' : true))
    }, [messages])

    const handleAddMessage = () => {
        setMessages((prevMessages) => {
            const newMesg =  { id: Date.now(), content: '', isNew: true }
            setFocusId(newMesg.id)
            return [...prevMessages, newMesg]
        });
    };

    const handleUpdateMessage = (id: number, content: string) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === id ? { ...msg, content } : msg
          )
        );
    };

    const deleteMessageInState = (id: number)=>{
        setMessages(prev=>prev.filter(msg=>msg.id !== id))
    }

    const handleDeleteMessage = (id: number)=>{
        const msgDelete = messages.find(msg=>msg.id == id)
        if(msgDelete){
            if(msgDelete.isNew){
                deleteMessageInState(msgDelete.id)
            }else{
                startLoadingDelete(async()=>{
                    const result = await deleteMessage(msgDelete.id)
                    if(result.success) deleteMessageInState(msgDelete.id)
                    else toast.error(result.error)
                })
            }
        }
    }

    return {
        messages,
        loadingDelete,
        handleAddMessage,
        handleDeleteMessage,
        handleUpdateMessage,
        focusId,
        setFocusId,
        textareaRefs
    }

}