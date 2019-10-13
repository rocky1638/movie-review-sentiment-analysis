import json
import pickle
import sqlite3
import os
import numpy as np
from flask_cors import CORS
from flask import Flask, request

# import the hashing vectorizer
from vectorizer import vect

# import the update function
from update import update_model

app = Flask(__name__)
CORS(app)

# Preparing the classifier
cur_dir = os.path.dirname(__file__)
clf = pickle.load(
    open(os.path.join(cur_dir, 'pkl_objects', 'classifier.pkl'), 'rb'))
db = os.path.join(cur_dir, 'reviews.sqlite')


def classify(document):
    label = {0: 'negative', 1: 'positive'}
    X = vect.transform([document])
    y = clf.predict(X)[0]
    proba = np.max(clf.predict_proba(X))
    return label[y], proba


def train(document, y):
    X = vect.transform([document])
    clf.partial_fit(X, [y])


def sqlite_entry(path, document, y):
    conn = sqlite3.connect(path)
    c = conn.cursor()
    c.execute("INSERT INTO review_db (review, sentiment, date)"
              " VALUES (?, ?, DATETIME('now'))", (document, y))
    conn.commit()
    conn.close()


@app.route('/process', methods=['POST'])
def process():
    data = request.data
    dataDict = json.loads(data)
    review = dataDict['review']
    y, proba = classify(review)
    resultDict = {"sentiment": y, "confidence": proba}
    return json.dumps(resultDict)


@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.data
    dataDict = json.loads(data)
    review = dataDict['review']
    prediction = dataDict['prediction']
    feedback = dataDict['feedback']

    inv_label = {'negative': 0, 'positive': 1}
    y = inv_label[prediction]
    if feedback == 'Incorrect':
        y = int(not(y))
    train(review, y)
    sqlite_entry(db, review, y)
    return json.dumps
    ({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/')
def index():
    return json.dumps
    ({'success': True}), 200, {'ContentType': 'application/json'}


if __name__ == '__main__':
    clf = update_model(db_path=db, model=clf, batch_size=10000)
    port = int(os.environ.get('PORT', 5000))
    app.run(port=port, host="0.0.0.0")
