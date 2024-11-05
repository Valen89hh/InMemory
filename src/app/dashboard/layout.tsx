import Container from "@/components/containers/container";
import SideBarUsers from "@/components/side-bar-users";
import ModalExitChange from "@/features/biographies/components/modal-exit-change";
import ModalShareQr from "@/features/biographies/components/modal-share-qr";

const LayoutDashboard = ({children}: {children: React.ReactNode}) => {
    
    return ( 
        <Container>
            <main className="py-[8rem] flex flex-col md:flex-row gap-4">
                <SideBarUsers/>
                <div className="w-full">
                    {children}
                </div>
            </main>
            <ModalExitChange/>
            <ModalShareQr/>
        </Container>
     );
}
 
export default LayoutDashboard;