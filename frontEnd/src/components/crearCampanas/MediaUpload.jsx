import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const MediaUpload = ({ pantallaSeleccionada }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxSize: 100 * 1024 * 1024, // 100MB tamaño máximo de archivo
  });

  useEffect(() => {
    if (files.length > 0) {
      uploadFiles();
    }
  }, [files]);

  const uploadFiles = async () => {
    const uploadPromises = files.map(async (file) => {
      // Verificar dimensiones del archivo y duración
      if (file.type.startsWith('image/')) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise((resolve) => {
          img.onload = () => {
            if (img.width !== 480 || img.height !== 720) {
              alert(`La imagen ${file.name} no coincide con las dimensiones requeridas (480x720)`);
              return;
            }
            resolve();
          };
        });
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(file);
        await new Promise((resolve) => {
          video.onloadedmetadata = () => {
            if (video.duration > pantallaSeleccionada.duracion_pantalla) {
              alert(`El video ${file.name} excede la duración máxima de ${pantallaSeleccionada.duracion_pantalla} segundos`);
              return;
            }
            resolve();
          };
        });
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      } catch (error) {
        console.error(`Error al subir ${file.name}:`, error);
      }
    });

    const results = await Promise.all(uploadPromises);
    console.log('Resultados de la carga:', results);
    setFiles([]); // Limpiar la lista de archivos después de la carga
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta los archivos aquí ...</p>
        ) : (
          <p>Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar archivos</p>
        )}
      </div>
      <ul>
        {files.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default MediaUpload;