import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BaseDto } from '../../../common/base/base.dto';
import { DayOfWeekEnum, RegrexEnum } from '../../../common/enums/time.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserService } from '../../user/user.service';
import { RoleEnum } from '../../../common/enums/role.enum';
import { BadRequestException, Inject } from '@nestjs/common';
import { ErrorMsgEnum } from '../../../common/enums/errorMessage.enum';
import { ModuleRef } from '@nestjs/core';

//@ValidatorConstraint({ name: 'ValidateProvider', async: true })
//export class ValidateProvider implements ValidatorConstraintInterface {
//  constructor(@Inject(ModuleRef) private moduleRef: ModuleRef) {}

//  async validate(value: number): Promise<boolean> {
//    const userService = this.moduleRef.get<UserService>(UserService, {
//      strict: false,
//    });
//    const provider = await userService.getById(value);
//    if (!provider || provider.role.roleName !== RoleEnum.PROVIDER) return false;
//    return true;
//  }
//  defaultMessage?(): string {
//    throw new BadRequestException(ErrorMsgEnum.NOT_PROVIDER);
//  }
//}
export class CreateScheduleDto extends BaseDto {
  @IsNotEmpty()
  @IsEnum(DayOfWeekEnum)
  dayOfWeek: DayOfWeekEnum;

  @IsOptional()
  @IsString()
  @Matches('^(0[0-9]|1[0-9]|2[0-3]):([03]0)$')
  @Length(5, 5)
  openHour: string;

  @IsOptional()
  @IsString()
  @Matches('^(0[0-9]|1[0-9]|2[0-3]):([03]0)$')
  @Length(5, 5)
  closeHour: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isOpenAll: boolean;

  @IsNotEmpty()
  @IsNumber()
  //@Validate(ValidateProvider)
  providerId: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
