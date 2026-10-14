import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../../generated/prisma/client.js';

class VacationDto {
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;
}

export class CreateEmployeeDto {
  @IsEmail()
  mail: string;

  @IsString()
  @IsNotEmpty()
  tel: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  currentRate: number;

  @Type(() => Date)
  @IsDate()
  employmentDate: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dismissalDate?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VacationDto)
  vacation?: VacationDto[];
}
