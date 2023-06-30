import copy

from domain.graph import DirectedGraph, Edge
from functions import create_random_graph, read_file, write_file


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
