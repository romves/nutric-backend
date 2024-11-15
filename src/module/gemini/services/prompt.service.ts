import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import {
  FileMetadata,
  GoogleAIFileManager,
} from '@google/generative-ai/server';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';

@Injectable()
export class PromptService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: GenerativeModel;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing or invalid');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
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
