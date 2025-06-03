import { useState, useEffect } from "react";


const Estado = ({ salaSeleccionada, setSalaSeleccionada }) => {
  const [salas, setSalas] = useState([]);
  const [loadingSalas, setLoad] = useState(false);
  const [errorSalas, setErr] = useState(null);
  const [estadoSala, setEstadoSala] = useState(null);


  // Función para obtener hora actual en formato HH:mm
  const obtenerHoraActual = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // "HH:mm"
  };

  const obtenerDiaActual = () => {
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const hoy = new Date();
    return dias[hoy.getDay()];
  };


  // Obtener salas disponibles al cargar
  useEffect(() => {
    const obtenerSalas = async () => {
      setLoad(true);
      setErr(null);
      try {
        const resp = await fetch("http://localhost:8080/sga/buscar/salas");
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        setSalas(data);
      } catch (err) {
        console.error("Error salas:", err);
        setErr("No se pudieron cargar las salas");
      } finally {
        setLoad(false);
      }
    };
    obtenerSalas();
  }, []);

  // Cuando cambia la sala, consultar su estado
  useEffect(() => {
    const verificarEstadoSala = async () => {
      if (!salaSeleccionada) return;

      const horaActual = obtenerHoraActual();
      const diaActual = obtenerDiaActual();

      try {
        const resp = await fetch(`http://localhost:8080/sga/sala/${salaSeleccionada}/estado?hora=${horaActual}&dia=${diaActual}`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        setEstadoSala(data.estado); // "Ocupada" o "Disponible"
      } catch (err) {
        console.error("Error estado sala:", err);
        setEstadoSala("Desconocido");
      }
    };

    verificarEstadoSala();
  }, [salaSeleccionada]);


  return (
    <div className="divMostrarSalas">
      {errorSalas && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {errorSalas}
        </div>
      )}

      <select
        value={salaSeleccionada}
        onChange={(e) => setSalaSeleccionada(e.target.value)}
        disabled={loadingSalas || salas.length === 0}
        required
      >
        <option value="">
          {loadingSalas ? "Cargando salas..." : "Selecciona una sala"}
        </option>
        {salas.map((s) => (
          <option key={s.idSala} value={s.idSala}>
            {s.nombreSala}
          </option>
        ))}
      </select>

      {/* Mostrar estado */}
      {estadoSala && (
        <div className="estado">
          <h2>Estado actual</h2>
          <div className="status-indicator">
            <span className={estadoSala === "Disponible" ? "available" : "unavailable"}>
              {estadoSala}
              <span className="status-dot" style={{ display: "inline-block", marginLeft: "1rem" }}></span>
            </span>
          </div>
        </div>
      )}

    </div>
  );
};

export default Estado;