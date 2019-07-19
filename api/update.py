import pickle
import sqlite3
import numpy as np
import os

# import HashingVectorizer
from vectorizer import vect


def update_model(db_path, model, batch_size=10000):
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute('SELECT * from review_db')

    results = c.fetchmany(batch_size)

    while results:
        data = np.array(results)
        X = data[:, 0]
        y = data[:, 1].astype(int)

        classes = np.array([0, 1])
        # transform text reviews in feature vectors
        X_train = vect.transform(X)
        model.partial_fit(X_train, y, classes=classes)
        results = c.fetchmany(batch_size)

    conn.close()
    return model


cur_dir = os.path.dirname(__file__)

clf = pickle.load(
    open(os.path.join(cur_dir, 'pkl_objects', 'classifier.pkl'), 'rb'))
db = os.path.join(cur_dir, 'reviews.sqlite')
clf = update_model(db_path=db, model=clf, batch_size=10000)

# override the pickled classifier with updated model
pickle.dump(clf, open(os.path.join(cur_dir, 'pkl_objects',
                                   'classifier.pkl'), 'wb'), protocol=4)
