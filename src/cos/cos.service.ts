import { Injectable } from '@nestjs/common';
import * as COS from 'cos-nodejs-sdk-v5';
import * as dayjs from 'dayjs';
import * as STS from 'qcloud-cos-sts';

@Injectable()
export class CosService {
  private readonly cos: COS;

  constructor() {
    this.cos = new COS({
      SecretId: process.env.COS_SECRET_ID,
      SecretKey: process.env.COS_SECRET_KEY,
    });
  }

  async getSignature(dir: string) {
    const config = {
      bucket: 'outfitvue-1305592523',
      region: 'ap-guangzhou',
      dir: `${dir}/`,
    };

    // 生成策略
    const policy = {
      version: '2.0',
      statement: [
        {
          action: ['name/cos:PostObject'],
          effect: 'allow',
          resource: `qcs::cos:${config.region}:uid/1305592523:${config.bucket}/*`,
          condition: {
            numeric_greater_than_equal: { 'q-cos-content-length-range': 0 },
            numeric_less_than_equal: {
              'q-cos-content-length-range': 10485760000,
            },
          },
        },
      ],
    };
    // 生成临时密钥
    const stsConfig = {
      secretId: process.env.COS_SECRET_ID,
      secretKey: process.env.COS_SECRET_KEY,
      proxy: '',
      durationSeconds: 3600,
      bucket: config.bucket,
      region: config.region,
      policy: policy,
    };

    const tempKeys = await new Promise<any>((resolve, reject) => {
      STS.getCredential(stsConfig, (err, tempKeys) => {
        if (err) {
          reject(err);
        } else {
          resolve(tempKeys);
        }
      });
    });

    return {
      expire: dayjs().add(1, 'days').unix().toString(),
      credentials: tempKeys.credentials,
      host: `${config.bucket}.cos.${config.region}.myqcloud.com`,
      dir: config.dir,
    };
  }
}
