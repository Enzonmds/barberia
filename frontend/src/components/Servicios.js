import React, { useEffect, useState } from 'react';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Obtener los servicios desde Flask
    fetch('/servicios')
      .then(response => response.json())
      .then(data => setServicios(data))
      .catch(error => console.error('Error fetching servicios:', error));
  }, []);

  return (
    <div>
      <h2>Servicios</h2>
      <ul>
        {servicios.map(servicio => (
          <li key={servicio.id}>
            <strong>{servicio.nombre}</strong> - ${servicio.precio} ({servicio.duracion} minutos)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Servicios;