import { useState, useEffect } from 'react';
import { fetchSchedule } from '../services/googleSheets';

export interface StoreSchedule {
  dia: string;
  horaInicio: string;
  horaFin: string;
  cerrado: string;
}

const DAYS_MAP = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

function getBogotaNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Bogota',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '0';

  return {
    dayIndex: WEEKDAY_INDEX[get('weekday')] ?? 0,
    hour: parseInt(get('hour'), 10),
    minute: parseInt(get('minute'), 10),
  };
}

function normalizeDayName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function isMarkedClosed(cerrado: string): boolean {
  const normalized = cerrado
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return ['si', 's', 'yes', 'true', '1', 'verdadero', 'cerrado'].includes(normalized);
}

export function useStoreStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      try {
        const scheduleData: StoreSchedule[] = await fetchSchedule();

        const { dayIndex, hour, minute } = getBogotaNow();
        const currentDayName = DAYS_MAP[dayIndex];
        const currentTimeInMinutes = hour * 60 + minute;

        const todayConfig = scheduleData.find(
          (item) => normalizeDayName(item.dia) === normalizeDayName(currentDayName)
        );

        if (!todayConfig || isMarkedClosed(todayConfig.cerrado)) {
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