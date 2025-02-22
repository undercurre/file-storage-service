// public.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const isPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
