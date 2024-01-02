import { PartialType } from '@nestjs/swagger';
import { CreateCardDto } from './createCard.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
