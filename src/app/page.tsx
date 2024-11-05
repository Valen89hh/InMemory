"use client"

import ButtonPrimary from "@/components/buttons/button-primary";
import ButtonSecondary from "@/components/buttons/button-secondary";
import Card from "@/components/cards/card";
import Container from "@/components/containers/container";
import Carousel from "@/components/sliders/caroulsel";
import Image from "next/image";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";

export default function Home() {

    useEffect(()=>{
        AOS.init()
    }, [])

  return (
    <>
        <Hero/>
        <WhatsInMemory/>
        <HowItWork/>
        <Banner/>
        <Testimonios/>
    </>
  );
}


const Hero = ()=>{
  return(
    <section className="w-full h-screen relative mb-[8rem]">
        <Image
            alt="hero"
            src={"/img/hero.png"}
            width={1366}
            height={827}
            className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex justify-center items-center flex-col bg-[#0000005c]">
            <h2 data-aos="fade-up" className="text-[2.5rem]  sm:text-[4rem] text-white text-center">REMEMBERING FOREVER</h2>
            <p data-aos="fade-up" className="text-[1rem] w-3/4 sm:text-[1.4rem] mb-4 text-white text-center">Crea un tributo duradero con biografías, fotografías y 
            vídeos personalizados.</p>
            <Link href={"/dashboard/biographies/create"}>
                <ButtonPrimary data-aos="fade-up">
                    Crear Tributo
                </ButtonPrimary>
            </Link>
        </div>
    </section>
  )
}

const WhatsInMemory = ()=>{
    return (
        <Container className="mb-[8rem] overflow-hidden">
            <section className="flex flex-col md:flex-row  justify-between items-center gap-[4rem]">
                <article data-aos="fade-right" className="w-full md:w-[40%]">
                    <h3 className="text-[1.6rem] text-primary">¿QU&Eacute; ES InMemory</h3>
                    <p className="text-black text-[1.1rem]">InMemory es una plataforma dedicada a 
    honrar los recuerdos de los seres queridos 
    mediante la creación de tributos interactivos 
    y duraderos. Nuestra misión es ayudarlo a 
    preservar y compartir las historias de vida de
    quienes fallecieron, asegurando que su legado 
    perdure para siempre.</p>

                </article>
                <Image
                    data-aos="fade-left"
                    alt="whats is InMemory"
                    src={"/img/whats.png"}
                    width={613}
                    height={508}
                    className="w-full sm:w-3/4 md:w-2/4 object-cover max-w-[35rem]"
                />
            </section>
        </Container>
    )
}


//How it work?
const HowItWork = ()=>{
    return (
        <Container className="mb-[8rem]">
            <section className="flex space-y-4 justify-center flex-col items-center">
                <h3 data-aos="fade-up" className="text-[1.6rem] text-primary">COMO FUNCIONA</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CardCaracteristica
                        icono={
                            <Image
                                alt="account"
                                src={"/icons/account.svg"}
                                width={86}
                                height={82}
                            />
                        }

                        text="Crea una cuenta"
                    />
                    <CardCaracteristica
                        icono={
                            <Image
                                alt="book"
                                src={"/icons/book.svg"}
                                width={88}
                                height={55}
                            />
                        }

                        text="Agrega la biografia, fotos y videos"
                    />
                    <CardCaracteristica
                        icono={
                            <Image
                                alt="qr"
                                src={"/icons/qr.svg"}
                                width={71}
                                height={63}
                            />
                        }

                        text="Genera y ordena tu placa QR"
                    />
                </div>
            </section>
        </Container>
    )
}

const CardCaracteristica = ({
    icono,
    text
}: {icono: React.ReactNode, text: string})=>{
    return (
        <Card data-aos="fade-up" className="flex   flex-col justify-center items-center gap-4">
            <div className="h-[8rem] w-[8rem] bg-primary rounded-full flex justify-center items-center">
                {icono}
            </div>
            <p className="text-[1.4rem] text-center text-gray-dark">{text}</p>
        </Card>
    )
}

const Banner = ()=>{
    return (
        <section data-aos="fade-up" className="bg-primary mb-[8rem] overflow-hidden">
            <Container className="flex flex-col md:flex-row justify-between items-center py-[4rem]">
                <div data-aos="fade-right" className="space-y-2 w-full md:w-2/4">
                    <h2 className="text-[4rem] leading-[4.5rem] text-white">¡Crea tu tributo hoy d&iacute;a!</h2>
                    <p className="text-white text-md">Crear un homenaje para un ser querido hoy ayuda a preservar 
                    su memoria, reuniendo a familiares y amigos para celebrar su vida.</p>
                    <Link href={"/dashboard/biographies/create"}>
                        <ButtonSecondary>
                            Crear tributo
                        </ButtonSecondary>
                    </Link>
                </div>
                <Image 
                    data-aos="fade-left"
                    alt="phone"
                    src={"/img/phone.png"}
                    width={318}
                    height={391}
                />
            </Container>
        </section>
    )
}


// Testimonios
const Testimonios = ()=>{
    return (
        <Container className="mb-[8rem]">
            <h3 data-aos="fade-up" className="text-[1.6rem] mb-4 text-primary text-center">TESTIMONIOS</h3>
            <section data-aos="fade-up" className="px-6">
                <Carousel>
                    <CardTestimonio
                        img="/img/testimonio1.jpg"
                        name="Marita .M"
                        mensaje="InMemory nos ha dado la oportunidad de mantener viva la memoria de mi abuelo. La biografía virtual y la placa QR nos permiten revivir sus historias y compartirlas con toda la familia. Es un homenaje lleno de amor y respeto."
                        starts={4}
                    />
                    <CardTestimonio
                        img="/img/testimonio2.jpg"
                        name="Raquel .V"
                        mensaje="Gracias a InMemory, mis hijos pueden conocer a su abuela a través de fotos y anécdotas. La biografía es un recuerdo invaluable que podemos llevar siempre con nosotros. ¡Recomiendo este servicio a quienes deseen honrar a sus seres queridos!"
                        starts={4}
                    />
                    <CardTestimonio
                        img="/img/testimonio3.png"
                        name="Renzo .M"
                        mensaje="Crear un tributo para mi hermana en InMemory fue fácil y emotivo. La plataforma es intuitiva, y el equipo siempre fue atento. Gracias a esto, amigos y familiares pueden recordar su vida sin importar la distancia."
                        starts={4}
                    />
                </Carousel>
            </section>
        </Container>
    )
}

const CardTestimonio = ({
    img,
    name,
    mensaje,
    starts
}: {
    img: string,
    name: string,
    mensaje: string,
    starts: number
})=>{
    return (
        <div className="h-max">
            <Card className="flex h-max gap-3 mx-2 flex-col justify-center items-center" style={{display: "flex"}}>
                <Image
                    alt="user"
                    src={img}
                    width={100}
                    height={100}
                    className="rounded-full object-cover h-[4rem] w-[4rem]"
                />
                <div className="flex items-center justify-center w-full">
                    <div className="h-[1px] rounded-md bg-gray-dark w-full"></div>
                    <h3 className="text-gray-dark w-[20rem] text-center">{name}</h3>
                    <div className="h-[1px] rounded-md bg-gray-dark w-full"></div>
                </div>

                <p className="uppercase text-center text-[#151515a9]">"{mensaje}"</p>

                <div className="flex gap-2">
                    {Array.from({length: 5}, (_, index)=>{
                        if(index < starts){
                            return (
                                <svg key={index+"rellana"} width="20" height="18" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 0L24.4903 13.8197H39.0211L27.2654 22.3607L31.7557 36.1803L20 27.6393L8.2443 36.1803L12.7346 22.3607L0.97887 13.8197H15.5097L20 0Z" fill="#FFD700"/>
                                </svg>
                            )
                        }else{
                            return <svg key={index+"vacia"} width="20" height="18" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 3.23607L23.5392 14.1287L23.7637 14.8197H24.4903H35.9434L26.6776 21.5517L26.0899 21.9787L26.3144 22.6697L29.8536 33.5623L20.5878 26.8303L20 26.4033L19.4122 26.8303L10.1464 33.5623L13.6856 22.6697L13.9101 21.9787L13.3224 21.5517L4.05655 14.8197H15.5097H16.2363L16.4608 14.1287L20 3.23607Z" stroke="#FFD700" strokeWidth="2"/>
                            </svg>
                        }
                    })}
                </div>
            </Card>
        </div>
    )
}
