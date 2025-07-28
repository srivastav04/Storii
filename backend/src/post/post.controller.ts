import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { ImagekitService } from 'src/imagekit/imagekit.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly imagekitService: ImagekitService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('/create')
  async createPost(@Body() body: any) {
    try {
      const transformedUrl =
        body.mediaType === 'video'
          ? `${body.mediaUrl}?tr=w-480,vc=h264`
          : `${body.mediaUrl}?tr=w-500,h-500,c-maintain_ratio,f-auto,q-80`;
      console.log('userId:', body.userId);
      console.log('transformedUrl:', transformedUrl);
      console.log('bio:', body.bio);
      console.log('mediaType:', body.mediaType);

      const newPost = await this.prisma.post.create({
        data: {
          userId: body.userId,
          bio: body.bio || '',
          mediaUrl: transformedUrl,
          mediaType: body.mediaType,
        },
      });

      return {
        message: 'Post created successfully',
        post: newPost,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to create post');
    }
  }

  @Get('/getPosts')
  async getPosts() {
    try {
      const posts = await this.prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              userName: true,
              avatar: true,
              fullName: true,
            },
          },
          comments: {
            select: {
              id: true,
              text: true,
              createdAt: true,
              username: true,
              avatar: true,
              userId: true,
            },
          },
          likes: {
            select: {
              userId: true,
              username: true,
              fullName: true,
              avatar: true,
            },
          },
        },
      });

      return posts;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to get posts');
    }
  }

  @Post('/addComment')
  async addComment(@Body() body: any) {
    try {
      const newComment = await this.prisma.comment.create({
        data: {
          userId: body.userId,
          username: body.username,
          avatar: body.avatar,
          postId: body.postId,
          text: body.comment,
        },
      });

      return {
        message: 'Comment added successfully',
        comment: newComment,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to add comment');
    }
  }

  @Get('/getUserPosts/:userId')
  async getUserPosts(@Param('userId') userId: string) {
    try {
      console.log(userId);

      const posts = await this.prisma.post.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              userName: true,
              avatar: true,
              fullName: true,
              bio: true,
            },
          },
          comments: {
            select: {
              id: true,
              text: true,
              createdAt: true,
              username: true,
              avatar: true,
              userId: true,
            },
          },
          likes: {
            select: {
              userId: true,
              username: true,
              fullName: true,
              avatar: true,
            },
          },
        },
      });

      const user = await this.prisma.user.findUnique({
        where: { userId: userId },
        select: {
          userName: true,
          avatar: true,
          fullName: true,
          bio: true,
        },
      });

      console.log('user', user);

      return {
        posts: posts,
        user: user,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to get user posts');
    }
  }

  @Get('/getPost/:postId')
  async getPost(@Param('postId') postId: string) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id: postId },
        include: {
          user: {
            select: {
              userName: true,
              avatar: true,
              fullName: true,
              bio: true,
            },
          },
          comments: {
            select: {
              id: true,
              text: true,
              createdAt: true,
              username: true,
              avatar: true,
              userId: true,
            },
          },
          likes: {
            select: {
              postId: true,
              userId: true,
              username: true,
              fullName: true,
              avatar: true,
            },
          },
        },
      });
      console.log(post);

      return post;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to get post');
    }
  }

  @Post('/likePost')
  @Post('like')
  async likePost(@Body() body: any) {
    const { userId, userName, avatar, postId, fullName } = body;

    try {
      // Check if user has already liked the post
      const existingLike = await this.prisma.like.findFirst({
        where: {
          userId,
          postId,
        },
      });

      if (existingLike) {
        // 🧨 Unlike: delete existing like
        await this.prisma.like.delete({
          where: {
            id: existingLike.id,
          },
        });

        return {
          message: 'Like removed (unliked)',
          liked: false,
        };
      } else {
        // ✅ Like: create new like
        const newLike = await this.prisma.like.create({
          data: {
            userId,
            fullName,
            username: userName,
            avatar,
            postId,
          },
        });

        console.log(newLike);

        return {
          message: 'Like added successfully',
          liked: true,
          like: newLike,
        };
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to toggle like');
    }
  }

  @Get('/fetchPost/:postId')
  async fetchPost(@Param('postId') postId: string) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id: postId },
      });
      console.log(post);

      return post;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to fetch post');
    }
  }

  @Post('/updatePost')
  async updatePost(@Body() body: any) {
    try {
      const transformedUrl =
        body.mediaType === 'video'
          ? `${body.mediaUrl}?tr=w-480,vc=h264`
          : `${body.mediaUrl}?tr=w-500,h-500,c-maintain_ratio,f-auto,q-80`;
      const updatedPost = await this.prisma.post.update({
        where: { id: body.postId },
        data: {
          bio: body.bio,
          mediaUrl: transformedUrl,
          mediaType: body.mediaType,
        },
      });
      console.log(updatedPost);

      return {
        message: 'Post updated successfully',
        post: updatedPost,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to update post');
    }
  }
  @Delete('/deletePost/:postId')
  async deletePost(@Param('postId') postId: string) {
    try {
      // 1. Delete likes related to the post
      await this.prisma.like.deleteMany({
        where: { postId },
      });

      // 2. Delete comments related to the post (if any)
      await this.prisma.comment.deleteMany({
        where: { postId },
      });
      // 4. Now safely delete the post
      const deletedPost = await this.prisma.post.delete({
        where: { id: postId },
      });
      return {
        message: 'Post deleted successfully',
        post: deletedPost,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to delete post');
    }
  }

  @Get('/getAllPosts')
  async getAllPosts() {
    try {
      const posts = await this.prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              userId: true,
              userName: true,
              avatar: true,
              fullName: true,
            },
          },
          comments: {
            select: {
              id: true,
              text: true,
              createdAt: true,
              username: true,
              avatar: true,
              userId: true,
            },
          },
          likes: {
            select: {
              userId: true,
              username: true,
              fullName: true,
              avatar: true,
            },
          },
        },
      });

      const users = await this.prisma.user.findMany({
        select: {
          userId: true,
          userName: true,
          avatar: true,
          fullName: true,
        },
      });
      console.log(posts);
      return { posts, users };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to fetch posts');
    }
  }
}
