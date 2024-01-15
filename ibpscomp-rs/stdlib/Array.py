class Array(list):
    @classmethod
    def __empty_array(cls, *dimensions):
        if len(dimensions) < 1:
            return []
        if len(dimensions) == 1:
            return [None] * dimensions[0]
        return [cls.__empty_array(*dimensions[1:]) for _ in range(dimensions[0])]

    def __init__(self, *dimensions):
        super().__init__(self.__empty_array(*dimensions))

    def push(self, value):
        self.append(value)

    @classmethod
    def fromValues(cls, *values):
        obj = cls()
        for V in values:
            obj.push(V)
        return obj

    @property
    def length(self):
        return len(self)

    def __repr__(self):
        from pprint import pformat

        return pformat(super().copy())
