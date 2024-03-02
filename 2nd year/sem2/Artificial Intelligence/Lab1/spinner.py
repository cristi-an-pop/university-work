import numpy as np

def spinner(probabilityDistribution):
    return np.random.choice(len(probabilityDistribution), p=probabilityDistribution)

probabilityDistribution = [0.2, 0.1, 0.4, 0.2, 0.1]
print(spinner(probabilityDistribution))

def spinnerDegrees(angles):
  return [angle / 360 for angle in angles]

angles = [180, 30, 90, 60]
probabilitiesAngles = spinnerDegrees(angles)
print(spinner(probabilitiesAngles))