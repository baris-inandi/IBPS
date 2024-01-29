// IA: Recursive function

export const resolveIbpsIncludes = (
    code: string,
    includeStack: string[],
    filesArray: Record<string, string>,
): string => {
    const lines = code.split("\n");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i] ?? "";

        if (line.trim().startsWith("include ")) {
            const split = line.split("include");
            const spaces = split[0] ?? "";
            const includedFilename = split[1]?.trim() ?? "";

            if (!(includedFilename in filesArray)) {
                lines[i] = `### INCLUDE COULDN'T BE RESOLVED ###
${spaces}print(f"IBPS Include Error: No module named '${JSON.stringify(includedFilename).slice(1, -1)}'")
${spaces}raise ImportError("IBPS include couldn't be resolved")
exit(1)
### END INCLUDE ###
`;
                continue;
            } else if (includeStack.includes(includedFilename)) {
                lines[i] = `### INCLUDE COULDN'T BE RESOLVED ###
${spaces}print("IBPS Include Error: Circular import.")
${spaces}raise ImportError("IBPS include couldn't be resolved")
exit(1)
### END INCLUDE ###
`;
                continue;
            }
            let includedCode = filesArray[includedFilename] ?? "";
            includedCode = resolveIbpsIncludes(
                includedCode,
                [...includeStack, includedFilename],
                filesArray,
            );
            includedCode = `### INCLUDE STARTS ###
# included: ${includedFilename}
${includedCode}
### END INCLUDE ###`;
            includedCode = includedCode
                .split("\n")
                .map((x) => spaces + x)
                .join("\n");
            lines[i] = includedCode;
        }
    }
    return lines.join("\n");
};

