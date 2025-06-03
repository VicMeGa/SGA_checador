import { useEffect } from "react";

const HuellaSimulada = ({ onScanSuccess, onClose }) => {
    useEffect(() => {
        // Simula escaneo automático después de 2 segundos
        const timeout = setTimeout(() => {
            const codigoHuellaSimulada = "HUELLA123";
            onScanSuccess(codigoHuellaSimulada);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                }}
            >
                <p>🖐 Escaneando huella dactilar...</p>
                <p style={{ fontSize: "12px", color: "#777" }}>Simulación</p>
                <button onClick={onClose} style={{ marginTop: "10px" }}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default HuellaSimulada;
