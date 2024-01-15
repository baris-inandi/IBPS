class Queue:
    def __init__(self, *args):
        self.inner = []
        for arg in args:
            self.enqueue(arg)

    def isEmpty(self):
        return self.inner == []

    def __len__(self):
        return len(self.inner)

    def enqueue(self, *items):
        for I in items:
            self.inner.insert(0, I)

    def dequeue(self):
        return self.inner.pop()

    @property
    def length(self):
        return len(self.inner)

    def __repr__(self):
        return "Queue" + str(self.inner)
