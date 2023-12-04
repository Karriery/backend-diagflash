import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/schemas/admins.schemas';
 
@Module({
  imports : [MongooseModule.forFeature([{name : Admin.name , schema : AdminSchema}])],
  exports : [AdminService],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
