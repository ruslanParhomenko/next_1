import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({ data: createEmployeeDto });
  }

  findAll() {
    return this.prisma.employee.findMany();
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
