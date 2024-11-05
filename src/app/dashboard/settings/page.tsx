"use client"

import Card from "@/components/cards/card";
import CircularProgress from '@mui/material/CircularProgress';
import SettingUser from "@/features/settings/components/setting-user";
import { useProfileState } from "@/lib/storage/auth-storage";


const SettingsPage = () => {
    const {profile, loadingProfile} = useProfileState()

    if(loadingProfile) return <Card className="w-full gap-2 h-[40rem] flex flex-col justify-center items-center">
        <CircularProgress color="inherit" className="text-primary"/>
        <h2>Obteniendo perfil</h2>
    </Card>

    if(!profile) return <Card className="w-full h-[40rem] flex flex-col justify-center items-center">
        <h2 className="text-red-500">Perfil de usuario no existe</h2>
    </Card>

    return ( 
        <SettingUser profile={profile}/>
     );
}
 
export default SettingsPage;