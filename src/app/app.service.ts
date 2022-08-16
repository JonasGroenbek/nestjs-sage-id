import { Injectable } from '@nestjs/common';
import { SageIdService } from 'src/lib/sage-id.service';

@Injectable()
export class AppService {
  constructor(private readonly sageIdService: SageIdService) {}
}
