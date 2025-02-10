import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarioReservas = () => {
  const [reservas, setReservas] = useState([]);

  // Obtener las reservas desde Flask
  useEffect(() => {
    fetch('/reservas')
      .then(response => response.json())
      .then(data => {
        // Formatear las reservas para el calendario
        const eventos = data.map(reserva => ({
          title: `Reserva de ${reserva.cliente_nombre}`,
          start: new Date(reserva.fecha),
          end: new Date(moment(reserva.fecha).add(reserva.servicio.duracion, 'minutes')),
        }));
        setReservas(eventos);
      })
      .catch(error => console.error('Error fetching reservas:', error));
  }, []);

  return (
    <div style={{ height: '500px', margin: '20px' }}>
      <h2>Calendario de Reservas</h2>
      <Calendar
        localizer={localizer}
        events={reservas}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        selectable
        onSelectSlot={(slotInfo) => alert(`Seleccionaste: ${slotInfo.start.toLocaleString()}`)}
        onSelectEvent={(event) => alert(`Reserva seleccionada: ${event.title}`)}
      />
    </div>
  );
};

export default CalendarioReservas;