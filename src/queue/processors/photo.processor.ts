import { Processor, WorkerHost } from '@nestjs/bullmq';
import { QUEUES } from '../queue.constants';
import { MyLoggerService } from '../../logger/logger-service';
import { Job } from 'bullmq';

@Processor(QUEUES.PHOTO)
export class PhotoProcessor extends WorkerHost {
  constructor(private readonly logger: MyLoggerService) {
    super();
  }

  async process(job: Job) {
    console.log(`Processing ${job.data.id}`);
    this.logger.log(`Starting Processing photo ${job.data.id}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    this.logger.log(`Processing job Done ${job.data.id}`);
    return {
      job: job.data.id,
      status: 'success',
    };
  }
}
