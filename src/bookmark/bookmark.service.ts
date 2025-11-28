import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly db: DatabaseService) {}

  getAll(userId: number) {
    return this.db.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  async getOne(userId: number, bookmarkId: number) {
    const bookmark = await this.db.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    return bookmark;
  }

  create(userId: number, dto: CreateBookmarkDto) {
    return this.db.bookmark.create({
      data: {
        userId: userId,
        ...dto,
      },
    });
  }

  async editOne(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
    const bookmark = await this.db.bookmark.findUnique({
      where: {
        id: bookmarkId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!bookmark) {
      throw new NotFoundException('Your bookmark not found');
    }

    return this.db.bookmark.update({
      where: {
        id: bookmark.id,
      },
      data: dto,
    });
  }

  async deleteOne(userId: number, bookmarkId: number) {
    const bookmark = await this.db.bookmark.findUnique({
      where: {
        id: bookmarkId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!bookmark) {
      throw new NotFoundException('Your bookmark not found');
    }

    return this.db.bookmark.delete({
      where: {
        id: bookmark.id,
        userId,
      },
    });
  }
}
