"use client";

import { ChangeEvent, useEffect, useRef, useState, useCallback, useTransition } from "react";
import Card from "@/components/cards/card";
import Field from "@/components/form/field";
import SelectImage from "@/components/form/select-image";
import Logo from "@/components/logo";
import { twMerge } from "tailwind-merge";
import TabSlider from "@/components/sliders/tabs";
import FieldArea from "@/components/form/field-area";
import ButtonPrimary from "@/components/buttons/button-primary";
import ImageGallery from "@/components/galleries.tsx/image-gallery";
import VideoGallery from "@/components/galleries.tsx/video-gallery";
import CarouselVideo from "@/components/sliders/carousel-video";
import Close from "@/components/icons/close";
import ButtonOutline from "@/components/buttons/button-outline";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createBiography, deleteBiography, deleteFile, updateBiography, uploadImageAsync, uploadVideoAsync } from "@/lib/firebase";
import { useAuthStore } from "@/lib/storage/auth-storage";
import ErrorToast from "@/components/toast/error-toast";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import SuccessToast from "@/components/toast/sucess-toast";
import CarouselImage from "@/components/sliders/carouse-image";
import { Biography } from "@/lib/models/biography-model";
import { dateToString } from "@/utils/formater-date";
import { generateUniqueId } from "@/utils/uid";
import { getPathUrl } from "@/utils/formater-url";

const stylesField = "bg-white border-primary border-2 focus:shadow-md transition-all duration-300";

interface MediaData {
    urls: string[];
    files: File[];
}

interface ImagePersonDeath {
    file: File | null;
    error: string;
}

interface UploadFile {
    id: string;
    loading: boolean;
    progress: number;
    nameFile: string;
}

