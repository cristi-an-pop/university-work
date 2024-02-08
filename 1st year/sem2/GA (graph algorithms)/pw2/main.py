import random
import copy


class Edge:
    def __init__(self, src: int, dest: int, cost: int):
        self.src = src
        self.dest = dest
        self.cost = cost

    def get_endpoints(self):
        return self.src, self.dest

    def get_cost(self):
        return self.cost

    def set_cost(self, cost):
        self.cost = cost


class DirectedGraph:
    def __init__(self, vertices_capacity=100, edges_capacity=100):
        self.in_edges = {}
        self.out_edges = {}
        self.costs = {}
        self.__vertices_capacity__ = vertices_capacity
        self.__edges_capacity__ = edges_capacity

    def vertices_capacity(self):
        return self.__vertices_capacity__

    def edges_capacity(self):
        return self.__edges_capacity__

    def get_num_vertices(self):
        return len(self.in_edges)

    def exist_vertex(self, node: int):
        return node in self.in_edges

    def add_vertex(self, node: int):
        if self.exist_vertex(node):
            print("Vertex already exists")
            return
        if self.get_num_vertices() > self.__vertices_capacity__:
            print("Graph is full")
            return
        self.in_edges[node] = []
        self.out_edges[node] = []

    def exist_edge(self, src, dest):
        return (src, dest) in self.costs

    def get_num_edges(self):
        return len(self.costs)

    def add_edge(self, edge: Edge):
        if self.get_num_edges() > self.__edges_capacity__:
            print("Graph is full")
            return
        src, dest = edge.get_endpoints()
        if self.exist_edge(src, dest):
            print("Edge already exists")
            return
        cost = edge.get_cost()
        self.out_edges[src] = self.out_edges.get(src, []) + [dest]
        self.in_edges[dest] = self.in_edges.get(dest, []) + [src]
        self.costs[(src, dest)] = cost

    def remove_vertex(self, node: int):
        if not self.exist_vertex(node):
            print("Vertex does not exist")
            return
        for src in self.in_edges[node]:
            self.out_edges[src].remove(node)
            del self.costs[(src, node)]
        for dest in self.out_edges[node]:
            self.in_edges[dest].remove(node)
            del self.costs[(node, dest)]
        del self.in_edges[node]
        del self.out_edges[node]

    def modify_cost(self, src: int, dest: int, cost: int):
        if not self.exist_vertex(src) or not self.exist_vertex(dest):
            print("Vertex does not exist")
            return
        if not self.exist_edge(src, dest):
            print("Edge does not exist")
            return
        self.costs[(src, dest)] = cost

    def remove_edge(self, src: int, dest: int):
        if not self.exist_vertex(src) or not self.exist_vertex(dest):
            print("Vertex does not exist")
            return
        if not self.exist_edge(src, dest):
            print("Edge does not exist")
            return
        self.out_edges[src].remove(dest)
        self.in_edges[dest].remove(src)
        del self.costs[(src, dest)]

    def get_in_degree(self, node: int):
        if not self.exist_vertex(node):
            print("Vertex does not exist")
            return
        return len(self.in_edges.get(node, []))

    def get_out_degree(self, node: int):
        if not self.exist_vertex(node):
            print("Vertex does not exist")
            return
        return len(self.out_edges.get(node, []))

    def get_in_edges(self, node: int):
        if not self.exist_vertex(node):
            print("Vertex does not exist")
            return
        return self.in_edges.get(node, [])

    def get_out_edges(self, node: int):
        if not self.exist_vertex(node):
            print("Vertex does not exist")
            return
        return self.out_edges.get(node, [])

    def get_cost(self, src: int, dest: int):
        if not self.exist_vertex(src) or not self.exist_vertex(dest):
            print("Vertex does not exist")
            return
        if not self.exist_edge(src, dest):
            print("Edge does not exist")
            return
        return self.costs.get((src, dest), None)

    def get_edges(self):
        return self.costs.items()

    def get_edge(self, src: int, dest: int):
        if not self.exist_vertex(src) or not self.exist_vertex(dest):
            print("Vertex does not exist")
            return
        if not self.exist_edge(src, dest):
            print("Edge does not exist")
            return
        return src, dest, self.costs.get((src, dest), None)

    def parse_vertices(self):
        return list(self.in_edges.keys())

    def parse_outbound_edges(self, node: int):
        if not self.exist_vertex(node):
            print("Vertex does not exist")
            return
        return [(node, dest, self.costs.get((node, dest), None)) for dest in self.out_edges.get(node, [])]

    def parse_inbound_edges(self, node: int):
        if not self.exist_vertex(node):
            print("Vertex does not exist")
            return
        return [(src, node, self.costs.get((src, node), None)) for src in self.in_edges.get(node, [])]


