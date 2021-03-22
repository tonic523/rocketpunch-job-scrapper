from flask import Flask, render_template

app = Flask("__name__")


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/game')
def game():
    return render_template("brick_break.html")


app.run(debug=True)
