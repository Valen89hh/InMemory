"use client"

import Container from "@/components/containers/container";
import Logo from "@/components/logo";
import Link from "next/link";
import ButtonSecondary from "@/components/buttons/button-secondary";
import Whatsapp from "@/components/icons/whatsapp";
import Facebook from "@/components/icons/facebook";
import Instagram from "@/components/icons/instagram";
import { usePathname } from "next/navigation";
import { ROUTES_NOT_LAYOUT } from "@/lib/routes/layout";

const Footer = () => {
    const pathName = usePathname()

    if(ROUTES_NOT_LAYOUT.some(route=>pathName.startsWith(route))) return null

    return ( 
        <footer className="bg-primary">
            <Container>
                <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-[2rem] sm:justify-between  py-[4rem]">
                    <div className="text-white text-center sm:text-start">
                        <Logo color="#fff"/>
                        <h3>+51 993 672 965</h3>
                        <h3>contacto@inmemory.pe</h3>
                    </div>
                    <div className="text-white space-y-4 text-center md:text-start">
                        <h4 className="underline text-lg">Links</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li>
                                <Link href={"/"}>Home</Link>
                            </li>
                            <li className="md:ml-4">
                                <Link href={"/about"}>About</Link>
                            </li>
                            <li>
                                <Link href={"/contact"}>Contact</Link>
                            </li>
                            <li className="md:ml-4">
                                <Link href={"/privacy"}>Privacy</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="">
                        <h2 className="underline text-center sm:text-start text-lg text-white mb-2">Empezar</h2>
                        
                        <Link href={"/dashboard/biographies/create"}>
                            <ButtonSecondary className="w-fit">
                                Crear tributo
                            </ButtonSecondary>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col xs:flex-row gap-4 py-4 justify-between items-center border-t-2 border-solid border-white">
                    <div className="flex gap-3">
                        <Link className="p-1 border-solid border-white border-2 rounded-full" href={"https://ohafd"}>
                            <Whatsapp width={20} height={20}/>
                        </Link>
                        <Link className="p-1 border-solid border-white border-2 rounded-full" href={"https://www.facebook.com/share/rNUXp3qYhKKCPrXZ/?mibextid=qi2Omg"}>
                            <Facebook width={20} height={20}/>
                        </Link>
                        <Link className="p-1 border-solid border-white border-2 rounded-full" href={"https://ohafd"}>
                            <Instagram width={20} height={20}/>
                        </Link>
                    </div>

                    <p className="text-white text-sm">© {new Date().getFullYear()} InMemory. All rights reserved.</p>
                </div>
            </Container>
        </footer>
     );
}
 
export default Footer;