const parseDateString = (value: any, originalValue: string) => {
    if (originalValue) {
        const [year, month, day] = originalValue.split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    return null;
};

const formatDate = (date: Date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Añadir ceros iniciales si es necesario
    const day = ("0" + date.getDate()).slice(-2); // Añadir ceros iniciales si es necesario
    return `${year}-${month}-${day}`;
};

const CreateBiographySchemea = Yup.object().shape({
    name: Yup.string().required("Nombre requerido"),
    dateBirth: Yup.date()
        .transform(parseDateString)
        .required("Nacimiento requerido")
        .max(Yup.ref("dateDeath"), "La fecha de nacimiento no puede ser superior al fallecimiento"),
    dateDeath: Yup.date()
        .transform(parseDateString)
        .required("Fallecimiento requerido")
        .min(Yup.ref("dateBirth"), "La fecha de fallecimiento no puede ser anterior al nacimiento"),
    biography: Yup.string().required("Biografía requerida"),
    mainMensaje: Yup.string().required("Mensaje requerido").max(200, "Mensaje muy largo"),
});

interface IFormCreateBiography extends Yup.InferType<typeof CreateBiographySchemea> {}

const CreateBiographyPage = (
    {bio , editMode = false}: 

    {bio?: Biography, editMode?: boolean}
) => {
    const tabs = ["Biografía", "Fotos", "Videos", "Mensajes"];
    const { user } = useAuthStore();
    const router = useRouter();
    const fileInputPhotoRef = useRef<HTMLInputElement>(null);
    const fileInputVideoRef = useRef<HTMLInputElement>(null);
    const [photos, setPhotos] = useState<MediaData>({ urls: bio ? bio.photos : [], files: [] });
    const [videos, setVideos] = useState<MediaData>({ urls: bio ? bio.videos : [], files: [] });
    const [mensajes, setMensajes] = useState<string[]>(bio ? bio.messages : []);
    const [imagePersonDeath, setImagePersonDeath] = useState<ImagePersonDeath>({ file: null, error: "" });
    const [uploadFile, setUploadFile] = useState<UploadFile[]>([
        { id: "photoDeath", loading: false, progress: 0, nameFile: "" },
        { id: "photos", loading: false, progress: 0, nameFile: "" },
        { id: "videos", loading: false, progress: 0, nameFile: "" },
    ]);
    const [changes, setChanges] = useState(false)
    const [loadingBiography, startLoadingBiography] = useTransition();
    const [loadingDeleteBiography, startLoadingDeleteBiography] = useTransition();
    
    const { register, handleSubmit, setValue,formState: { errors } } = useForm<IFormCreateBiography>({
        resolver: yupResolver(CreateBiographySchemea)
    });

    useEffect(() => {
        if (bio) {
            setValue("name", bio.name);
            setValue("biography", bio.biographyDescription);
            setValue("mainMensaje", bio.mainMessage);
        }
    }, [bio, setValue]);

    const updateLoadFile = useCallback((id: string, loadFile: UploadFile) => {
        setUploadFile((prevUpload) => prevUpload.map((file) => (file.id === id ? loadFile : file)));
    }, []);

    const handleDeleteImage = useCallback(async(index: number)=>{
        const confirmDelete = confirm("Desear eliminar la imagen")
        if(confirmDelete){
            try{

                const url = photos.urls[index]
                const pathFile = getPathUrl(url)
                if(pathFile){
                    console.log("Delete file", pathFile)
                    const res = await deleteFile(pathFile)
                    toast.custom((t) => <SuccessToast t={t} msg={res} />);
                }
                console.log(photos.urls.filter((fl, i)=>  i!== index))
                setPhotos((prev)=>({
                    files: prev.files.filter((fl, i)=>  i!== index),
                    urls: prev.urls.filter((fl, i)=>  i!== index)
                }))
                setChanges(true)

                
            }catch(err){
                toast.custom((t) => <ErrorToast t={t} msg={"No se pudo eliminar la imagen"} />);
            }
        }
    }, [photos])

    const handleDeleteVideo    = useCallback(async(index: number)=>{
        const confirmDelete = confirm("Desear eliminar el video")
        if(confirmDelete){
            try{

                const url = videos.urls[index]
                const pathFile = getPathUrl(url)
                if(pathFile){
                    console.log("Delete file", pathFile)
                    const res = await deleteFile(pathFile)
                    toast.custom((t) => <SuccessToast t={t} msg={res} />);
                }
                setVideos((prev)=>({
                    files: prev.files.filter((fl, i)=>  i!== index),
                    urls: prev.urls.filter((fl, i)=>  i!== index)
                }))
                setChanges(true)

                
            }catch(err){
                toast.custom((t) => <ErrorToast t={t} msg={"No se pudo eliminar la imagen"} />);
            }
        }
    }, [videos])

    const onSubmit: SubmitHandler<IFormCreateBiography> = useCallback(async (data) => {
        startLoadingBiography(async () => {
            if(editMode && bio && user){
                console.log("Actualizando ...----- ", bio)
                try {
                    setUploadFile([
                        { id: "photoDeath", loading: true, progress: 0, nameFile: ""},
                        { id: "photos", loading: true, progress: 0, nameFile: "" },
                        { id: "videos", loading: true, progress: 0, nameFile: "" },
                    ]);
                    console.log("Empezar");
                    let urlImagePhoto = bio.photoPerson
                    if(imagePersonDeath.file){
                        const subPhat = `${user.uid}/image-${generateUniqueId()}`
                        urlImagePhoto = await uploadImageAsync(subPhat, imagePersonDeath.file, {
                            onProgressUpload(progress) {
                                updateLoadFile("photoDeath", {
                                    id: "photoDeath",
                                    loading: true,
                                    progress,
                                    nameFile: imagePersonDeath.file?.name ?? "",
                                });
                            },
                            onErrorUpload(err) {
                                updateLoadFile("photoDeath", {
                                    id: "photoDeath",
                                    loading: false,
                                    progress: 0,
                                    nameFile: imagePersonDeath.file?.name ?? "",
                                });
                            },
                            onSuccessUpload(url) {
                                
                            },
                            
                        });
                    }


                    const photosUrls: string[] = photos.urls.filter(fl=>!fl.startsWith("blob"));

                    for (const file of photos.files) {
                        const subPhat = `${user.uid}/image-${generateUniqueId()}`
                        const urlPhoto = await uploadImageAsync(subPhat, file, {
                            onProgressUpload(progress) {
                                updateLoadFile("photos", {
                                    id: "photos",
                                    loading: true,
                                    progress,
                                    nameFile: file.name,
                                });
                            },
                            onErrorUpload(err) {
                                updateLoadFile("photos", {
                                    id: "photos",
                                    loading: false,
                                    progress: 0,
                                    nameFile: file.name,
                                });
                            },
                            onSuccessUpload(url) {
                                
                            },
                        });
                        photosUrls.push(urlPhoto);
                    }

                    const videosUrls: string[] = videos.urls.filter(fl=>!fl.startsWith("blob"));

                    for (const file of videos.files) {
                        const subPhat = `${user.uid}/video-${generateUniqueId()}`
                        const urlVideo = await uploadVideoAsync(subPhat, file, {
                            onProgressUpload(progress) {
                                updateLoadFile("videos", {
                                    id: "videos",
                                    loading: true,
                                    progress,
                                    nameFile: file.name,
                                });
                            },
                            onErrorUpload(err) {
                                updateLoadFile("videos", {
                                    id: "videos",
                                    loading: false,
                                    progress: 0,
                                    nameFile: file.name,
                                });
                            },
                            onSuccessUpload(url) {
                                
                            },
                        });
                        videosUrls.push(urlVideo);
                    }

                    const res = await updateBiography({
                        userId: user.uid,
                        name: data.name.toLowerCase(),
                        mainMessage: data.mainMensaje,
                        dateOfBirth: data.dateBirth,
                        dateOfDeath: data.dateDeath,
                        biographyDescription: data.biography,
                        photoPerson: urlImagePhoto,
                        photos: photosUrls,
                        videos: videosUrls,
                        messages: mensajes,
                        id: bio.id,
                        statusPayment: ""
                    });

                    console.log(res);

                    if (res.error) {
                        toast.custom((t) => <ErrorToast t={t} msg={res.error} />);
                    } else if (res.success) {
                        toast.custom((t) => <SuccessToast t={t} msg={res.success} />);
                        router.push("/dashboard/biographies");
                    }
                } catch (err) {
                    console.error(err);
                }
            }else{
                if (imagePersonDeath.file && user) {
                    console.log("Creando ...----- ")
                    try {
                        setUploadFile([
                            { id: "photoDeath", loading: true, progress: 0, nameFile: imagePersonDeath.file.name },
                            { id: "photos", loading: true, progress: 0, nameFile: "" },
                            { id: "videos", loading: true, progress: 0, nameFile: "" },
                        ]);
                        console.log("Empezar");
                        const subPhat = `${user.uid}/image-${generateUniqueId()}`
                        const urlImagePhoto = await uploadImageAsync(subPhat, imagePersonDeath.file, {
                            onProgressUpload(progress) {
                                updateLoadFile("photoDeath", {
                                    id: "photoDeath",
                                    loading: true,
                                    progress,
                                    nameFile: imagePersonDeath.file?.name ?? "",
                                });
                            },
                            onErrorUpload(err) {
                                updateLoadFile("photoDeath", {
                                    id: "photoDeath",
                                    loading: false,
                                    progress: 0,
                                    nameFile: imagePersonDeath.file?.name ?? "",
                                });
                            },
                            onSuccessUpload(url) {
                                
                            },
                            
                        });
    
                        const photosUrls: string[] = [];
    
                        for (const file of photos.files) {
                            const subPhat = `${user.uid}/image-${generateUniqueId()}`
                            const urlPhoto = await uploadImageAsync(subPhat, file, {
                                onProgressUpload(progress) {
                                    updateLoadFile("photos", {
                                        id: "photos",
                                        loading: true,
                                        progress,
                                        nameFile: file.name,
                                    });
                                },
                                onErrorUpload(err) {
                                    updateLoadFile("photos", {
                                        id: "photos",
                                        loading: false,
                                        progress: 0,
                                        nameFile: file.name,
                                    });
                                },
                                onSuccessUpload(url) {
                                    
                                },
                            });
                            photosUrls.push(urlPhoto);
                        }
    
                        const videosUrls: string[] = [];
    
                        for (const file of videos.files) {
                            const subPhat = `${user.uid}/video-${generateUniqueId()}`
                            const urlVideo = await uploadVideoAsync(subPhat, file, {
                                onProgressUpload(progress) {
                                    updateLoadFile("videos", {
                                        id: "videos",
                                        loading: true,
                                        progress,
                                        nameFile: file.name,
                                    });
                                },
                                onErrorUpload(err) {
                                    updateLoadFile("videos", {
                                        id: "videos",
                                        loading: false,
                                        progress: 0,
                                        nameFile: file.name,
                                    });
                                },
                                onSuccessUpload(url) {
                                    
                                },
                            });
                            videosUrls.push(urlVideo);
                        }
    
                        const res = await createBiography({
                            userId: user?.uid,
                            name: data.name.toLowerCase(),
                            mainMessage: data.mainMensaje,
                            dateOfBirth: data.dateBirth,
                            dateOfDeath: data.dateDeath,
                            biographyDescription: data.biography,
                            photoPerson: urlImagePhoto,
                            photos: photosUrls,
                            videos: videosUrls,
                            messages: mensajes,
                            id: "",
                            statusPayment: ""
                        });
    
                        console.log(res);
    
                        if (res.error) {
                            toast.custom((t) => <ErrorToast t={t} msg={res.error} />);
                        } else if (res.success) {
                            toast.custom((t) => <SuccessToast t={t} msg={res.success} />);
                            router.push("/dashboard/biographies");
                        }
                    } catch (err) {
                        console.error(err);
                    }
                } else {
                    setImagePersonDeath((prev) => ({ ...prev, error: "Imagen requerida" }));
                }
            }
        });
    }, [imagePersonDeath.file, user, photos.files, videos.files, mensajes, updateLoadFile, startLoadingBiography, router]);

    const handleClickFilePhoto = useCallback(() => {
        fileInputPhotoRef.current?.click();
    }, []);

    const handleClickFileVideo = useCallback(() => {
        fileInputVideoRef.current?.click();
    }, []);

    const addMessage = useCallback(() => {
        setMensajes((prev) => [...prev, ""]);
    }, []);

    const deleteMessage = useCallback((index: number) => {
        setMensajes((prev) => prev.filter((_, i) => i !== index));
    }, []);

    useEffect(()=>{
        console.log("Fotos: ", photos)
    }, [photos])

    const handlePhotoSelected = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setPhotos((prev) => ({
                files: [...prev.files, files[0]],
                urls: [...prev.urls, URL.createObjectURL(files[0])],
            }));
        }
    }, []);

    const handleVideoSelected = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setVideos((prev) => ({
                files: [...prev.files, files[0]],
                urls: [...prev.urls, URL.createObjectURL(files[0])],
            }));
        }
    }, []);

    const handleDeleteBiography = useCallback(()=>{
        const isDelete = confirm("¿Desear eliminar la biografía?")
        if(isDelete && bio){
            startLoadingDeleteBiography(async()=>{
                const res = await deleteBiography(bio.id)
                if (res.error) {
                    toast.custom((t) => <ErrorToast t={t} msg={res.error} />);
                } else if (res.success) {
                    toast.custom((t) => <SuccessToast t={t} msg={res.success} />);
                    router.push("/dashboard/biographies");
                }
            })
        }
    }, [])



    return (
        <Card className="flex flex-col lg:items-start justify-center items-center">
            <h3 className="text-primary text-3xl mb-[2rem] text-center w-full">{editMode ? "Editar" : "Crear"} Biografía</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="lg:w-full">
                <div className="bg-background">
                    <Logo className="mx-auto" />
                    <div className="flex flex-col lg:flex-row p-4 w-full gap-6 justify-between ">
                        <SelectImage progressUpload={uploadFile[0].progress} loading={uploadFile[0].loading} src={bio ? bio.photoPerson : ""} error={imagePersonDeath.error} onSelectFile={(file) => setImagePersonDeath({ error: "", file })} className="h-[30rem] w-full lg:w-[30rem]" />
                        <div className="space-y-4 w-full">
                            <Field {...register("name")} error={errors.name?.message} className={twMerge(stylesField, "uppercase text-center")} placeholder="Ingresa el nombre" />
                            <div className="flex flex-col xs:flex-row items-center gap-1">
                                <div className="w-[100%] h-[1.5px] bg-gray-dark"></div>
                                <Field defaultValue={bio ? dateToString(bio.dateOfBirth) : ""} {...register("dateBirth")} error={errors.dateBirth?.message} className={twMerge(stylesField, "p-1 text-sm ")} type="date" placeholder="Nacimiento" />
                                <span className="text-gray-dark">-</span>
                                <Field defaultValue={bio ? dateToString(bio.dateOfDeath) : ""} {...register("dateDeath")} error={errors.dateDeath?.message} className={twMerge(stylesField, "p-1 text-sm ")} type="date" placeholder="Fallecimiento" />
                                <div className="w-full h-[1.5px] bg-gray-dark"></div>
                            </div>
                            <TabSlider tabs={tabs}>
                                <div>
                                    <FieldArea {...register("biography")} error={errors.biography?.message} className={twMerge(stylesField, "h-[25rem]")} placeholder="Ingresa la biografía" />
                                    <Field {...register("mainMensaje")} error={errors.mainMensaje?.message} classNameContainer="border-t-2 pt-2  border-gray-light" className={twMerge(stylesField, "text-center uppercase")} placeholder="Ingresa un mensaje principal" />
                                </div>
                                <div className="space-y-4 relative">
                                    {photos.urls.length > 0 ? (
                                        <>
                                            <ImageGallery onDeleteImage={handleDeleteImage} editMode className="hidden xl:block" images={photos.urls} onSelectImage={()=>{}} />
                                            <CarouselImage onDeleteImage={handleDeleteImage} editMode className="xl:hidden" images={photos.urls} />
                                        </>
                                    ) : (
                                        <div className="h-[25rem] flex justify-center items-center">
                                            <span>Sin Fotos</span>
                                        </div>
                                    )}
                                    {uploadFile[1].loading ? (
                                        <div className="bg-[#0000006b] text-white flex-col my-0 mt-0 absolute inset-0 flex justify-center items-center" style={{ marginTop: 0 }}>
                                            {uploadFile[1].progress >= 100 ? (
                                                <span>✅ Foto subida</span>
                                            ) : (
                                                <>
                                                    <CircularProgress color="inherit" variant="determinate" value={uploadFile[1].progress} />
                                                    <span>Subiendo {uploadFile[1].nameFile}</span>
                                                </>
                                            )}
                                        </div>
                                    ): (
                                        <>
                                            <input ref={fileInputPhotoRef} onChange={handlePhotoSelected} className="hidden" type="file" accept="image/*" />
                                            <ButtonPrimary type="button" onClick={handleClickFilePhoto} className="rounded-md w-full">
                                                + Añadir foto
                                            </ButtonPrimary>
                                        </>
                                    )}
                                </div>
                                <div className="space-y-4 relative">
                                    {videos.urls.length > 0 ? (
                                        <>
                                            <VideoGallery onDeleteVideo={handleDeleteVideo} editMode className="hidden xl:block" videos={videos.urls} onSelectVideo={() => { }} />
                                            <CarouselVideo onDeleteVideo={handleDeleteVideo} editMode  className="xl:hidden" videos={videos.urls} />
                                        </>
                                    ) : (
                                        <div className="h-[25rem] flex justify-center items-center">
                                            <span>Sin Videos</span>
                                        </div>
                                    )}
                                    {uploadFile[2].loading ? (
                                        <div className="bg-[#0000006b] mt-0 text-white flex-col my-0 absolute inset-0 flex justify-center items-center" style={{ marginTop: 0 }}>
                                            {uploadFile[2].progress >= 100 ? (
                                                <span>✅ Video subido</span>
                                            ) : (
                                                <>
                                                    <CircularProgress color="inherit" variant="determinate" value={uploadFile[2].progress} />
                                                    <span>Subiendo {uploadFile[2].nameFile}</span>
                                                </>
                                            )}
                                        </div>
                                    ): (
                                        <div>
                                            <input ref={fileInputVideoRef} onChange={handleVideoSelected} className="hidden" type="file" accept="video/*" />
                                            <ButtonPrimary disabled={loadingDeleteBiography || loadingBiography} type="button" onClick={handleClickFileVideo} className="rounded-md w-full">
                                                + Añadir video
                                            </ButtonPrimary>
                                        </div>
                                    )}
                                </div>
                                <div className="">
                                    <ul>
                                        {mensajes.map((msg, i) => (
                                            <li key={i} className="relative">
                                                <FieldArea classNameContainer="border-b-2 border-gray-light mb-4" defaultValue={msg} onChange={(e) => {
                                                    setMensajes((prev) => {
                                                        const msgs = [...prev];
                                                        msgs[i] = e.target.value;
                                                        return msgs;
                                                    });
                                                }} className={twMerge(stylesField, "uppercase text-center text-sm h-[10rem] px-8")} placeholder="Ingresa el mensaje" />
                                                <Close onClick={() => deleteMessage(i)} className="absolute top-3 right-3 cursor-pointer hover:shadow-md" width={12} height={12} color="#003F5F" />
                                            </li>
                                        ))}
                                    </ul>
                                    {mensajes.length === 0 && (
                                        <div className="h-[25rem] flex justify-center items-center">
                                            <span>Sin Mensajes</span>
                                        </div>
                                    )}
                                    <ButtonPrimary disabled={loadingDeleteBiography || loadingBiography} type="button" onClick={addMessage} className="rounded-md w-full">
                                        + Añadir mensaje
                                    </ButtonPrimary>
                                </div>
                            </TabSlider>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col-reverse xxs:flex-row ${editMode ? "justify-between" : "justify-end"} gap-4 mt-4`}>
                    {editMode && (
                        <ButtonPrimary disabled={loadingDeleteBiography || loadingBiography} onClick={handleDeleteBiography} type="button" className="bg-red-500 flex text-center justify-center items-center gap-2 w-full xxs:w-fit border-red-500">
                            {loadingDeleteBiography ? (
                                <>
                                    <CircularProgress size={20} color="inherit" />
                                    <span>Elimando</span>
                                </>
                            ) : (
                                <span >Eliminar</span>
                            )}
                        </ButtonPrimary>
                    )}
                    <div className="flex flex-col xxs:flex-row gap-4">
                        <ButtonPrimary disabled={loadingDeleteBiography || loadingBiography} className="flex text-center justify-center items-center gap-2">
                            {loadingBiography ? (
                                <>
                                    <CircularProgress size={20} color="inherit" />
                                    <span>Guardando</span>
                                </>
                            ) : (
                                <span >Guardar</span>
                            )}
                        </ButtonPrimary>
                        <ButtonOutline type="button" onClick={() => {
                            if(changes){
                                alert("No has guardado los cambios")
                            }else{
                                router.push("/dashboard/biographies")
                            }
                            }} disabled={loadingDeleteBiography || loadingBiography}>
                            Cancelar
                        </ButtonOutline>
                    </div>
                </div>
            </form>
        </Card>
    );
};

export default CreateBiographyPage;
