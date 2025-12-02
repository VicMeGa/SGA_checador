import { useState } from "react";
import { Fingerprint, QrCode } from "lucide-react";
import QrScanner from "./QrScanner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import HuellaSimulada from "./HuellaSimulada"; // Ya no se usa si es simulación directa

const Botones = ({ salaSeleccionada }) => {
    const [mostrarScanner, setMostrarScanner] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [fingerprintData, setFingerprintData] = useState(null);

    const back = import.meta.env.VITE_BACKEND_URL;

    const registrarHuellaBack = async (imagenBase64) => {
        try {
            await fetch(`${back}/acceso/registrarHuella`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    huella: imagenBase64,
                    idSala: salaSeleccionada
                })
            });
            toast.success("Acceso registrado exitosamente");
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const registraraccesoQr = async (tipo, codigo) => {
        try {
                const response = await fetch(`${back}/acceso/registrar`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tipoAcceso: tipo,
                        codigoQr: codigo,
                        idSala: salaSeleccionada,
                }),
            });

            const resultado = await response.text();
            //setMensaje(resultado);
            toast.success("Acceso registrado exitosamente");
        } catch (error) {
            //setMensaje("❌ Error al registrar acceso.");
            toast.error(`Error: ${error.message}`);
            console.error(error);
        } finally {
            setTimeout(() => setMensaje(""), 5000);
            setMostrarScanner(false);
        }
    };
        
    const captureFingerprint = async () => {
        try {
            const response = await fetch("http://localhost:5000/capturar");
            if (!response.ok) throw new Error("Error al capturar huella");

            const data = await response.json(); // { image_b64 }
            const imageBase64 = `data:image/png;base64,${data.image_b64}`;

            setFingerprintData({
                id: `fp_${Date.now()}`,
                image: imageBase64,
                timestamp: new Date().toISOString(),
            });
            toast.success("Huella capturada exitosamente");
            return imageBase64;
        } catch (error) {
            console.error(error);
            toast.error(`Error al capturar huella: ${error.message}`);
            throw error;
        }
    };
    
    const registrarAcceso = async (tipo, codigo) => {
        let codigoFinal = codigo;
        
        // Si es huella, la capturamos REAL
        if (tipo === "Huella") {
            const huella = await captureFingerprint();
            await registrarHuellaBack(huella);
        } else{
            await registraraccesoQr(tipo, codigo);
        }
    };

    return (
        <>
            <div className="text-center">
                <button
                    onClick={() => registrarAcceso("Huella")}
                    disabled={!salaSeleccionada}
                    title={!salaSeleccionada ? "Selecciona una sala primero" : ""}
                >
                    <Fingerprint className="icon" />
                </button>
            </div>

            <div className="text-center">
                <button
                    onClick={() => setMostrarScanner(true)}
                    disabled={!salaSeleccionada}
                    title={!salaSeleccionada ? "Selecciona una sala primero" : ""}
                >
                    <QrCode className="icon" />
                </button>
            </div>

            {mostrarScanner && (
                <QrScanner
                    onScanSuccess={(codigoQr) => registrarAcceso("QR", codigoQr)}
                    onClose={() => setMostrarScanner(false)}
                />
            )}

            {mensaje && (
                <div style={{ textAlign: "center", marginTop: "10px", color: mensaje.startsWith("✅") ? "green" : "red" }}>
                    {mensaje}
                </div>
            )}
        </>
    );
};

export default Botones;
