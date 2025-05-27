import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef } from "react";

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
    <div>
      {/* Header con botón de cerrar */}
      <div>

      </div>

      {/* Contenedor del scanner */}
      <div 
        id="reader" 
      />

      {/* Instrucciones */}
      <div style={{ 
        marginTop: "15px", 
        textAlign: "center",
        color: "#6c757d",
        fontSize: "14px"
      }}>
        <p style={{ margin: "5px 0" }}>
          🎯 Coloca el código QR dentro del recuadro
        </p>
        <p style={{ margin: "5px 0" }}>
          💡 Asegúrate de tener buena iluminación
        </p>
      </div>
    </div>
  );
};

export default QrScanner;