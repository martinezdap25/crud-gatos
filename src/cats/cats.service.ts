import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import ActiveUserInterface from 'src/common/interface/user-active-interface';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) { }

  async create(createCatDto: CreateCatDto, user: ActiveUserInterface) {
    const breed = await this.validateBreed(createCatDto.breed);
    return await this.catRepository.save({
      ...createCatDto,
      breed,
      userEmail: user.email
    });
  }

  async findAll(user: ActiveUserInterface) {
    return await this.catRepository.find({
      where: {
        userEmail: user.email
      }
    });
  }

  async findOne(id: number, user: ActiveUserInterface) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    this.validateOwnership(user, cat);
    return cat
  }

  async update(id: number, updateCatDto: UpdateCatDto, user: ActiveUserInterface) {
    await this.findOne( id, user);
    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.validateBreed( updateCatDto.breed ) : undefined,
      userEmail: user.email
    });
  }

  async remove(id: number, user: ActiveUserInterface) {
    await this.findOne( id, user);
    return await this.catRepository.softRemove({ id });
  }

  private validateOwnership(user: ActiveUserInterface, cat: Cat) {
    if (cat.userEmail !== user.email && user.role !== Role.Admin.toString()) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  private async validateBreed(breed: string | undefined) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });
    if (!breedEntity) {
      throw new NotFoundException('Breed not found');
    }
    return breedEntity;
  }
}
