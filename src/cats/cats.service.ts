import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ){}

  async create(createCatDto: CreateCatDto) {
    const cat = this.catRepository.create(createCatDto);
    return await this.catRepository.save(cat);
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    return this.catRepository.update(id, updateCatDto);
  }

  async remove(id: number) {
    return await this.catRepository.softRemove({id});
  }
}
