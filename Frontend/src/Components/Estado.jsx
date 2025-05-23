import { useState,useEffect } from "react";

const Estado= () =>{
    const [Sala, setSala] = useState({ name: "Sala A", status: "Cargando..." });

    const isAvailable = Sala.status === "Disponible";

    useEffect(() => {
    // Simula la obtención de datos desde una base de datos
    setTimeout(() => {
      setSala({ name: "Sala A", status: "Disponible" });
    }); // Simula un retraso de 2 segundos
  }, []);
  
    return (
        <>
        <h2>{Sala.name}</h2>
        <div className="status-indicator">
            <span className={isAvailable ? "available" : "unavailable"}>
                ESTADO: {Sala.status}
            </span>
            <div className={`status-dot ${isAvailable ? "available" : "unavailable"}`} />
        </div>
        </>
    )
}

export default Estado;