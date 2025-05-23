import Tiempo from "./Tiempo";
import Estado from "./Estado";
import Botones from "./Botones";

const DivDerecho =()=>{

    return (
        <>
        <div className="tiempo">
            <Tiempo />
        </div>
        <div className="estado">
            <Estado />
        </div>
        <div className="botones">
            <Botones />
        </div>
        </>
    )
}

export default DivDerecho;