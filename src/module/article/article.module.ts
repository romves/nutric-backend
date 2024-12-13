import { Module } from '@nestjs/common';

import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';

@Module({
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
