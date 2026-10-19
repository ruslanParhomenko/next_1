import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsNumberString,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class RowShiftDto {
  @IsString()
  id: string;

  @IsString()
  employeeId: string;

  @IsString()
  employee: string;

  @IsString()
  role: string;

  @IsNumberString()
  rate: string;

  @IsNumberString()
  dayHours: string;

  @IsNumberString()
  nightHours: string;

  @IsNumberString()
  totalHours: string;

  @IsNumberString()
  salary: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(31)
  shifts: string[];
}

export class CreateScheduleDto {
  @IsString()
  role: string;

  @IsInt()
  @Min(2025)
  @Max(2050)
  year: number;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RowShiftDto)
  rowShifts: RowShiftDto[];
}
