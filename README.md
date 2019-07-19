# Movie Review Sentiment Analysis

A small web app built with a **Flask API** and **React** front-end, to classify
a given movie review as either positive or negative. The app utilizes online
learning to actively train the classifier _(the classifier is updated everytime
the server is restarted.)_

The classifier is a simple logistic regression classifier from [ski-kit
learn](https://scikit-learn.org/), that was tuned using grid search.

This is just the React frontend.

A lot of this code comes from a textbook I've been working through by
[Sebastian Raschka](https://sebastianraschka.com/). If you want to take a look
at the book, here it is on [Amazon](https://www.amazon.ca/Python-Machine-Learning-Sebastian-Raschka-ebook/dp/B00YSILNL0).

