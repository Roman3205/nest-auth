import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.db.user.update({
      where: {
        id: userId,
      },
      data: dto,
      omit: { hash: true },
    });

    return user;
  }
}
