import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClerkClient, verifyToken } from '@clerk/backend';

@Injectable()
export class ClerkService implements OnModuleInit {
  private clerkClient: ReturnType<typeof createClerkClient>;

  onModuleInit() {
    this.clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY!,
    });
  }

  async getUser(userId: string) {
    return await this.clerkClient.users.getUser(userId);
  }

  async verifyToken(token: string) {
    const { payload } = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });
    return payload;
  }
}
