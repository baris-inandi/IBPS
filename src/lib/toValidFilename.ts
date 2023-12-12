const toValidFilename = (
    currentFiles: Array<string>,
    filename: string,
): string => {
    let f = filename.trim();
    if (f.length === 0) f = "Untitled";
    let validFilename = f.replace("\n", "");
    let i = 0;
    while (
        currentFiles.includes(validFilename) ||
        validFilename === "Welcome" ||
        validFilename === "Documentation"
    ) {
        i += 1;
        validFilename = `${f} (${i})`;
    }
    return validFilename;
};

export default toValidFilename;
