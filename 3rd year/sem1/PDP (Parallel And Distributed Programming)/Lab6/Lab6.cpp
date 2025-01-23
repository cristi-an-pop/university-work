#include <iostream>
#include <vector>
#include <thread>
#include <mutex>
#include <chrono>
#include <random>
#include <atomic>

using namespace std;

class Graph {
public:
    int V;
    vector<vector<int>> adj;

    Graph(int V) : V(V), adj(V, vector<int>(V, 0)) {}

    void addEdge(int u, int v) {
        adj[u][v] = 1;
    }
};

atomic<bool> foundCycle(false);
mutex resultLock;
vector<int> hamiltonianCycle;

bool isValid(int v, const vector<int>& path, const Graph& graph) {
    int current = path.back();
    if (graph.adj[current][v] == 0) return false;
    return find(path.begin(), path.end(), v) == path.end();
}

bool hamiltonianCycleSeq(Graph& graph, vector<int>& path, int start) {
    if (path.size() == graph.V) {
        return graph.adj[path.back()][start] == 1;
    }

    for (int v = 0; v < graph.V; ++v) {
        if (isValid(v, path, graph)) {
            path.push_back(v);
            if (hamiltonianCycleSeq(graph, path, start)) {
                return true;
            }
            path.pop_back();
        }
    }
    return false;
}

void hamiltonianCycleParallel(Graph& graph, vector<int> path, int start, int depth, int maxDepth) {
    //if (foundCycle.load()) return;

    if (path.size() == graph.V) {
        if (graph.adj[path.back()][start] == 1) {
            lock_guard<mutex> lock(resultLock);
            if (!foundCycle) {
                hamiltonianCycle = path;
                foundCycle.store(true);
            }
        }
        return;
    }

    vector<thread> threads;
    for (int v = 0; v < graph.V; ++v) {
        if (isValid(v, path, graph)) {
            path.push_back(v);

            if (depth % 10 == 0) {
                threads.emplace_back(hamiltonianCycleParallel, ref(graph), path, start, depth + 1, maxDepth);
            }
            else {
                hamiltonianCycleParallel(graph, path, start, depth + 1, maxDepth);
            }
            path.pop_back();
        }
    }

    for (auto& t : threads) {
        if (t.joinable()) t.join();
    }
}

Graph generateHamiltonianGraph(int V, int minEdges = 5, int maxEdges = 10) {
    Graph graph(V);

    vector<int> cycle(V);
    for (int i = 0; i < V; ++i) cycle[i] = i;
    random_shuffle(cycle.begin(), cycle.end());

    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> edgeDist(minEdges, maxEdges); 
    uniform_int_distribution<> nodeDist(0, V - 1); 

    for (int u = 0; u < V; ++u) {
        int numEdges = edgeDist(gen);
        for (int i = 0; i < numEdges; ++i) {
            int v;
            do {
                v = nodeDist(gen);
            } while (v == u || graph.adj[u][v] == 1);

            graph.addEdge(u, v);
        }
    }


    for (int i = 0; i < V; ++i) {
        graph.addEdge(cycle[i], cycle[(i + 1) % V]);
    }

    return graph;
}



int main() {
    int V = 10;
	Graph graph = generateHamiltonianGraph(V);

    vector<int> path = { 0 };

    auto start = chrono::high_resolution_clock::now();

    hamiltonianCycleParallel(graph, path, 0, 0, 3);

    auto end = chrono::high_resolution_clock::now();
    chrono::duration<double> duration = end - start;

    if (foundCycle) {
        cout << "Hamiltonian Cycle Found: " << endl;
		for (int v : hamiltonianCycle) {
			cout << v << " ";
		}
        cout << "0" << endl;
    }
    else {
        cout << "No Hamiltonian Cycle Found." << endl;
    }

    cout << "Execution Time: " << duration.count() << " seconds" << endl;

    return 0;
}
