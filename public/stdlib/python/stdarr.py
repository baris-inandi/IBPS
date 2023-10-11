def Array(*dimensions):
    if len(dimensions) < 1:
        return []
    if len(dimensions) == 1:
        return [None] * dimensions[0]
    return [Array(*dimensions[1:]) for _ in range(dimensions[0])]
