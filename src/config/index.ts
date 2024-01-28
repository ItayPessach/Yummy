const env = import.meta.env;

export const config = {
  backendUrl: env.VITE_BACKEND_API_URL,
  defaultPageSize: env.VITE_DEFAULT_PAGE_SIZE,
  uploadFolderUrl: env.VITE_UPLOAD_FOLDER_URL,
  publicFolderUrl: env.VITE_PUBLIC_FOLDER_URL,
  citiesApiUrl: env.VITE_CITIES_API_URL
};
