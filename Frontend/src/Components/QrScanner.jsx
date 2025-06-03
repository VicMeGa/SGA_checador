import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const QrScanner = ({ onScanSuccess, onClose }) => {
  const scannerRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevenir múltiples inicializaciones
    if (isInitialized.current) {
      return;
    }

    const initScanner = async () => {
      try {
        // Limpiar cualquier contenido previo del contenedor
        const readerElement = document.getElementById("reader");
        if (readerElement) {
          readerElement.innerHTML = '';
        }

        // Crear el scanner
        const scanner = new Html5QrcodeScanner("reader", {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          disableFlip: false,
          rememberLastUsedCamera: true
        }, false); // verbose = false

        scannerRef.current = scanner;
        isInitialized.current = true;

        // Función de éxito
        const onScanSuccessLocal = (decodedText, decodedResult) => {
          console.log(`✅ QR Code detected: ${decodedText}`);
          
          // Limpiar el scanner inmediatamente
          scanner.clear().then(() => {
            console.log("Scanner cleared successfully");
            onScanSuccess(decodedText);
          }).catch(error => {
            console.error("Error clearing scanner:", error);
            onScanSuccess(decodedText); // Llamar de todos modos
          });
        };

        // Función de error (opcional)
        const onScanErrorLocal = (errorMessage) => {
          // Solo mostrar errores importantes, no los de "No QR code found"
          if (!errorMessage.includes("No QR code found")) {
            console.warn("QR Scanner error:", errorMessage);
          }
        };

        // Renderizar el scanner
        scanner.render(onScanSuccessLocal, onScanErrorLocal);

      } catch (error) {
        console.error("Error initializing scanner:", error);
      }
    };

    // Pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(initScanner, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      
      if (scannerRef.current && isInitialized.current) {
        scannerRef.current.clear()
          .then(() => {
            console.log("✅ Scanner cleaned up successfully");
          })
          .catch(error => {
            console.error("❌ Error during cleanup:", error);
          })
          .finally(() => {
            scannerRef.current = null;
            isInitialized.current = false;
            
            // Limpiar manualmente el DOM como seguridad extra
            const readerElement = document.getElementById("reader");
            if (readerElement) {
              readerElement.innerHTML = '';
            }
          });
      }
    };
  }, []); // Array de dependencias vacío

  const handleManualClose = () => {
    if (scannerRef.current && isInitialized.current) {
      scannerRef.current.clear()
        .then(() => {
          console.log("Manual close: Scanner cleared");
          onClose();
        })
        .catch(error => {
          console.error("Error during manual close:", error);
          onClose(); // Cerrar de todos modos
        });
    } else {
      onClose();
    }
  };

  return (
    // MODAL OVERLAY - Esto hace que se vea como ventana emergente
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      {/* CONTENEDOR DEL MODAL */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "20px",
        maxWidth: "500px",
        maxHeight: "90vh",
        position: "relative",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}>
        {/* Header con botón de cerrar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "15px"
        }}>
          <h3 style={{ 
            margin: 0, 
            color: "#1f2937",
            fontSize: "18px",
            fontWeight: "600"
          }}>
            Escanear Código QR
          </h3>
          <button
            onClick={handleManualClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s",
              ":hover": {
                backgroundColor: "#f3f4f6"
              }
            }}
            title="Cerrar scanner"
          >
            <X size={20} color="#6b7280" />
          </button>
        </div>

        {/* Contenedor del scanner */}
        <div id="reader" style={{
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }} />

        {/* Instrucciones */}
        <div style={{ 
          marginTop: "20px", 
          textAlign: "center",
          color: "#6b7280",
          fontSize: "14px",
          lineHeight: "1.5"
        }}>
          <p style={{ margin: "8px 0" }}>
            🎯 Coloca el código QR dentro del recuadro
          </p>
          <p style={{ margin: "8px 0" }}>
            💡 Asegúrate de tener buena iluminación
          </p>
        </div>
      </div>
    </div>
  );
};

export default QrScanner;