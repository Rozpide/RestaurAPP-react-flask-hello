"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Restaurant
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
@api.route('/restaurants', methods=['GET'])
def get_restaurants():
    city = request.args.get('city')
    datetime = request.args.get('datetime')
    capacity = request.args.get('capacity')

    # Filtramos los restaurantes con disponibilidad simulada (actualiza la lógica según tus necesidades)
    restaurants = Restaurant.query.filter(Restaurant.availability != "Completo").all()
    return jsonify([restaurant.serialize() for restaurant in restaurants]), 200

@api.route('/restaurants', methods=['POST'])
def add_restaurant():
    data = request.json
    new_restaurant = Restaurant(
        name=data['name'],
        address=data['address'],
        cuisine=data['cuisine'],
        availability=data['availability']
    )
    db.session.add(new_restaurant)
    db.session.commit()
    return jsonify({"message": "Restaurante añadido exitosamente"}), 201

