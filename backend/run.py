from dotenv import load_dotenv
import os
from app import create_app

# Carga las variables de entorno desde el archivo .env
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)