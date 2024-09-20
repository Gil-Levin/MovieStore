export const compressImage = (width, height, imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          // Set canvas dimensions to desired width and height
          canvas.width = width;
          canvas.height = height;
  
          // Draw the image onto the canvas, scaled to fit 400x600
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convert the canvas image to a base64 string
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 0.7 is the quality level
          resolve(compressedBase64);
        };
  
        img.onerror = (err) => reject(err);
      };
  
      reader.onerror = (err) => reject(err);
  
      // Read the image file as a data URL (base64)
      reader.readAsDataURL(imageFile);
    });
  };
  