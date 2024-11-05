import Container from "@/components/containers/container";

const PrivacyPage = () => {
    return ( 
        <Container className="py-[6rem]">
        <h1 className="text-3xl font-bold text-primary mb-6">Política de Privacidad</h1>
        
        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Introducción</h2>
            <p className="text-gray-700">
            En <span className="font-semibold">InMemory</span>, nos comprometemos a proteger y respetar tu privacidad. Esta política de privacidad explica cómo recopilamos, usamos, compartimos y protegemos tus datos personales cuando visitas nuestro sitio web <a href="https://inmemory.pe" className="underline text-primary">inmemory.pe</a>, así como tus derechos relacionados con esta información.
            </p>
        </section>
        
        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">2. Información que Recopilamos</h2>
            <h3 className="text-lg font-semibold mb-2">A. Información que nos proporcionas directamente:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><span className="font-semibold">Datos de Registro:</span> nombre, correo electrónico y otra información necesaria para crear tu cuenta.</li>
            <li><span className="font-semibold">Contenido de Biografías:</span> información y recuerdos que decides subir sobre tus seres queridos.</li>
            <li><span className="font-semibold">Datos de Pago:</span> información para procesar los pagos de manera segura.</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2">B. Información que recopilamos automáticamente:</h3>
            <ul className="list-disc list-inside text-gray-700">
            <li><span className="font-semibold">Datos de Uso:</span> cómo navegas y usas nuestro sitio web.</li>
            <li><span className="font-semibold">Cookies y Tecnologías de Seguimiento:</span> para mejorar la experiencia del usuario y personalizar el contenido.</li>
            </ul>
        </section>
        
        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">3. Uso de la Información</h2>
            <p className="text-gray-700">
            Usamos la información que recopilamos para proveer y mejorar nuestros servicios, procesar transacciones, enviar notificaciones, personalizar la experiencia del usuario, y cumplir con obligaciones legales.
            </p>
        </section>
        
        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Compartición de Información</h2>
            <p className="text-gray-700">
            No vendemos ni compartimos tus datos personales, salvo con proveedores de servicios de confianza y para cumplir con obligaciones legales.
            </p>
        </section>
        
        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">5. Seguridad de la Información</h2>
            <p className="text-gray-700">
            Aplicamos medidas para proteger tus datos, aunque ningún sistema es completamente infalible.
            </p>
        </section>
        
        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Derechos del Usuario</h2>
            <p className="text-gray-700">
            Tienes derecho a acceder, corregir, eliminar y limitar el procesamiento de tus datos. Para ejercer estos derechos, contáctanos en el correo o número indicados.
            </p>
        </section>
        
        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Retención de los Datos</h2>
            <p className="text-gray-700">
            Conservamos tus datos solo el tiempo necesario para cumplir con los fines para los que fueron recopilados o según lo exijan las leyes.
            </p>
        </section>
        
        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Cambios en la Política de Privacidad</h2>
            <p className="text-gray-700">
            Podemos actualizar esta política y te notificaremos sobre cambios significativos publicándolos en nuestro sitio web.
            </p>
        </section>
        
        <section className="mb-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">9. Contacto</h2>
            <p className="text-gray-700">
            Si tienes alguna pregunta, contáctanos en:
            </p>
            <p className="text-gray-700 mt-2">
            Correo electrónico: <a href="mailto:contacto@inmemory.pe" className="text-primary underline">contacto@inmemory.pe</a><br />
            Teléfono: <a href="tel:+51993672965" className="text-primary underline">+51 993 672 965</a>
            </p>
        </section>
    </Container>
     );
}
 
export default PrivacyPage;