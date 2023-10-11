class Queue:
    def __init__(self, *args):
        self.inner = []
        for arg in args:
            self.enqueue(arg)

    def isEmpty(self):
        return self.inner == []

    def __len__(self):
        return len(self.inner)

    def enqueue(self, *item):
        for i in item:
            self.inner.insert(0, i)

    def dequeue(self):
        return self.inner.pop()

    def __repr__(self):
        return "Queue" + str(self.inner)
