class Array(list):
    def __init__(self, length=0):
        super().__init__(None for _ in range(length))

    @classmethod
    def fromValues(cls, *values):
        new = cls(0)
        new.push(*values)
        return new

    @classmethod
    def fromList(cls, pylist):
        new = cls(0)
        new.push(*pylist)
        return new

    def push(self, *values):
        for value in values:
            self.append(value)

    @property
    def length(self):
        return len(self)

    def __repr__(self):
        from pprint import pformat

        return pformat(super().copy())
