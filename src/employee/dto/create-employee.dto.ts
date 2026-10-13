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
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../../generated/prisma/client.js';
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
}
