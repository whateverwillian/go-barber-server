import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempPath = path.resolve(__dirname, '..', '..', 'temp');

export default {
  tempPath,
  uploadsFolder: path.resolve(tempPath),

  storage: multer.diskStorage({
    destination: tempPath,
    filename(request, file, callback) {
      const hashedFile = crypto.randomBytes(10).toString('hex');
      const fileName = `${hashedFile}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
