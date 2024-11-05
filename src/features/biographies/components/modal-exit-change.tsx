"use client"

import Modal from "@/components/widgets/modal";
import { useModalExitChangeState } from "../storage/use-modal-exit-storage";
import Card from "@/components/cards/card";
import ButtonOutline from "@/components/buttons/button-outline";
import ButtonPrimary from "@/components/buttons/button-primary";
import { X } from "lucide-react";
import Link from "next/link";

const ModalExitChange = () => {
    const {stateModalExitChange, closeModalExitChange} = useModalExitChangeState()
    return ( 
        <Modal isOpen={stateModalExitChange} className="flex justify-center items-center">
            <Card className="w-1/2 max-w-[30rem] space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl text-primary">⚠️ Advertencia</h2>
                    <button onClick={closeModalExitChange} className="text-primary">
                        <X/>
                    </button>
                </div>
                <p className="text-center">Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?</p>
                <div className="flex justify-end gap-2">
                    <ButtonOutline onClick={closeModalExitChange}>
                        Cancelar
                    </ButtonOutline>
                    <Link onClick={closeModalExitChange} href={"/dashboard/biographies"}>
                        <ButtonPrimary className="px-8">
                            Salir
                        </ButtonPrimary>
                    </Link>
                </div>
            </Card>
        </Modal>
     );
}
 
export default ModalExitChange;