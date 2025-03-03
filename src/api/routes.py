"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Restaurant
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def signup():
    data = request.json  # Obtenemos los datos enviados en el body de la solicitud

    # Validar que los campos obligatorios estén presentes
    if not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    # Verificar si el email ya está registrado
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "El email ya está en uso"}), 400

    # Crear el nuevo usuario
    new_user = User(
        email=data['email'],
        name=data['name']
    )
    new_user.set_password(data['password'])  # Encriptar la contraseña
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado exitosamente"}), 201




@api.route('/login', methods=['POST'])
def login():
    data = request.json

    # Validar los campos obligatorios
    if not data.get('email') or not data.get('password'):
        return jsonify({"error": "Email y contraseña son obligatorios"}), 400

    # Buscar el usuario por email
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    # Verificar la contraseña
    if not user.check_password(data['password']):
        return jsonify({"error": "Contraseña incorrecta"}), 401

    # Crear un token de acceso (JWT)
    access_token = create_access_token(identity={"id": user.id, "email": user.email})
    return jsonify({"access_token": access_token, "user": user.serialize()}), 200


@api.route('/restaurants', methods=['GET'])
def get_restaurants():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "El parámetro 'city' es obligatorio"}), 400

    restaurants = Restaurant.query.filter_by(city=city).all()
    return jsonify([restaurant.serialize() for restaurant in restaurants]), 200

@api.route('/restaurants', methods=['POST'])
def add_restaurant():
    data = request.json
    new_restaurant = Restaurant(
        name=data['name'],
        address=data['address'],
        city=data['city'],
        cuisine=data['cuisine'],
        availability=data['availability']
    )
    db.session.add(new_restaurant)
    db.session.commit()
    return jsonify({"message": "Restaurante añadido exitosamente"}), 201

@api.route('/restaurants/<int:restaurant_id>', methods=['GET'])
def get_restaurant_details(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        return jsonify({"error": "Restaurante no encontrado"}), 404

    return jsonify(restaurant.serialize()), 200
