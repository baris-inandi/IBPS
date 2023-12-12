export const DISK_USAGE_CAP_BYTES = 2_000_000; // 2 MB
export const MAX_FILE_LENGTH_BITS = 100_000; // 100 kb

export const jsonSizeInBytes = (json: Object): number => {
    return new TextEncoder().encode(JSON.stringify(json)).length;
};

export const jsonExceedsDiskUsageCap = (json: Object): boolean => {
    return jsonSizeInBytes(json) > DISK_USAGE_CAP_BYTES;
};

export const fileExceedsFileDiskUsageCap = (content: string): boolean => {
    return new TextEncoder().encode(content).length > MAX_FILE_LENGTH_BITS;
};
