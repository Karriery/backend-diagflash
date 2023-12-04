import { Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from 'src/schemas/admins.schemas';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModule : Model<Admin>){}
  create(createAdminDto: CreateAdminDto) {
    return this.adminModule.create(createAdminDto)
  }

   findAll() {
    return this.adminModule.find()
  }

  findOne(_id: string) {
    return this.adminModule.findById({ _id })
  }

  findOneByEmail(email: string) {
    return this.adminModule.findOne({ email })
  }

  update(_id: any, updateAdminDto: UpdateAdminDto) {
    return this.adminModule.updateOne({_id} , updateAdminDto)
  }

  remove(_id: string) {
    return this.adminModule.deleteOne({_id})
  }
}
