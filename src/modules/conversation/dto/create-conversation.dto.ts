import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'src/common/base/base.dto';

export class CreateConversationDto extends BaseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  recipentId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
