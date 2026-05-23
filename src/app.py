""" 
→ Flask: Microframework web ligero para construir aplicaciones web y APIs en Python.
→ Flask-CORS: Extensión para Flask que permite manejar CORS (Cross-Origin Resource Sharing/Intercambio de recursos entre orígenes) en las aplicaciones web.
→ mysql.connector: Biblioteca oficial de MySQL para conectar Python con bases de datos MySQL.
→ dotenv: Biblioteca para cargar variables de entorno desde un archivo .env, facilitando la gestión de configuraciones sensibles como credenciales de base de datos.
→ jsonify: Función de Flask para convertir datos Python en respuestas JSON.
→ render_template_string: Función de Flask para renderizar plantillas HTML desde cadenas de texto.
→ send_from_directory: Función de Flask para servir archivos estáticos desde un directorio específico.
→ request: Objeto de Flask que contiene datos de la solicitud HTTP entrante.
→ os: Módulo estándar de Python para interactuar con el sistema operativo, utilizado aquí para manejar variables de entorno.
→ load_dotenv: Función de la biblioteca dotenv para cargar variables de entorno desde un archivo .env.
→ CORS: Cross-Origin Resource Sharing (Compartir Recursos de Origen Cruzado) es un mecanismo de seguridad del navegador que controla qué sitios web pueden acceder a tu API.
"""

from flask import Flask, jsonify, render_template_string, send_from_directory, request
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Crear instancia de Flask
app = Flask(__name__, static_folder='.')

""" 
• CORS = Cross-Origin Resource Sharing (Compartir Recursos de Origen Cruzado)
→ Es un mecanismo de seguridad del navegador que controla qué sitios web pueden acceder a tu API. 
→ Permitir CORS en tu aplicación Flask es importante si tu frontend (por ejemplo, una aplicación React) está alojado en un dominio diferente al de tu backend Flask. Sin CORS, el navegador bloqueará las solicitudes entre dominios por razones de seguridad.

→ En este caso, estamos configurando CORS para permitir solicitudes desde cualquier origen ("*") a las rutas que comienzan con "/api/". Esto es útil durante el desarrollo, pero en producción, es recomendable restringir los orígenes permitidos a los dominios específicos de tu frontend para mejorar la seguridad.
"""
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"], # Permitir todos los métodos HTTP
        "allow_headers": ["Content-Type", "Authorization"] # Permitir estos encabezados HTTP
    }    
})

""" • config : Clase personalizada para manejar la configuración de la conexión a la base de datos y limpieza de texto. """
class Config:
    SERVER = os.getenv('DB_SERVER', 'localhost')
    PORT = int(os.getenv('DB_PORT', '3306'))
    DATABASE = os.getenv('DB_NAME', 'inventario')
    USERNAME = os.getenv('DB_USERNAME', 'root')
    PASSWORD = os.getenv('DB_PASSWORD', '')

    @staticmethod
    def get_db_config():
        return {
            'host': Config.SERVER,
            'port': Config.PORT,
            'database': Config.DATABASE,
            'user': Config.USERNAME,
            'password': Config.PASSWORD
        }

    @staticmethod
    # clean_text : Función para limpiar texto, eliminando espacios en blanco al inicio y al final. Esto es útil para evitar problemas de formato al manejar datos de entrada o salida.
    def clean_text(text):
        return text.strip() if isinstance(text, str) else text

""" → get_db_connection : Función para establecer conexión con la base de datos MySQL. """
def get_db_connection():
    try:
        print(f"Intentando conectar a: {Config.DATABASE} en {Config.SERVER}:{Config.PORT} con usuario {Config.USERNAME}")
        conn = mysql.connector.connect(**Config.get_db_config())
        print("✓ Conexión exitosa a la base de datos")
        return conn
    except mysql.connector.Error as e:
        print(f"✗ Error de conexión a la base de datos MySQL:")
        print(f"  → {str(e)}")
        return None
    except Exception as e:
        print(f"✗ Error inesperado: {str(e)}")
        return None

get_db_connection()