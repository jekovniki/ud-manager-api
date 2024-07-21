import { Injectable } from '@nestjs/common';
import { CreateObligationDto } from './dto/create-obligation.dto';
import { UpdateObligationDto } from './dto/update-obligation.dto';

@Injectable()
export class ObligationService {
  create(createObligationDto: CreateObligationDto) {
    return 'This action adds a new obligation';
  }

  findAll() {
    return `This action returns all obligation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} obligation`;
  }

  update(id: number, updateObligationDto: UpdateObligationDto) {
    return `This action updates a #${id} obligation`;
  }

  remove(id: number) {
    return `This action removes a #${id} obligation`;
  }
}
