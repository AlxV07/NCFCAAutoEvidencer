import time

from flask import Flask, request, jsonify
from flask_cors import CORS
from gpt4free_main.g4f.client import Client
from gpt4free_main.g4f import Provider

app = Flask(__name__)
CORS(app)
client = Client()


def generate_response(prompt: str):
    # provider = Provider.AiChats,
    c = client.chat.completions.create(model="gpt-3.5-turbo", provider=Provider.Allyfy, messages=[
        {"role": "system", "content": "Find the author of this article and the link to his bio page from this HTML. "
                                      "Return the author's name and the link, separated by a semi-colon and no extra "
                                      "whitespace or new lines. If you cannot find one of the fields, return null for "
                                      "that field. Respond only in this format."},
        {"role": "user", "content": prompt}
    ])
    return c.choices[0].message.content


@app.route('/process', methods=['POST'])
def process_text():
    # Get the JSON data from the request
    data = request.json
    text = data.get('text', '')

    print('received:', text)

    res = []
    while len(text):
        t = text[:10000]
        text = text[10000:]

        print('t = ', t)
        print('generating, remaining text length:', len(text))
        print('\n'.join(res))

        r = generate_response(t)
        res.append(r)

        p = r.split(';')
        if len(p) == 2 and p[0] != 'null':
            break

        time.sleep(1)

    # Return the processed text as a JSON response
    print('finished; responding')
    return jsonify({'content': res[-1]})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
