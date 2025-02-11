import { Body, Controller, Post } from '@nestjs/common';
import { OssService } from './oss.service';
import { SignatureDto } from './dto';
@Controller('oss')
export class OssController {
  constructor(private oss: OssService) {}

  @Post('signature')
  getOssSignature(@Body() signatureDto: SignatureDto) {
    return this.oss.getSignature(signatureDto.fileType);
  }
}
