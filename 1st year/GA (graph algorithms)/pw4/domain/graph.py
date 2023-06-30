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
        if edges_capacity > vertices_capacity * (vertices_capacity - 1) / 2:
            edges_capacity = vertices_capacity * (vertices_capacity - 1) / 2
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
