"use client"

import { Biography } from "@/lib/models/biography-model";
import { CircularProgress } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { formatDataToString } from "@/utils/formater-date";
import { BiographyForView } from "@/lib/supabase/models";
import { useViewBiography } from "../hooks/use-view-biography";
import Logo from "@/components/logo";
import Container from "@/components/containers/container";
import TabSlider from "@/components/sliders/tabs";
import VideosBiography from "./videos-biography";
import RenderBiographyContent from "./render-biography-content";
import PhotosBiography from "./photos-biography";
import { motion } from "framer-motion";
import { usePreviewBiography } from "../hooks/use-preview-biography";

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

const PreviewBiography = ({bioId}: {bioId: string}) => {
    const {biography, loadingBio, errorMessage} = usePreviewBiography(bioId)
    
    return <>
        {loadingBio ? (
            <Container className="flex min-h-screen items-center justify-center ">
                <motion.div 
                    animate={{
                        scale: [1, 1.2, 1], // Escala de aumento y reducción
                    }}
                    transition={{
                        duration: 1.5,       // Duración de cada ciclo de la animación
                        repeat: Infinity,    // Repetir indefinidamente
                        repeatType: "loop",  // Tipo de repetición (ciclo continuo)
                    }}
                    className="bg-primary rounded-full h-20 w-20 inline-flex items-center justify-center">
                    <motion.div
                        animate={{
                            rotate: [0, 360],  // Rotación continua
                            opacity: [0.8, 1], // Pulsación de opacidad
                        }}
                        transition={{
                            duration: 3,        // Duración más lenta para la rotación y opacidad
                            ease: "linear",     // Rotación uniforme
                            repeat: Infinity,
                        }}
                        className="flex justify-center flex-col items-center gap-2 w-fit"
                    >
                        <motion.svg 
                            width={50} 
                            height={50} 
                            viewBox="0 0 209 108" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            animate={{
                                scale: [1, 1.05, 1], // Leve pulso en el SVG
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                repeatType: "mirror",
                        }}>
                            <path d="M151.177 52.8046C151.261 51.8445 151.345 50.8844 151.345 49.9243V0C132.238 10.6409 115.31 13.7612 103.997 29.2025C92.6002 13.7612 75.6724 10.7209 56.5658 0V49.9243C56.5658 50.8044 56.6496 51.7645 56.7334 52.6446C34.6937 50.4044 21.7045 62.4054 0 71.2062L41.9006 101.049C58.6608 112.97 87.237 109.369 103.159 90.7279H103.913H105.841C121.763 109.449 150.339 113.05 167.099 101.049L209 71.2062C187.044 62.2454 173.971 50.0043 151.177 52.8046ZM137.685 14.8013C139.696 13.9212 141.708 12.9611 143.803 12.001V50.0043C143.803 51.4445 143.635 52.8846 143.384 54.4047C141.624 54.8848 139.78 55.3648 137.937 56.0049C131.903 58.005 126.121 61.0453 120.757 64.8856C118.579 66.4858 116.484 68.1659 114.556 69.9261C114.724 67.9259 114.891 66.0057 114.891 63.9255C114.891 58.5651 110.617 43.3638 108.103 36.5632C114.891 25.1222 124.528 20.7218 137.685 14.8013ZM100.645 63.8455C100.645 58.005 101.483 52.4845 103.159 47.6041C103.243 47.2841 103.411 46.9641 103.494 46.644C105.422 53.1246 107.349 60.8853 107.349 63.9255C107.349 69.8461 106.427 75.6866 104.5 81.207C103.913 80.327 103.327 79.5269 102.656 78.7268C101.316 73.8464 100.645 68.886 100.645 63.8455ZM96.1199 82.8072C82.8793 80.327 72.4042 71.9262 67.3761 62.3254C67.8789 62.4854 68.2979 62.6454 68.8007 62.8054C73.9126 64.4856 79.0245 67.1258 83.9687 70.6461C88.494 73.9264 92.5164 77.6867 95.8685 81.9271C95.8685 82.1671 95.9523 82.4871 96.1199 82.8072ZM140.283 62.7254C135.255 71.9262 125.283 80.0069 112.713 82.5672C116.232 78.0068 120.338 73.9264 125.199 70.4861C130.143 67.0458 135.171 64.4856 140.283 62.7254ZM64.1079 49.9243V12.001C66.2029 12.9611 68.2141 13.8412 70.2253 14.8013C83.2983 20.7218 92.8516 25.0422 99.7233 36.3231C98.3825 39.0434 97.0417 42.0836 95.9523 45.4439C94.0249 51.2844 93.1031 57.445 93.1031 63.9255C93.1031 65.5257 93.1868 67.1258 93.2706 68.726C91.7622 67.3658 90.0862 66.0857 88.4102 64.8856C83.0469 61.0453 77.2646 58.005 71.231 56.0049C68.8845 55.2048 66.6219 54.6447 64.5269 54.0847C64.2755 52.6446 64.1079 51.2844 64.1079 49.9243ZM46.4258 95.2883L14.5814 72.5663C16.5926 71.5262 18.6038 70.5661 20.5313 69.606C33.9395 62.8054 43.6604 57.925 58.2418 60.1652C62.9346 74.0864 76.678 86.2475 93.9411 89.7678C79.8625 102.729 58.4094 103.849 46.4258 95.2883ZM162.742 95.2883C150.758 103.849 129.054 102.649 114.975 89.5278C131.652 85.8474 144.976 73.9264 149.585 60.4052C164.921 57.605 174.809 62.6454 188.636 69.686C190.564 70.6461 192.575 71.6862 194.586 72.6463L162.742 95.2883Z" fill={"#fff"}/>
                        </motion.svg>
                    </motion.div>
                </motion.div>
            </Container>
        ): biography ? (
            <Container className="min-h-screen overflow-y-auto overflow-x-hidden">
            {/* Logo Section */}
            <motion.div
                className="sm:h-[15vh] h-[10vh] flex items-center justify-center"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <Logo className="mx-auto mb-2" />
            </motion.div>

            {/* Main Content */}
            <motion.main
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                initial="hidden"
                animate="visible"
                variants={slideIn}
            >
                {/* Image with Animation */}
                <motion.div className="" initial="hidden" animate="visible" variants={fadeIn}>
                    <Image 
                        alt={biography.name_person}
                        src={biography.photo_person}
                        width={860}
                        height={1000}
                        className="w-full sticky top-10 max-h-[40rem] object-cover rounded-lg shadow-2xl transition-all duration-300 ease-in-out hover:shadow-[0_15px_25px_rgba(0,0,0,0.4)] hover:scale-105"
                    />
                </motion.div>

                {/* Biography Details */}
                <motion.div
                    className="w-full mb-4 space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={slideIn}
                >
                    <h1 className="uppercase text-center text-primary text-3xl  sm:text-4xl">{biography.name_person}</h1>
                    <div className="flex mb-2 items-center gap-2 text-gray-dark">
                        <div className="h-[2px] hidden sm:block bg-gray-light w-[90%]"></div>
                        <h4 className="w-[45rem] md:w-full text-center">{formatDataToString(new Date(biography.date_of_birth))}</h4>
                        <span>-</span>
                        <h4 className="w-[45rem] md:w-full text-center">{formatDataToString(new Date(biography.date_of_death))}</h4>
                        <div className="h-[2px] hidden sm:block bg-gray-light w-[90%]"></div>
                    </div>

                    {/* Tab Slider with animated entry */}
                    <TabSlider tabs={["Biografía", "Fotos", "Videos", "Mensajes"]}>
                        <motion.div
                            className="text-gray-dark space-y-4"
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                        >
                            <RenderBiographyContent htmlContent={biography.descrption} />
                            <h3 className="text-lg w-3/4 mx-auto text-center uppercase">"{biography.main_message}"</h3>
                        </motion.div>

                        <PhotosBiography initialPhotos={biography.photos} />
                        <VideosBiography initialVideos={biography.videos} />

                        <div>
                            {biography.messages.length > 0 ? (
                                <ul>
                                    {biography.messages.map((msg, i) => (
                                        <li
                                            className="mx-auto text-center w-3/4 border-b-2 border-gray-light py-4"
                                            key={biography.id + msg}
                                        >
                                            <h3 className="uppercase text-gray-dark">"{msg.message_text}"</h3>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="h-[25rem] flex justify-center items-center">
                                    <span>Sin Mensajes</span>
                                </div>
                            )}
                        </div>
                    </TabSlider>
                </motion.div>
            </motion.main>
        </Container>
        ): errorMessage && (
            <Container className="min-h-screen flex justify-center items-center">
                <p className="text-red-500">{errorMessage}</p>
            </Container>
        )}
    </>
}
 
export default PreviewBiography;