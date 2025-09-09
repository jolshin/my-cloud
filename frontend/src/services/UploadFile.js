import api from "../api";
import { useState, useCallback } from 'react';

export default function useFileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadData, setUploadData] = useState(null);

  const uploadFile = useCallback(async (data) => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const axiosConfig = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setUploadProgress(percentage);
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await api.post(`/api/files/`, data, axiosConfig);
      setUploadData(res.data);
      return res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Ошибка при загрузке файла';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setUploadProgress(0);
    setIsUploading(false);
    setError(null);
    setUploadData(null);
  }, []);

  return {
    uploadFile,
    uploadProgress,
    isUploading,
    error,
    uploadData,
    reset
  };
}