class Menu:
    def __init__(self, graph: DirectedGraph):
        self.graph = graph

    def run(self):
        while True:
            print("1. Graph from console")
            print("2. Graph from file")
            print("0. Exit")
            try:
                option = int(input("Enter option: "))
                if option == 1:
                    self.graph_from_console()
                elif option == 2:
                    self.graph_from_file()
                elif option == 0:
                    break
                else:
                    print("Invalid option")
            except ValueError:
                print("Invalid option")

    def graph_from_console(self):
        num_vertices = int(input("Enter number of vertices: "))
        num_edges = int(input("Enter number of edges: "))
        self.graph = copy.deepcopy(create_random_graph(num_vertices, num_edges))
        self.start()

    def graph_from_file(self):
        filename = input("Enter filename: ")
        self.graph = copy.deepcopy(read_file(filename))
        self.start()

    def start(self):
        while True:
            print("1. Add vertex")
            print("2. Remove vertex")
            print("3. Add edge")
            print("4. Remove edge")
            print("5. Modify cost")
            print("6. Get the number of vertices")
            print("7. Get in degree of vertex")
            print("8. Get out degree of vertex")
            print("9. Parse the vertices")
            print("10. Parse outbound edges")
            print("11. Parse inbound edges")
            print("12. Write to file")
            print("0. Exit")
            try:
                option = int(input("Enter option: "))
                if option == 1:
                    self.add_vertex()
                elif option == 2:
                    self.remove_vertex()
                elif option == 3:
                    self.add_edge()
                elif option == 4:
                    self.remove_edge()
                elif option == 5:
                    self.modify_cost()
                elif option == 6:
                    self.get_num_vertices()
                elif option == 7:
                    self.get_in_degree()
                elif option == 8:
                    self.get_out_degree()
                elif option == 9:
                    self.parse_vertices()
                elif option == 10:
                    self.parse_outbound_edges()
                elif option == 11:
                    self.parse_inbound_edges()
                elif option == 12:
                    file_name = input("Enter file name: ")
                    write_file(file_name, self.graph)
                elif option == 0:
                    break
                else:
                    print("Invalid option")
            except ValueError:
                print("Invalid option")

    def add_vertex(self):
        vertex = int(input("Enter vertex: "))
        self.graph.add_vertex(vertex)

    def remove_vertex(self):
        vertex = int(input("Enter vertex: "))
        self.graph.remove_vertex(vertex)

    def add_edge(self):
        src = int(input("Enter source: "))
        dest = int(input("Enter destination: "))
        cost = int(input("Enter cost: "))
        edge = Edge(src, dest, cost)
        self.graph.add_edge(edge)

    def remove_edge(self):
        src = int(input("Enter source: "))
        dest = int(input("Enter destination: "))
        self.graph.remove_edge(src, dest)

    def modify_cost(self):
        src = int(input("Enter source: "))
        dest = int(input("Enter destination: "))
        cost = int(input("Enter cost: "))
        self.graph.modify_cost(src, dest, cost)

    def get_num_vertices(self):
        print(self.graph.get_num_vertices())

    def get_in_degree(self):
        vertex = int(input("Enter vertex: "))
        print(self.graph.get_in_degree(vertex))

    def get_out_degree(self):
        vertex = int(input("Enter vertex: "))
        print(self.graph.get_out_degree(vertex))

    def parse_vertices(self):
        print(self.graph.parse_vertices())

    def parse_outbound_edges(self):
        vertex = int(input("Enter vertex: "))
        print(self.graph.parse_outbound_edges(vertex))

    def parse_inbound_edges(self):
        vertex = int(input("Enter vertex: "))
        print(self.graph.parse_inbound_edges(vertex))


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
    graph = DirectedGraph(num_vertices + 100, num_edges + 100)

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

    while len(queue) > 0: # while queue is not empty
        current = queue.pop(0)
        if current == end:
            break
        for edge in graph.parse_outbound_edges(current): # for each edge in the adjacency list of current
            if not visited[edge[1]]: # if the destination of the edge is not visited add it to the queue and mark it as visited and set its parent to current
                queue.append(edge[1])
                visited[edge[1]] = True
                parent[edge[1]] = current

    if parent[end] == -1: # if the end vertex has no parent, there is no path between start and end
        print("No path found")
        return

    path = []
    current = end
    while current != -1: # construct the path from end to start
        path.append(current)
        current = parent[current]

    path.reverse()
    print("Path: ", path)
    print("Length: ", len(path) - 1)

def create_simple_graph(graph: DirectedGraph):
    graph.add_vertex(1)
    graph.add_vertex(2)
    graph.add_vertex(3)
    graph.add_vertex(4)
    graph.add_vertex(5)
    graph.add_edge(Edge(1, 2, 1))
    graph.add_edge(Edge(2, 3, 1))
    graph.add_edge(Edge(2, 4, 1))
    graph.add_edge(Edge(2, 5, 1))
    graph.add_edge(Edge(4, 5, 1))
    return graph


if __name__ == "__main__":
    graph = DirectedGraph()
    graph = read_file('graph100k.txt')
    # graph = create_simple_graph(graph)
    breadth_first_search(graph, 100, 1)
