from flask import Flask, request, render_template
import rip_quick_add

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')

    url = rip_quick_add.create_invite_url(request.form['text'])
    return {'url': url}
