class __IBPSStackNode__:
    def __init__(self, data):
        self.data = data
        self.next = None


class Stack:
    def __init__(self, *args):
        self.top = None
        self.push(*args)

    def push(self, *items):
        for item in items:
            node = __IBPSStackNode__(item)
            if self.top is None:
                self.top = node
            else:
                node.next = self.top
                self.top = node

        return items

    def pop(self):
        if self.top is None:
            return None

        TEMP = self.top.data
        TEMP1 = self.top.next
        self.top.next = None
        self.top = TEMP1
        return TEMP

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

    @property
    def length(self):
        return len(self.list())

    def __repr__(self):
        from pprint import pformat

        return "Stack" + pformat(self.list())
