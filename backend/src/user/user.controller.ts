import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClerkService } from 'src/clerk/clerk.service';
import { ImagekitService } from 'src/imagekit/imagekit.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly clerkService: ClerkService,
    private readonly imagekitService: ImagekitService,
    private readonly prisma: PrismaService,
  ) {}

  // @Get('/:id')
  // async getUser(@Param('id') userId: string) {
  //   const user = await this.clerkService.getUser(userId);

  //   return {
  //     id: user.id,
  //     email: user.emailAddresses[0]?.emailAddress,
  //     fullName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
  //     username: user.username,
  //     createdAt: user.createdAt,
  //   };
  // }

  @Post('/setProfile')
  @UseInterceptors(FileInterceptor('avatar'))
  async setProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    try {
      let imageUrl = body.avatar;
      if (file) {
        const uploadResponse = await this.imagekitService.uploadFile(file);
        imageUrl = uploadResponse.url;
      } else if (!imageUrl || !imageUrl.startsWith('http')) {
        throw new Error('No valid image provided: must send file or image URL');
      }

      const existingUser = await this.prisma.user.findFirst({
        where: { email: body.email },
      });

      if (existingUser) {
        throw new ForbiddenException({
          errors: { userId: 'User already exists' },
        });
      }

      const existingUserName = await this.prisma.user.findFirst({
        where: { userName: body.userName },
      });

      if (existingUserName) {
        throw new BadRequestException({
          errors: { userName: 'Sorry, this username is taken.' },
        });
      } else {
        await this.prisma.user.create({
          data: {
            userId: body.userId,
            userName: body.userName,
            fullName: body.fullName,
            email: body.email,
            bio: body.bio,
            avatar: imageUrl,
          },
        });
      }

      return {
        message: { userName: body.userName, avatar: imageUrl, bio: body.bio },
      };
    } catch (err) {
      console.error('Error in setProfile:', err);
      throw err;
    }
  }

  @Get('/check-auth/:userId')
  async checkAuth(@Param('userId') userId: string) {
    const user = await this.prisma.user.findFirst({ where: { userId } });
    console.log(user);

    if (user) return user;
    return false;
  }

  @Post('/editProfile')
  async editProfile(@Body() body: any) {
    try {
      console.log('body:', body);

      const updatedLikes = await this.prisma.like.updateMany({
        where: { userId: body.userId },
        data: {
          username: body.userName,
          avatar: body.avatar,
        },
      });

      const updatedComments = await this.prisma.comment.updateMany({
        where: { userId: body.userId },
        data: {
          username: body.userName,
          avatar: body.avatar,
        },
      });

      const updatedUser = await this.prisma.user.update({
        where: { userId: body.userId },
        data: {
          userName: body.userName,
          bio: body.bio,
          avatar: body.avatar,
        },
      });

      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to update profile');
    }
  }

  @Get('/search')
  async searchUsers(@Query('query') query: string) {
    if (!query || !query.trim()) {
      throw new BadRequestException('Query parameter is required');
    }

    try {
      console.log('query:', query);

      const users = await this.prisma.user.findMany({
        where: {
          OR: [
            { userName: { contains: query, mode: 'insensitive' } },
            { fullName: { contains: query, mode: 'insensitive' } },
            { userName: { startsWith: query, mode: 'insensitive' } },
            { fullName: { startsWith: query, mode: 'insensitive' } },
            { userName: { endsWith: query, mode: 'insensitive' } },
            { fullName: { endsWith: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          userId: true,
          userName: true,
          fullName: true,
          avatar: true,
        },
        take: 10,
      });

      console.log('users:', users);

      return { users };
    } catch (error) {
      console.error('User search error:', error);
      throw new InternalServerErrorException('Server error');
    }
  }
}
