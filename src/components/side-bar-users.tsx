"use client"

import Image from "next/image";
import Card from "./cards/card";
import Link from "next/link";
import { useProfileState } from "@/lib/storage/auth-storage";
import CardAnimation from "./animations/card-animation";
import { Newspaper, NotebookText, Settings, ShoppingBasket } from "lucide-react";
import BadgeAlertOrders from "@/features/badge-alert/components/badge-alert-orders";

const SideBarUsers = () => {
    const {profile, loadingProfile} = useProfileState()

    return ( 
        <Card className="mx-auto relative md:sticky md:top-[6rem] left-0 w-[15rem] h-fit">
            <aside>
                <div className="flex gap-2 mb-6 justify-center items-center flex-col">
                    {(loadingProfile) ? (
                        <>
                            <CardAnimation className="rounded-full w-[5rem] h-[5rem]"/>
                            <CardAnimation className="w-full h-5"/>
                        </>
                    ): profile && (
                        <>
                            <Image
                                alt={profile.first_name}
                                src={profile.avatar_url ?? "/icons/user-none.svg"}
                                width={4000}
                                height={4000}
                                className="h-[5rem] w-[5rem] object-cover rounded-full"
                            />

                            <h2 className="text-center">{profile.first_name + (profile.last_name ?? "")}</h2>
                        </>

                    )}
                </div>

                <nav>
                    <ul className="space-y-4 text-sm">
                        <li>
                            <Link className="flex items-center gap-2 hover:underline" href={"/dashboard/biographies"}>
                                <Newspaper className="text-ash-gray" size={20}/>
                                Mis Biografías
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center justify-between hover:underline" href={"/dashboard/orders"}>
                                <div className="flex items-center gap-2">
                                    <ShoppingBasket className="text-ash-gray" size={20}/>
                                    Órdenes
                                </div>
                                <BadgeAlertOrders/>
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center gap-2 hover:underline" href={"/dashboard/biographies/create"}>
                                <NotebookText className="text-ash-gray" size={20}/>
                                Crear Biografía
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center gap-2 hover:underline" href={"/dashboard/settings"}>
                                <Settings className="text-ash-gray" size={20}/>
                                Configuraci&oacute;n
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </Card>
     );
}
 
export default SideBarUsers;