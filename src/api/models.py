from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)  # Email único
    password = db.Column(db.String(128), nullable=False)  # Contraseña encriptada
    name = db.Column(db.String(80), nullable=False)  # Nombre del comensal
    is_active = db.Column(db.Boolean, default=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)  # Encriptar contraseña

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "is_active": self.is_active
        }

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)  # Nombre del restaurante
    address = db.Column(db.String(255), nullable=False)  # Dirección
    city = db.Column(db.String(50), nullable=False)  # Ciudad
    cuisine = db.Column(db.String(50), nullable=False)  # Tipo de comida
    availability = db.Column(db.String(50), nullable=False)  # Disponibilidad

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "cuisine": self.cuisine,
            "availability": self.availability,
        }

