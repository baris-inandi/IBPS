export const DISK_USAGE_CAP = 2_000_000; // 2 MB compressed
export const MAX_FILE_LENGTH_CHARS = 100_000; // 100 kB uncompressed

export const jsonSizeInBytes = (json: Object): number => {
  return new TextEncoder().encode(JSON.stringify(json)).length;
};

export const jsonExceedsDiskUsageCap = (json: Object): boolean => {
  return jsonSizeInBytes(json) > DISK_USAGE_CAP;
};

