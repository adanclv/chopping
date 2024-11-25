import React, { useState } from 'react';

const UploadImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            console.log(file.name);
        }
    };

    // const handleUpload = async () => {
    //     if (!selectedImage) return;

    //     const formData = new FormData();
    //     formData.append('image', selectedImage);

    //     try {
    //         const response = await fetch('http://localhost:5000/upload', {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             alert('Imagen subida exitosamente: ' + data.filePath);
    //         } else {
    //             alert('Error al subir la imagen.');
    //         }
    //     } catch (error) {
    //         console.error('Error al subir la imagen:', error);
    //     }
    // };

    return (
        <div>
            <input className='img-input' type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && <img src={previewUrl} alt="Previsualización" style={{ width: '200px' }} />}
            {/* <button onClick={handleUpload}>Subir Imagen</button> */}
        </div>
    );
};

export default UploadImage;
