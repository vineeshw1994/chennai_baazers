import DataURIParser from "datauri/parser.js";
import path from "path";

const parser = new DataURIParser();

export const getDataUris = (file) => {
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer).content; // Ensure you return the content property
};

export const getDataUri = (file) => {
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};
