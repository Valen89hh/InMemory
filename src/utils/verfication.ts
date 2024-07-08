import { User } from "@/lib/models/user-model";

export const isCompleteAdressUser = (user: User)=>{
    if(user.country && user.state && user.district && 
        user.province && user.address && user.dni && user.appellidoPaterno && user.appellidoMaterno){
        return true
    }

    return false
}