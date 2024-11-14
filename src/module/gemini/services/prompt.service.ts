import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import {
  FileMetadata,
  GoogleAIFileManager,
} from '@google/generative-ai/server';
import { Injectable } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class PromptService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: GenerativeModel;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });
  }

  async generateResponseByPrompt(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);

      console.log(result.response.text());
      return result.response.text();
    } catch (error) {
      throw error;
    }
  }

  async generateResponseByPromptAndImage(
    prompt: string,
    image: Express.Multer.File,
  ): Promise<string> {
    try {
      const base64Image = image.buffer.toString('base64');
      const imagePart = this.fileToGenerativePart(base64Image, image.mimetype);

      const result = await this.model.generateContent([prompt, imagePart]);

      return result.response.text();
    } catch (error) {
      return error;
    }
  }

  private fileToGenerativePart(data, mimeType) {
    return {
      inlineData: {
        data: data,
        mimeType: mimeType,
      },
    };
  }
}
