import { Injectable } from '@nestjs/common';
import path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class FileService {
  upload(file: Express.Multer.File) {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');

    const filePath = path.join(uploadDir, file.originalname);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(filePath, file.buffer);

    return {
      path: filePath,
    };
  }
}
