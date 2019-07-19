# Movie Review Sentiment Analysis
[![Build Status](https://travis-ci.org/rocky1638/movie-review-sentiment-analysis.svg?branch=master)](https://travis-ci.org/rocky1638/movie-review-sentiment-analysis)

A small web app built with a **Flask API** and **React** front-end, to classify
a given movie review as either positive or negative. The app utilizes online
learning to actively train the classifier _(the classifier is updated everytime
the server is restarted.)_

The classifier is a simple logistic regression classifier from [ski-kit
learn](https://scikit-learn.org/), that was tuned using grid search.

A lot of this code comes from a textbook I've been working through by
[Sebastian Raschka](https://sebastianraschka.com/). If you want to take a look
at the book, here it is on [Amazon](https://www.amazon.ca/Python-Machine-Learning-Sebastian-Raschka-ebook/dp/B00YSILNL0).

Sidenote, I also used this project to practice with Docker and CI technologies
like Travis 👍.
