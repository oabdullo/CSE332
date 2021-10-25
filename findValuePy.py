import numpy as np

import pandas as pd

df = pd.read_csv('./data/Food_Product_Emissions.csv')

import matplotlib.pyplot  as plt

plt.matshow(df.corr())

plt.colorbar()

plt.show()

(df.corr())
