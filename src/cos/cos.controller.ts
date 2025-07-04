import { Body, Controller, Post } from '@nestjs/common';
import { CosService } from './cos.service';
import { SignatureDto } from './dto';

@Controller('cos')
export class CosController {
  constructor(private readonly cosService: CosService) {}

  @Post('signature')
  getCosSignature(@Body() signatureDto: SignatureDto) {
    return this.cosService.getSignature(signatureDto.dir);
  }
}
