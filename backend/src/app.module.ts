import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ClerkService } from 'src/clerk/clerk.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ImagekitModule } from './imagekit/imagekit.module';
import { PostController } from './post/post.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    ImagekitModule,
  ],
  controllers: [AppController, UserController, PostController],
  providers: [AppService, ClerkService],
})
export class AppModule {}
