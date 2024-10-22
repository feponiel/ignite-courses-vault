import { Uploader } from '@/domain/forum/application/storage/uploader'
import { Module } from '@nestjs/common'
import { R2Storage } from './r2-storage'
import { EnvModule } from '../env/env.module'

@Module({
  providers: [
    {
      provide: Uploader,
      useClass: R2Storage,
    },
  ],

  imports: [EnvModule],
  exports: [Uploader],
})
export class StorageModule {}
