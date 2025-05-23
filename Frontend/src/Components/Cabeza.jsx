import vantus from "../assets/vantus.png"
import { useEffect,useState } from "react";

const Cabeza =()=>{
    const [date, setDate] = useState("");

    useEffect(() => {
        const updateTime = () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
        setDate(formattedDate);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

    return(
        <>
        <header className='arriba'>
            <img className="logo" src={vantus}/>
            <span className="fecha">{date}</span>
        </header>
        </>
    );
};

export default Cabeza;