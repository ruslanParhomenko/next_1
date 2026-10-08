import { Controller } from '@nestjs/common';
import { LlmService } from './llm.service.js';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}
}
