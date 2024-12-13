import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/db/prisma/prisma.service';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { UpdateArticleDto } from '../dtos/update-article.dto';
import { SearchArticleDto } from '../dtos/search-article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        imageUrl: createArticleDto.imageUrl,
        author: {
          connect: {
            id: createArticleDto.author,
          },
        },
        created_at: new Date().toISOString(),
      },
    });
  }

  async findAll(searchArticleDto: SearchArticleDto) {
    const { term } = searchArticleDto;

    return this.prisma.article.findMany({
      where: {
        ...(term
          ? {
              OR: [
                { title: { contains: term, mode: 'insensitive' } },
                { content: { contains: term, mode: 'insensitive' } },
                {
                  author: {
                    username: { contains: term, mode: 'insensitive' },
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }

  async update(
    currentAuthorId: string,
    id: string,
    updateArticleDto: UpdateArticleDto,
  ) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      select: { author: true },
    });

    if (article.author.id !== currentAuthorId) {
      throw new ForbiddenException(
        'You are not authorized to update this article',
      );
    }

    return this.prisma.article.update({
      where: { id },
      data: {
        title: updateArticleDto.title,
        content: updateArticleDto.content,
        imageUrl: updateArticleDto.imageUrl,
        updated_at: new Date().toISOString(),
      },
    });
  }

  async remove(currentAuthorId: string, id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      select: { author: true },
    });

    // Check if the current author is the same as the article's author
    if (article.author.id !== currentAuthorId) {
      throw new ForbiddenException(
        'You are not authorized to delete this article',
      );
    }

    return this.prisma.article.delete({
      where: { id },
    });
  }

  async findByAuthor(authorId: string) {
    return this.prisma.article.findMany({
      where: {
        author: {
          id: authorId,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
