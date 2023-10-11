class Collection:
    def __init__(self, *args):
        self.inner = list(args)
        self.ptr = 0

    def isEmpty(self):
        return self.inner == []

    def hasNext(self):
        return self.ptr < len(self.inner)

    def getNext(self):
        if self.hasNext():
            self.ptr += 1
            return self.inner[self.ptr - 1]
        else:
            raise StopIteration

    def addItem(self, item):
        self.inner.append(item)

    def resetNext(self):
        self.ptr = 0
        
    def pop(self):
        return self.inner.pop()

    def __repr__(self) -> str:
        return "Collection" + str(self.inner)
