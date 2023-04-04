import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('download')
export class DownloadController {
  @Get(':fileName')
  downloadFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const file = `${__dirname}/../../uploads/${fileName}`;
    console.log(file);
    fs.readFile(file, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send(err.message);
      } else {
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=${fileName}`,
        );
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(data);
      }
    });
  }
}
