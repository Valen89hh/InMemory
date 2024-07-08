import Image from "next/image";
import Card from "./cards/card";
import Link from "next/link";
import BookIcon from "./icons/book-icon";
import AddIcon from "./icons/add-icon";
import PayIcon from "./icons/pay-icon";
import SettingIcon from "./icons/setting-icon";
import { User } from "@/lib/models/user-model";
import { Badge } from "@mui/material";

const SideBarUsers = ({user}: {user: User}) => {
    return ( 
        <Card className="mx-auto relative md:sticky md:top-[6rem] left-0 w-[15rem] h-fit">
            <aside>
                <div className="flex gap-2 mb-6 justify-center items-center flex-col">
                    <Image
                        alt={user.displayName ?? "user"}
                        src={user.photoURL ?? ""}
                        width={4000}
                        height={4000}
                        className="h-[5rem] w-[5rem] object-cover rounded-full"
                    />

                    <h2 className="text-center">{user.displayName}</h2>
                </div>

                <nav>
                    <ul className="space-y-4 text-sm">
                        <li>
                            <Link className="flex items-center gap-2" href={"/dashboard/biographies"}>
                                <BookIcon width={18} height={18} color="#000"/>
                                Mis Biografias
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center gap-2" href={"/dashboard/biographies/create"}>
                                <AddIcon width={18} height={18} color="#000"/>
                                Crear Biografia
                            </Link>
                        </li>
                        <li>
                            <Badge badgeContent={0} color="primary">
                                <Link className="flex items-center gap-2" href={"/dashboard/payments"}>
                                    <PayIcon width={18} height={18} color="#000"/>
                                    Ordenes y Pagos
                                </Link>
                            </Badge>
                        </li>
                        <li>
                            <Link className="flex items-center gap-2" href={"/dashboard/settings"}>
                                <SettingIcon width={18} height={18} color="#000"/>
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