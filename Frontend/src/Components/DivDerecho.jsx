import { useState } from "react";
import Tiempo from "./Tiempo";
import Estado from "./Estado";
import Botones from "./Botones";

const DivDerecho = ({ setMostrarScanner }) => {
    const [salaSeleccionada, setSalaSeleccionada] = useState("");

    return (
        <>
            <div className="tiempo">
                <Tiempo />
            </div>
            <div className="estado">
                <Estado salaSeleccionada={salaSeleccionada} setSalaSeleccionada={setSalaSeleccionada} />
            </div>
            <div className="botones">
                <Botones
                    setMostrarScanner={setMostrarScanner}
                    salaSeleccionada={salaSeleccionada}
                />
            </div>
        </>
    );
};

export default DivDerecho;