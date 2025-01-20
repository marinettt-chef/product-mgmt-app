from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

DB_CONFIG = {
    "dbname": "mydatabase",
    "user": "myuser",
    "password": "mypassword",
    "host": "postgres",
    "port": 5432
}

def get_db_connection():
    conn = psycopg2.connect(**DB_CONFIG)
    return conn

@app.route('/products', methods=['GET'])
def get_products():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, type, picture, price, description FROM product")
        rows = cursor.fetchall()
        products = [
            {
                "id": row[0],
                "name": row[1],
                "type": row[2],
                "picture": row[3],
                "price": float(row[4]),
                "description": row[5]
            } for row in rows
        ]
        cursor.close()
        conn.close()
        return jsonify(products)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/products', methods=['POST'])
def create_product():
    data = request.json
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO product (name, type, picture, price, description)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
        """, (data['name'], data['type'], data['picture'], data['price'], data['description']))
        product_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Product created", "id": product_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.json
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE product
            SET name = %s, type = %s, picture = %s, price = %s, description = %s
            WHERE id = %s
        """, (data['name'], data['type'], data['picture'], data['price'], data['description'], product_id))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Product updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
                
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
