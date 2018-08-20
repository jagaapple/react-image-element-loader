// =============================================================================================================================
// SRC - FILE UTILITIES
// =============================================================================================================================
import * as mime from "mime";

export const getExtension = (filePath: string) => {
  const mimeType = mime.getType(filePath) || "";

  return mime.getExtension(mimeType);
};

export const generateURI = (source: Buffer, filePath: string) => {
  const base64URI = source.toString("base64");
  const imageMimeType = mime.getType(filePath) || "";

  return `data:${imageMimeType};base64,${base64URI}`;
};
