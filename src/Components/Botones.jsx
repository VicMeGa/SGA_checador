import { Fingerprint, QrCode } from "lucide-react";

const Botones =()=>{

    return (
        <>
        <div className="text-center">
          <Fingerprint className="icon" />
        </div>
        <div className="text-center">
            <QrCode className="icon" />
        </div>
        </>
    )
}

export default Botones;