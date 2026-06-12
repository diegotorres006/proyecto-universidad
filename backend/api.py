from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

# Reemplaza con la IP PRIVADA de tu Servidor-DB
DB_HOST = "IP_PRIVADA_DB" 

def get_db():
    return psycopg2.connect(f"dbname=portal_academico user=api_user password=contraseña_segura host={DB_HOST}")

@app.route('/estudiantes', methods=['GET', 'POST'])
def estudiantes():
    conn = get_db()
    cur = conn.cursor()
    if request.method == 'POST':
        data = request.json
        cur.execute("INSERT INTO estudiantes (nombre, carrera) VALUES (%s, %s)", (data['nombre'], data['carrera']))
        conn.commit()
        return jsonify({"msg": "Guardado"}), 201
    else:
        cur.execute("SELECT * FROM estudiantes")
        res = cur.fetchall()
        return jsonify(res)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)