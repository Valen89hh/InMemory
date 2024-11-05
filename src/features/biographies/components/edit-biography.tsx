"use client";

import Card from "@/components/cards/card";
import Field from "@/components/form/field";
import SelectImage from "@/components/form/select-image";
import Logo from "@/components/logo";
import TabSlider from "@/components/sliders/tabs";
import ButtonPrimary from "@/components/buttons/button-primary";
import ButtonOutline from "@/components/buttons/button-outline";
import { CircularProgress } from "@mui/material";
import FieldDate from "@/components/form/field-date";
import PhotosBiography from "./photos-biography";
import VideosBiography from "./videos-biography";
import MessagesBiography from "./messages-biography";
import RichText from "./rich-text";
import { BiographyForEdit } from "@/lib/supabase/models";
import { useFormEditBiography } from "../hooks/use-form-edit-biography";
import { useModalExitChangeState } from "../storage/use-modal-exit-storage";



interface EditBiographyProps{
    biography: BiographyForEdit
}

const EditBiography: React.FC<EditBiographyProps> = ({
    biography
}) => {
    const tabs = ["Biografía", "Fotos", "Videos", "Mensajes"];
    const {fields, onHandleSubmit, loadingCreate, setFieldValue} = useFormEditBiography(biography)
    const {openModalExitChange} = useModalExitChangeState()

    return (
        <Card className="flex relative flex-col lg:items-start justify-center items-center">
            <h3 className="text-primary text-3xl mb-[2rem] text-center w-full">Editar Biografía</h3>
            <form className="lg:w-full" onSubmit={onHandleSubmit}>
                <div className="bg-background">
                    <Logo className="mx-auto" />
                    <div className="flex flex-col lg:flex-row p-4 w-full gap-6 justify-between ">
                        <SelectImage 
                            dataImage={fields.imagePerson.value}
                            onChangeImage={(data)=>setFieldValue("imagePerson", data)}
                            error={fields.imagePerson.error} 
                            className="h-[30rem] w-full lg:w-[30rem]" 
                        />
                        <div className="flex flex-col gap-4  w-full">
                            <Field
                                classNameContainer="bg-white"
                                className="text-center uppercase"
                                placeholder="Ingerse el nombre"
                                onChange={e=>setFieldValue("namePerson", e.target.value)}
                                value={fields.namePerson.value}
                                error={fields.namePerson.error}
                            />
                            <div className="flex flex-col sm:flex-row items-center gap-1">
                                <div className="w-[100%] h-[1.5px] bg-[#1515151f]"></div>
                                <FieldDate
                                    classNameContainer="bg-white w-full"
                                    className="text-sm w-full"
                                    placeholder="Date Of Birth"
                                    onChangeDate={value=>setFieldValue("dateOfBirth", value)}
                                    valueDate={fields.dateOfBirth.value}
                                    error={fields.dateOfBirth.error}
                                />
                                <span className="text-gray-dark hidden sm:block">-</span>
                                <FieldDate
                                    classNameContainer="bg-white"
                                    className="text-sm"
                                    placeholder="Date Of Death"
                                    onChangeDate={value=>setFieldValue("dateOfDeath", value)}
                                    valueDate={fields.dateOfDeath.value}
                                    error={fields.dateOfDeath.error}
                                />
                                <div className="w-full h-[1.5px] bg-[#1515151f]"></div>
                            </div>
                            <TabSlider tabs={tabs}>
                                <div className="flex h-full flex-col gap-2">
                                    <RichText
                                        content={fields.description.value}
                                        onChange={value=>setFieldValue("description", value)}
                                    />
                                    <Field
                                        classNameContainer="bg-white"
                                        className="text-center uppercase"
                                        placeholder="Ingrese un mensaje principal"
                                        onChange={e=>setFieldValue("messageMain", e.target.value)}
                                        value={fields.messageMain.value}
                                        error={fields.messageMain.error}
                                    />
                                </div>
                                <PhotosBiography initialPhotos={fields.photos.value} onChangePhotos={photos=>setFieldValue("photos", photos)}/>
                                <VideosBiography initialVideos={fields.videos.value} onChangeVideos={videos=>setFieldValue("videos", videos)}/>
                                <MessagesBiography initialMessage={fields.messages.value} onChangeMessage={msgs=>setFieldValue("messages", msgs)}/>
                            </TabSlider>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col-reverse xxs:flex-row "justify-end" gap-4 mt-4`}>
                
                    <div className="flex flex-col xxs:flex-row gap-4">
                        <ButtonPrimary disabled={loadingCreate}>
                            Guardar
                        </ButtonPrimary>
                        <ButtonOutline onClick={openModalExitChange} disabled={loadingCreate} type="button">
                            Cancelar
                        </ButtonOutline>
                    </div>
                </div>
            </form>
            {loadingCreate && (
                <div className="absolute inset-0 bg-black bg-bl bg-opacity-20 text-white flex justify-center items-center gap-2 flex-col">
                    <CircularProgress color="inherit"/>
                    <h3>Creando biografía</h3>
                </div>
            )}
        </Card>
    );
};

export default EditBiography;
