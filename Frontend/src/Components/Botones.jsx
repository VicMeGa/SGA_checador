import { useState } from "react";
import { Fingerprint, QrCode } from "lucide-react";
import QrScanner from "./QrScanner";
// import HuellaSimulada from "./HuellaSimulada"; // Ya no se usa si es simulación directa

const Botones = ({ salaSeleccionada }) => {
    const [mostrarScanner, setMostrarScanner] = useState(false);
    const [mensaje, setMensaje] = useState("");

    const registrarAcceso = async (tipo, codigo) => {
        try {
            const response = await fetch("http://localhost:8080/sga/acceso/registrar", {
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
            setMensaje(resultado);
        } catch (error) {
            setMensaje("❌ Error al registrar acceso.");
            console.error(error);
        } finally {
            setTimeout(() => setMensaje(""), 5000);
            setMostrarScanner(false);
        }
    };

    return (
        <>
            <div className="text-center">
                <button
                    onClick={() => registrarAcceso("Huella", "000002")} // 👈 ahora registra directo al hacer clic
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
