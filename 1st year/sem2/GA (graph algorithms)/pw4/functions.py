import random

from domain.graph import DirectedGraph, Edge
from priority_queue import PriorityQueue


def read_file(file):
    with open(file, "r") as f:
        lines = f.readlines()
        first_line = lines[0].split()
        vertex_capacity = int(first_line[0])
        edge_capacity = int(first_line[1])
        graph = DirectedGraph(vertex_capacity, edge_capacity)
        for line in lines[2:]:
            src, dest, cost = line.split()
            graph.add_vertex(int(src))
            graph.add_vertex(int(dest))
            graph.add_edge(Edge(int(src), int(dest), int(cost)))
        return graph


def write_file(file, graph):
    with open(file, "w") as f:
        f.write(str(graph.vertices_capacity()) + " " + str(graph.edges_capacity()) + "\n")
        for src, dest in graph.get_edges():
            f.write(str(src) + " " + str(dest) + "\n")


def create_random_graph(num_vertices, num_edges):
    graph = DirectedGraph(num_vertices, num_edges)

    for i in range(num_vertices):
        graph.add_vertex(i)

    edges = []
    for src in range(num_vertices):
        for dest in range(num_vertices):
            if src != dest and len(edges) < num_edges:
                edges.append((src, dest))

    random.shuffle(edges)
    for src, dest in edges:
        cost = random.randint(1, 10)
        graph.add_edge(Edge(src, dest, cost))

    return graph


def breadth_first_search(graph: DirectedGraph, start: int, end: int):
    """
    This function finds the lowest length path between two vertices

    :param graph: a DirectedGraph
    :param start: int, vertex
    :param end: int, vertex
    """
    visited = [False] * graph.vertices_capacity()
    parent = [-1] * graph.vertices_capacity()
    queue = [start]
    visited[start] = True

    while len(queue) > 0:  # while queue is not empty
        current = queue.pop(0)
        if current == end:
            break
        for edge in graph.parse_outbound_edges(current):  # for each edge in the adjacency list of current
            if not visited[edge[1]]:  # if the destination of the edge is not visited add it to the queue and mark
                # it as visited and set its parent to current
                queue.append(edge[1])
                visited[edge[1]] = True
                parent[edge[1]] = current

    if parent[end] == -1:  # if the end vertex has no parent, there is no path between start and end
        print("No path found")
        return

    path = []
    current = end
    while current != -1:  # construct the path from end to start
        path.append(current)
        current = parent[current]

    path.reverse()
    print("Path: ", path)
    print("Length: ", len(path) - 1)


def create_simple_graph(graph: DirectedGraph):
    graph.add_vertex(0)
    graph.add_vertex(1)
    graph.add_vertex(2)
    graph.add_vertex(3)
    graph.add_vertex(4)
    graph.add_vertex(5)
    graph.add_edge(Edge(0, 1, 1))
    graph.add_edge(Edge(0, 4, 2))
    graph.add_edge(Edge(0, 5, 1))
    graph.add_edge(Edge(1, 0, 2))
    graph.add_edge(Edge(1, 2, 3))
    graph.add_edge(Edge(1, 3, 2))
    graph.add_edge(Edge(2, 0, 1))
    graph.add_edge(Edge(4, 3, 4))
    graph.add_edge(Edge(5, 4, 5))
    graph.add_edge(Edge(5, 2, 7))
    graph.add_edge(Edge(2, 1, 3))
    graph.add_edge(Edge(4, 1, 1))
    return graph


def backwards_dijkstra(g: DirectedGraph, s, t):
    """
    This function finds the lowest length path between two vertices

    :param g: a DirectedGraph
    :param s: int, vertex
    :param t: int, vertex
    """
    q = PriorityQueue()
    dist = {}  # the distance from s to each vertex
    next = {}  # the next vertex on the path from s to t
    q.enqueue(t, 0)  # enqueue the end vertex with priority 0
    dist[t] = 0  # set the distance of the end vertex to 0
    while not q.is_empty():
        x = q.dequeue()[0]
        if x == s:
            break
        for y in g.parse_inbound_edges(x):
            # if the distance from s to y[0] is not known or the distance from s to x + the distance from x to y[0]
            # is less than the distance from s to y[0]
            if y[0] not in dist.keys() or dist[x] + y[2] < dist[y[0]]:
                # update the distance from s to y[0] and the next vertex on the path from s to y[0]
                dist[y[0]] = dist[x] + y[2]
                q.enqueue(y[0], dist[y[0]])
                next[y[0]] = x

    # if the distance from s to t is not known, there is no path from s to t
    if s not in dist.keys():
        print("No path found")
        return

    # construct the path from s to t
    path = []
    current = s
    while current != t:
        path.append(current)
        current = next[current]
    path.append(t)

    print("Path: ", path)
    print("Length: ", len(path) - 1)
    print("Cost: ", dist[s])
