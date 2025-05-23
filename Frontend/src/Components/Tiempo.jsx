import { useState, useEffect } from "react";

const Tiempo =()=> {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        setTime(formattedTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);


    return(
        <>
        <div className="reloj" >
           <span > {time}</span> 
        </div>
        </>
    )
}

export default Tiempo;
