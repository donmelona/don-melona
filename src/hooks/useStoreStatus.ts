import { useState, useEffect } from 'react';
import { fetchSchedule } from '../services/googleSheets';

export interface StoreSchedule {
  dia: string;
  horaInicio: string;
  horaFin: string;
  cerrado: string;
}

const DAYS_MAP = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export function useStoreStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      try {
        const scheduleData: StoreSchedule[] = await fetchSchedule();
        
        const now = new Date();
        const localTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Bogota" }));
        
        const currentDayName = DAYS_MAP[localTime.getDay()];
        const currentHour = localTime.getHours();
        const currentMinute = localTime.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        const todayConfig = scheduleData.find(
          item => item.dia.trim().toLowerCase() === currentDayName.toLowerCase()
        );

        if (!todayConfig || todayConfig.cerrado.trim().toLowerCase() === 'sí') {
          setIsOpen(false);
          return;
        }

        const [openH, openM] = todayConfig.horaInicio.split(':').map(Number);
        const [closeH, closeM] = todayConfig.horaFin.split(':').map(Number);
        
        const openTimeInMinutes = openH * 60 + openM;
        const closeTimeInMinutes = closeH * 60 + closeM;

        if (closeTimeInMinutes < openTimeInMinutes) {
          setIsOpen(currentTimeInMinutes >= openTimeInMinutes || currentTimeInMinutes <= closeTimeInMinutes);
        } else {
          setIsOpen(currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes);
        }
      } catch (error) {
        console.error("Error calculando disponibilidad desde Sheets:", error);
        setIsOpen(false);
      } finally {
        setLoading(false);
      }
    }

    checkStatus();
    const interval = setInterval(checkStatus, 60000); 
    
    return () => clearInterval(interval);
  }, []);

  return { isOpen, loading };
}