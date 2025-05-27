import { Fingerprint, QrCode } from "lucide-react";

const Botones = ({ setMostrarScanner }) => {
    return (
        <>
            <div className="text-center">
                <Fingerprint className="icon" />
            </div>
            <div className="text-center">
                <button onClick={() => setMostrarScanner(true)}>
                    <QrCode className="icon" />
                </button>
            </div>
        </>
    );
};

export default Botones;
