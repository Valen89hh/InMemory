"use client"

import { getBiographyById } from "@/lib/firebase";
import { Biography } from "@/lib/models/biography-model";
import { CircularProgress } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import Logo from "./logo";
import Image from "next/image";
import { formatDataToString } from "@/utils/formater-date";
import TabSlider from "./sliders/tabs";
import VideoGallery from "./galleries.tsx/video-gallery";
import CarouselVideo from "./sliders/carousel-video";
import ImageGallery from "./galleries.tsx/image-gallery";
import CarouselImage from "./sliders/carouse-image";
import Container from "./containers/container";

const BiographyView = ({bioId, protectedPay=false}: {bioId: string, protectedPay?: boolean}) => {
    const [biography, setBiography] = useState<Biography>()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        async function startGetBio(){
            setLoading(true)
            const res = await getBiographyById(bioId)
            if(res.biography) setBiography(res.biography)
            setLoading(false)
        }
        startGetBio()
    }, [])
    
    
    if(loading){
        return <section className="w-screen h-screen flex justify-center items-center">
            <CircularProgress color="primary"/>
        </section>
    }

    if(!biography){
        return <section className="w-screen h-screen flex justify-center items-center">
            No existe la biograf&iacute;
        </section>
    }

    if(biography.statusPayment !== "pagado" && protectedPay){
        return <section className="w-screen h-screen flex justify-center items-center">
            La biograf&iacute;a no esta pagada
        </section>
    }

    
    return <Container className="flex  md:h-screen flex-col justify-center ">
        <Logo className="mx-auto mb-2"/>
        <main className="flex flex-col md:flex-row gap-4">
            <Image 
                alt={biography.name}
                src={biography.photoPerson}
                width={860}
                height={1000}
                className="w-full md:w-[50%] max-h-[40rem] object-cover shadow-lg"
            />

            <div className="w-full mb-4">
                <h2 className="text-[2rem] uppercase text-primary text-center">{biography.name}</h2>
                <div className="flex mb-2 items-center gap-2 text-gray-dark">
                    <div className="h-[2px] bg-gray-light w-[90%]"></div>
                    <h4 className="w-[45rem] md:w-full text-center">{formatDataToString(biography.dateOfBirth)}</h4>
                    <span>-</span>
                    <h4 className="w-[45rem]  md:w-full text-center">{formatDataToString(biography.dateOfDeath)}</h4>
                    <div className="h-[2px] bg-gray-light w-[90%]"></div>
                </div>
                <TabSlider tabs={["Biografía", "Fotos", "Videos", "Mensajes"]}>
                    <div className="text-gray-dark">
                        <p className="text-lg border-b-2 border-gray-light pb-2 mb-2">{biography.biographyDescription}</p>
                        <h3 className="text-lg w-3/4 mx-auto  text-center uppercase">"{biography.mainMessage}"</h3>
                    </div>
                    <div>
                        {biography.photos.length > 0 ? (
                            <>
                                <ImageGallery  className="hidden xl:block" images={biography.photos} onSelectImage={()=>{}} />
                                <CarouselImage  className="xl:hidden" images={biography.photos} />
                            </>
                        ): (
                            <div className="h-[25rem] flex justify-center items-center">
                                <span>Sin Fotos</span>
                            </div>
                        )}
                    </div>
                    <div>
                        {biography.videos.length > 0 ? (
                            <>
                                <VideoGallery className="hidden xl:block" videos={biography.videos} onSelectVideo={() => { }} />
                                <CarouselVideo  className="xl:hidden" videos={biography.videos} />
                            </>
                        ): (
                            <div className="h-[25rem] flex justify-center items-center">
                                <span>Sin Videos</span>
                            </div>
                        )}
                    </div>
                    <div>
                        {biography.messages.length > 0 ? (
                            <ul>
                                {biography.messages.map((msg, i)=>(
                                    <li className="mx-auto text-center  w-3/4 border-b-2 border-gray-light py-4" key={biography.id+msg}>
                                        <h3 className="uppercase text-gray-dark" >"{msg}"</h3>
                                    </li>
                                ))}
                            </ul>
                        ): (
                            <div className="h-[25rem] flex justify-center items-center">
                                <span>Sin Mensajes</span>
                            </div>
                        )}
                        
                    </div>
                </TabSlider>
            </div>
        </main>
    </Container>
}
 
export default BiographyView;