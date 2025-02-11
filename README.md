# 资料

https://developer.aliyun.com/article/1320648

# ts 类

```ts
export namespace OSS {
  // 接口拿到的签名
  export interface Signature {
    expire: string;
    policy: string;
    signature: string;
    accessId: string;
    host: string;
    dir: string;
  }

  export interface GetOSSSignatureParams {
    fileType: 'image' | 'pdf' | 'mp4';
  }
}
```

# 上传动作

```ts
// 获取签名
const signatureImgRes = await getOSSSignature({ fileType: 'image' });

// 上传组件的自动上传链接
imgAction.value = signatureImgRes.data.host;

// 文件摘要生成文件名
const imgUrlKey = generateFileName(
  signatureImgRes.data,
  uploadRawFileImg.value,
);

// 生成文件名，作为 key 使用
const generateFileName = (ossData, file) => {
  const suffix = file.name.slice(file.name.lastIndexOf('.'));
  const filename = Date.now() + suffix;
  return ossData.dir + filename;
};

extraImgData.value = {
  key: imgUrlKey,
  OSSAccessKeyId: signatureImgRes.data.accessId,
  policy: signatureImgRes.data.policy,
  signature: signatureImgRes.data.signature,
  success_action_status: '200',
};

form.imageUrl = imgAction.value + '/' + imgUrlKey;

// 触发组件的提交动作
uploadImg.value!.submit();
```
