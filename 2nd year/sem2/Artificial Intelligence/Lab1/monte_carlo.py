# Consider a large pipe with a radius  R=30cm  that has the opening pointing straight up, as in the figure.
# Around this pipe is a rectangular wall with an edge  l=1m .
# Balls of radius  r=1cm  fall down uniformly from above inside the square yard.
# Compute, using a Monte Carlo simulation, the probability that a ball falls inside the pipe.
# Compare the results with the mathematically deduced probability.

import numpy as np

def monte_carlo_simulation(num_points, R, l, r):
    num_inside = 0
    for _ in range(num_points):
        x = np.random.uniform(-l/2, l/2)
        y = np.random.uniform(-l/2, l/2)
        distance_from_center = np.sqrt(x**2 + y**2)
        if distance_from_center <= R - r:
            num_inside += 1
    return num_inside / num_points

pipe_radius = 30
rectangular_length = 100
ball_radius = 1

pipe_area = np.pi * pipe_radius**2
yard_area = rectangular_length**2
mathematical_probability = pipe_area / yard_area

num_points = 10000
simulation_probability = monte_carlo_simulation(num_points, pipe_radius, rectangular_length, ball_radius)

print("Mathematically deduced probability:", mathematical_probability)
print("Monte Carlo simulation probability:", simulation_probability)
