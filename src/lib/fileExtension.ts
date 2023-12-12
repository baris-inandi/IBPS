export const fileExtension = (name: string) => {
    if (!name.endsWith(".ibps")) {
        return name + ".ibps";
    }
    return name;
};

