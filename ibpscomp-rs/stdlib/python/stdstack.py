class IBPSStackNode:
    def __init__(self, data):
        self.data = data
        self.next = None


class Stack:
    def __init__(self, *args):
        self.top = None
        self.push(*args)

    def push(self, *items):
        for item in items:
            node = IBPSStackNode(item)
            if self.top is None:
                self.top = node
            else:
                node.next = self.top
                self.top = node
        return items

    def pop(self):
        if self.top is None:
            return None
        temp = self.top.data
        temp1 = self.top.next
        self.top.next = None
        self.top = temp1
        return temp

    def peek(self):
        return self.top.data

    def isEmpty(self):
        return self.top is None

    def list(self):
        cur_node = self.top
        out = []
        while cur_node is not None:
            out.append(cur_node.data)
            cur_node = cur_node.next
        return out

    def __repr__(self):
        return "Stack" + str(self.list())
