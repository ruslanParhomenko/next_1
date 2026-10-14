import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    const { vacation, ...employeeData } = createEmployeeDto;

    return this.prisma.employee.create({
      data: {
        ...employeeData,
        employmentDate: new Date(createEmployeeDto.employmentDate),
        dismissalDate:
          createEmployeeDto.dismissalDate &&
          new Date(createEmployeeDto.dismissalDate),

        vacation: {
          create: (vacation ?? []).map((item) => ({
            startDate: new Date(item.startDate),
            endDate: new Date(item.endDate),
          })),
        },
      },
      include: {
        vacation: true,
      },
    });
  }

  findAll() {
    return this.prisma.employee.findMany({
      include: {
        vacation: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
