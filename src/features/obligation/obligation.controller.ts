import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObligationService } from './obligation.service';
import { CreateObligationDto } from './dto/create-obligation.dto';
import { UpdateObligationDto } from './dto/update-obligation.dto';

@Controller('obligation')
export class ObligationController {
  constructor(private readonly obligationService: ObligationService) {}

  @Post()
  create(@Body() createObligationDto: CreateObligationDto) {
    return this.obligationService.create(createObligationDto);
  }

  @Get()
  findAll() {
    return this.obligationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.obligationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObligationDto: UpdateObligationDto) {
    return this.obligationService.update(+id, updateObligationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.obligationService.remove(+id);
  }
}
