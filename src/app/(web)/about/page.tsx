import Container from "@/components/containers/container";
import TabSlider from "@/components/sliders/tab-slider";
import Image from "next/image";

const AboutPage = () => {
    return ( 
        <Container className="py-[8rem]">
            <main className="w-full space-y-6">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-primary text-center text-[2.5rem] xs:text-[3rem] uppercase">About Us</h2>
                    <h3 className="text-black text-center text-[1.7rem]">Preservando recuerdos, honrando vidas</h3>
                    <p className="text-black text-center w-3/4 md:w-1/2 text-[1rem]">InMemory se dedica a ayudar a las familias a preservar el legado de sus 
                    seres queridos a través de tributos hermosos y duraderos.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <Image
                        alt="about us"
                        src={"/img/about.jpg"}
                        width={6240}
                        height={4160}
                        className="w-full md:w-[60%] h-[20rem] max-w-none  md:max-w-[30rem] object-cover"
                    />

                    <div className="w-full md:w-[50%]">
                        <TabSlider
                            tabs={["Misión", "Visión"]}
                        >
                            <p>Proveer una plataforma intuitiva y accesible donde las familias puedan crear y compartir tributos duraderos para sus seres queridos. En InMemory, nos comprometemos a preservar las memorias y legados de quienes han partido, ofreciendo herramientas digitales que permiten narrar sus historias de vida a través de biografías detalladas, galerías de fotos y videos, y códigos QR personalizados. Nuestra misión es facilitar la conexión emocional entre amigos y familiares, brindando un espacio donde los recuerdos puedan ser celebrados y honrados de manera significativa.</p>
                            <p>En InMemory, imaginamos un mundo donde las memorias perduran más allá de la vida misma. Nuestra visión es ser la plataforma líder que permite a las familias crear y compartir tributos digitales personalizados para sus seres queridos. Nos comprometemos a preservar y honrar los legados de aquellos que han partido, proporcionando herramientas digitales intuitivas que facilitan la narración detallada de sus historias de vida a través de biografías ricas en contenido, galerías multimedia y códigos QR personalizados. Al hacerlo, aspiramos a fortalecer los lazos emocionales entre amigos y familiares, ofreciendo un espacio seguro y conmovedor donde los recuerdos puedan ser celebrados y compartidos de manera significativa.</p>
                        </TabSlider>
                    </div>
                </div>
            </main>
        </Container>
     );
}
 
export default AboutPage;