import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const MediaUpload = ({ pantallaSeleccionada, onFilesChange }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const processFiles = async () => {
      const validFiles = [];
      for (const file of acceptedFiles) {
        if (file.type.startsWith('image/')) {
          const isValid = await validateImage(file);
          if (isValid) validFiles.push(file);
        } else if (file.type.startsWith('video/')) {
          const isValid = await validateVideo(file);
          if (isValid) validFiles.push(file);
        }
      }
      setFiles(validFiles);
      onFilesChange(validFiles);
    };

    processFiles();
  }, [pantallaSeleccionada, onFilesChange]);

  const validateImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const [requiredWidth, requiredHeightWithP] = pantallaSeleccionada.medidas_pantalla.split('x');
        const requiredHeight = parseInt(requiredHeightWithP.slice(0, -1));
        if (img.width !== parseInt(requiredWidth) || img.height !== requiredHeight) {
          alert(`La imagen ${file.name} no coincide con las dimensiones requeridas (${pantallaSeleccionada.medidas_pantalla})`);
          URL.revokeObjectURL(img.src);
          resolve(false);
        } else {
          URL.revokeObjectURL(img.src);
          resolve(true);
        }
      };
    });
  };

  const validateVideo = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        if (video.duration > pantallaSeleccionada.duracion_pantalla) {
          alert(`El video ${file.name} excede la duración máxima de ${pantallaSeleccionada.duracion_pantalla} segundos`);
          URL.revokeObjectURL(video.src);
          resolve(false);
        } else {
          URL.revokeObjectURL(video.src);
          resolve(true);
        }
      };
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxSize: 100 * 1024 * 1024, // 100MB tamaño máximo de archivo
  });

  return (
    <div>
      <div style={warningStyles}>
        <p>Advertencia:</p>
        <ul>
          <li>Las imágenes deben tener un tamaño de {pantallaSeleccionada.medidas_pantalla} píxeles.</li>
          <li>Los videos deben durar menos de {pantallaSeleccionada?.duracion_pantalla || 'X'} segundos.</li>
        </ul>
      </div>
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

const warningStyles = {
  backgroundColor: '#fff3cd',
  border: '1px solid #ffeeba',
  color: '#856404',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '4px',
};

export default MediaUpload;