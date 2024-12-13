import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { User as UserT } from '@prisma/client';
import { User } from 'src/common/decorators/user/user.decorator';
import { UpdateArticleDto } from '../dtos/update-article.dto';
import { JwtAuthGuard } from 'src/module/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { SearchArticleDto } from '../dtos/search-article.dto';

@UseGuards(JwtAuthGuard)
@Controller('articles')
@ApiBearerAuth('JWT-auth')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiBody({
    type: CreateArticleDto,
  })
  create(@User() user: UserT, @Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create({
      ...createArticleDto,
      author: user.id
    });
  }

  @Get()
  @ApiQuery({
    name: 'term',
    required: false,
    example: 'How to make a cake',
  })
  findAll(@Query() term: SearchArticleDto) {
    return this.articleService.findAll(term);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    type: UpdateArticleDto,
  })
  update(
   @User() user: UserT, 
    @Param('id') id: string, 
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return this.articleService.update(user.id, id, updateArticleDto);
  }

  @Delete(':id')
  remove(@User() user: UserT, @Param('id') id: string) {
    return this.articleService.remove(user.id, id);
  }

//   @Get('my-articles')
//   findByAuthor(@User() user: UserT) {
//     return this.articleService.findByAuthor(user.id);
//   }
}