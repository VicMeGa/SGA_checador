import Tiempo from "./Tiempo";
import Estado from "./Estado";
import Botones from "./Botones";

const DivDerecho = ({ setMostrarScanner }) => {
    return (
        <>
            <div className="tiempo">
                <Tiempo />
            </div>
            <div className="estado">
                <Estado />
            </div>
            <div className="botones">
                <Botones setMostrarScanner={setMostrarScanner} />
            </div>
        </>
    );
};

export default DivDerecho;
