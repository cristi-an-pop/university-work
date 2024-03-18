import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

df = pd.read_csv("score_updated.csv")
X = np.array(df['Hours'])
y = np.array(df['Scores'])

# Split into random train and test subsets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)

# Reshape the X lists in order to have two-dimensional array (every element becomes an array) ex: [ [2.3], [4.5], ... ]
X_train = X_train.reshape(-1, 1)
X_test = X_test.reshape(-1, 1)

lr = LinearRegression().fit(X_train, y_train)

print(f"Linear Regression-Training set score: {lr.score(X_train, y_train):.2f}")
print(f"Linear Regression-Test set score: {lr.score(X_test, y_test):.2f}")

a = lr.coef_[0]
b = lr.intercept_
# ax + b = y
print(a, "* x +", b, "= y")


pred1 = lr.predict([[4]])
pred2 = lr.predict([[9.9]])
pred3 = lr.predict([[12]])

fig_scat, ax_scat = plt.subplots(1, 1, figsize=(10, 6))

x = X.T

best_fit = b + a * (np.append(x, [4, 9.9, 12]))

ax_scat.scatter(x, y, s=50, label="Training Data")
ax_scat.plot(np.append(x, [4, 9.9, 12]), best_fit, ls="--", label="Best Fit Line")

ax_scat.plot([4], pred1, "ys", label="Linear Regression")
ax_scat.plot([9.9], pred2, "ys", label="Linear Regression")
ax_scat.plot([12], pred3, "ys", label="Linear Regression")
ax_scat.set_xlabel(r'$x$')
ax_scat.set_ylabel(r'$y$');

plt.show()

