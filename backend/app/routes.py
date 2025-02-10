from flask import Blueprint
from flask import jsonify, request
from app import db
from app.models import Servicio, Reserva


main_bp = Blueprint('main', __name__)


@main_bp.route('/')
def index():
    return 'Pagina principal de la barberia'

@main_bp.route('/servicios', methods=['GET'])
def obtener_servicios():
    servicios = Servicio.query.all()
    return jsonify([{
        'id': s.id,
        'nombre': s.nombre,
        'descripcion': s.descripcion,
        'precio': s.precio,
        'duracion': s.duracion,
        'tipo': s.tipo
    } for s in servicios])

@main_bp.route('/reservas', methods=['POST'])
def crear_reserva():
    data = request.get_json()
    nueva_reserva = Reserva(
        cliente_nombre=data['cliente_nombre'],
        cliente_email=data['cliente_email'],
        fecha=data['fecha'],
        servicio_id=data['servicio_id']
    )
    db.session.add(nueva_reserva)
    db.session.commit()
    return jsonify({'mensaje': 'Reserva creada exitosamente'}), 201

@main_bp.route('/reservas', methods=['GET'])
def obtener_reservas():
    reservas = Reserva.query.join(Servicio).all()
    return jsonify([{
        'id': r.id,
        'cliente_nombre': r.cliente_nombre,
        'fecha': r.fecha.isoformat(),
        'servicio': {
            'id': r.servicio.id,
            'nombre': r.servicio.nombre,
            'duracion': r.servicio.duracion
        }
    } for r in reservas])
