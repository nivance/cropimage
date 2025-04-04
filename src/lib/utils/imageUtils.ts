/**
 * Loads an image from a URL or File and returns an HTMLImageElement
 */
export const loadImage = (src: string | File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);

    if (typeof src === 'string') {
      img.src = src;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          img.src = e.target.result as string;
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(src);
    }
  });
};

/**
 * Creates a data URL from a canvas
 */
export const createImageFromCanvas = (
  canvas: HTMLCanvasElement,
  format: string = 'image/jpeg',
  quality: number = 0.95
): string => {
  return canvas.toDataURL(format, quality);
};

/**
 * Converts a base64 string to a Blob
 */
export const dataURLToBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');
  if (arr.length < 2) {
    throw new Error('Invalid data URL');
  }

  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

/**
 * Converts a base64 string to a File
 */
export const dataURLToFile = (dataURL: string, filename: string): File => {
  const blob = dataURLToBlob(dataURL);
  return new File([blob], filename, { type: blob.type });
};

/**
 * Creates a downloadable image from a data URL
 */
export const downloadImage = (dataURL: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  link.click();
};

/**
 * Creates a URL from a File or Blob
 */
export const createObjectURL = (file: File | Blob): string => {
  return URL.createObjectURL(file);
};

/**
 * Revokes a URL created by createObjectURL
 */
export const revokeObjectURL = (url: string): void => {
  URL.revokeObjectURL(url);
};

/**
 * Applies a crop to an image canvas
 */
export const cropImage = (
  image: HTMLImageElement,
  crop: { x: number, y: number, width: number, height: number },
  flip = { horizontal: false, vertical: false },
  rotation = 0
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // 设置画布尺寸为裁剪区域大小
  canvas.width = crop.width;
  canvas.height = crop.height;

  // 应用变换
  ctx.save();
  
  // 移动到画布中心进行旋转
  ctx.translate(canvas.width / 2, canvas.height / 2);
  
  // 应用旋转（转换为弧度）
  ctx.rotate((rotation * Math.PI) / 180);
  
  // 应用翻转
  ctx.scale(
    flip.horizontal ? -1 : 1,
    flip.vertical ? -1 : 1
  );

  // 绘制图像
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  // 恢复画布上下文
  ctx.restore();

  return canvas;
};

/**
 * Applies a shaped mask to an image canvas (circle, heart, etc.)
 */
export const applyCropMask = (
  canvas: HTMLCanvasElement,
  shape: 'rect' | 'circle' | 'heart' | 'square' | 'polygon',
  aspectRatio?: number
): HTMLCanvasElement => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  const width = canvas.width;
  const height = canvas.height;

  // Create a temporary canvas with the same dimensions
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempCtx = tempCanvas.getContext('2d');

  if (!tempCtx) {
    throw new Error('Could not get temporary canvas context');
  }

  // Copy the original image to the temporary canvas
  tempCtx.drawImage(canvas, 0, 0);

  // Clear the original canvas
  ctx.clearRect(0, 0, width, height);

  // Create path based on shape
  ctx.beginPath();

  if (shape === 'circle') {
    if (aspectRatio && aspectRatio !== 1) {
      // Draw an ellipse
      const centerX = width / 2;
      const centerY = height / 2;
      const radiusX = width / 2;
      const radiusY = height / 2;
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    } else {
      // Draw a circle
      const radius = Math.min(width, height) / 2;
      ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
    }
  } else if (shape === 'square') {
    const size = Math.min(width, height);
    const x = (width - size) / 2;
    const y = (height - size) / 2;
    ctx.rect(x, y, size, size);
  } else if (shape === 'heart') {
    // Draw a heart shape
    const scale = Math.min(width, height) / 100;
    ctx.moveTo(width / 2, height / 4 + height / 5);

    // Left curve
    ctx.bezierCurveTo(
      width / 8, height / 10,
      width / 12, height / 2,
      width / 2, height * 0.85
    );

    // Right curve
    ctx.bezierCurveTo(
      width - width / 12, height / 2,
      width - width / 8, height / 10,
      width / 2, height / 4 + height / 5
    );
  } else if (shape === 'polygon') {
    // Draw a hexagon
    const radius = Math.min(width, height) / 2;
    const sides = 6; // Number of sides

    ctx.moveTo(
      width / 2 + radius * Math.cos(0),
      height / 2 + radius * Math.sin(0)
    );

    for (let i = 1; i <= sides; i++) {
      const angle = (i * 2 * Math.PI) / sides;
      ctx.lineTo(
        width / 2 + radius * Math.cos(angle),
        height / 2 + radius * Math.sin(angle)
      );
    }
  } 

  ctx.closePath();
  ctx.clip();

  // Draw the image from the temp canvas back to the original canvas
  ctx.drawImage(tempCanvas, 0, 0);

  return canvas;
};

/**
 * Converts a file from one format to another
 */
export const convertImageFormat = async (
  file: File,
  targetFormat: string,
  quality: number = 0.95
): Promise<File> => {
  try {
    const image = await loadImage(file);

    // Create a canvas with the image dimensions
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image on the canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    ctx.drawImage(image, 0, 0);

    // Convert to the target format
    let mimeType;
    switch (targetFormat.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        mimeType = 'image/jpeg';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      case 'webp':
        mimeType = 'image/webp';
        break;
      default:
        mimeType = 'image/jpeg';
    }

    // Get the data URL
    const dataURL = canvas.toDataURL(mimeType, quality);

    // Get the file extension
    const extension = mimeType.split('/')[1];

    // Create a new filename
    const newFilename = file.name.split('.')[0] + '.' + extension;

    // Convert to a File object
    return dataURLToFile(dataURL, newFilename);
  } catch (error) {
    console.error('Error converting image:', error);
    throw error;
  }
};
