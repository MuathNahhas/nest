import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { QUEUES } from '../queue.constants';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(@InjectQueue(QUEUES.PHOTO) private readonly photoQueue: Queue) {}

  async addPhotoToQueue(photoId: number) {
    await this.photoQueue.add('resize', { id: photoId });
  }
}
