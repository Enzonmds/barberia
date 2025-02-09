from datetime import datetime
from app import db

# Modelo para los servicios
class Servicio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    precio = db.Column(db.Float, nullable=False)
    duracion = db.Column(db.Integer, nullable=False)  # Duración en minutos
    tipo = db.Column(db.String(50), nullable=False)  # Barbería, Solarium, Centro de estética

    # Relación con las reservas
    reservas = db.relationship('Reserva', backref='servicio', lazy=True)

    def __repr__(self):
        return f'<Servicio {self.nombre}>'

# Modelo para las reservas
class Reserva(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente_nombre = db.Column(db.String(100), nullable=False)
    cliente_email = db.Column(db.String(100), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    servicio_id = db.Column(db.Integer, db.ForeignKey('servicio.id'), nullable=False)

    def __repr__(self):
        return f'<Reserva {self.cliente_nombre} - {self.fecha}>'

# Modelo para usuarios (opcional, para autenticación)
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    es_admin = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Usuario {self.username}>'