from flask import Flask, request, jsonify
from flask_cors import CORS
from g4f.client import Client


app = Flask(__name__)
CORS(app)
client = Client()


def generate_response(prompt: str):
    c = client.chat.completions.create(model="gpt-3.5-turbo", messages=[
    {"role": "system", "content": "Find the author of this article and the link to his bio page from this HTML. Return the author's name and the link, separated by a semi-colon and no extra whitespace."},
    {"role": "user", "content": prompt}
    ])
    return c.choices[0].message.content


@app.route('/process', methods=['POST'])
def process_text():
    # Get the JSON data from the request
    data = request.json
    text = data.get('text', '')

    processed_text = generate_response(text)

    # Return the processed text as a JSON response
    return jsonify({'processed_text': processed_text})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
