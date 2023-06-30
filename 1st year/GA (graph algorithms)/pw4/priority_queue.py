class PriorityQueue:
    def __init__(self):
        self.queue = []

    def __str__(self):
        return ' '.join([str(i) for i in self.queue])

    def is_empty(self):
        return len(self.queue) == 0

    def enqueue(self, value, priority):
        self.queue.append([value, priority])

    def dequeue(self):
        try:
            min_v = 0
            for i in range(len(self.queue)):
                if self.queue[i][1] < self.queue[min_v][1]:
                    min_v = i
            item = self.queue[min_v]
            del self.queue[min_v]
            return item
        except IndexError:
            print()
            exit()
