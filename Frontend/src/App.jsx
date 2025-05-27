import './App.css';
import { useState } from "react";
import Cabeza from "./Components/Cabeza"
import DivDerecho from './Components/DivDerecho';
import DivIzquierdo from './Components/DivIzquierdo';
import QrScanner from './Components/QrScanner';

function App() {
  const [mostrarScanner, setMostrarScanner] = useState(false);
  const [scanResult, setScanResult] = useState("");

  const handleScanSuccess = (data) => {
    setScanResult(data);
    console.log("Resultado QR:", data);
    setMostrarScanner(false);
  };

  return (
    <>
      <Cabeza />
      <div className='divIzquierdo'>
        <DivIzquierdo />
      </div>
      <div className='divDerecho'>
        <DivDerecho setMostrarScanner={setMostrarScanner} />
      </div>

      {/* Modal del escáner QR */}
      {mostrarScanner && (
        <div className="qr-modal">
          <div className="qr-modal-content">
            <button onClick={() => setMostrarScanner(false)} style={{ color: "red", marginBottom: "10px" }}>
              Cerrar
            </button>
            <QrScanner onScanSuccess={handleScanSuccess} onClose={() => setMostrarScanner(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
