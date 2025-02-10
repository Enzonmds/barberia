import React, { useState, useEffect } from 'react';

const ReservaForm = () => {
  const [formData, setFormData] = useState({
    cliente_nombre: '',
    cliente_email: '',
    fecha: '',
    servicio_id: ''
  });

  const [servicios, setServicios] = useState([]); // Estado para almacenar los servicios

  // Obtener los servicios desde Flask al cargar el componente
  useEffect(() => {
    fetch('/servicios')
      .then(response => response.json())
      .then(data => setServicios(data))
      .catch(error => console.error('Error fetching servicios:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/reservas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => alert(data.mensaje))
      .catch(error => console.error('Error creating reserva:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reservar un servicio</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="cliente_nombre"
          value={formData.cliente_nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="cliente_email"
          value={formData.cliente_email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Fecha:</label>
        <input
          type="datetime-local"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Servicio:</label>
        <select
          name="servicio_id"
          value={formData.servicio_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un servicio</option>
          {servicios.map(servicio => (
            <option key={servicio.id} value={servicio.id}>
              {servicio.nombre} - ${servicio.precio} ({servicio.duracion} minutos)
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Reservar</button>
    </form>
  );
};

export default ReservaForm;