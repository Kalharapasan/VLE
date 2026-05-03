import { API_URL } from '../components/Service/api';

const STORAGE_BASE_URL = (import.meta.env.VITE_STORAGE_URL || API_URL).replace(/\/api\/?$/, '');

export function resolveStorageUrl(path) {
  if (!path) {
    return '';
  }

  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) {
    return path;
  }

  const normalizedPath = path.replace(/^\/+/, '').replace(/^storage\//, '');
  return `${STORAGE_BASE_URL}/storage/${normalizedPath}`;
}