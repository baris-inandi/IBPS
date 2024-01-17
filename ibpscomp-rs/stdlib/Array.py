class Array(list):
    def __init__(self, *args):
        super().__init__([*args])

    @property
    def length(self):
        return len(self)

    def __repr__(self):
        from pprint import pformat

        return "Array" + pformat(super().copy())
