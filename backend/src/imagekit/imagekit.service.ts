import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import { Express } from 'express';
import { UploadResponse } from 'imagekit/dist/libs/interfaces';

@Injectable()
export class ImagekitService {
  private imagekit: ImageKit;

  constructor() {
    this.imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadResponse> {
    const uploadResponse = await this.imagekit.upload({
      file: file.buffer.toString('base64'), // for buffers (from multer)
      fileName: file.originalname,
    });

    return uploadResponse;
  }

  getAuthParameters() {
    return this.imagekit.getAuthenticationParameters();
  }
}
