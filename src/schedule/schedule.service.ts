import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateScheduleDto } from './dto/create-schedule.dto.js';
import { $Enums } from '../generated/prisma/client.js';

const toInt = (v: string | number): number => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? n : 0;
};

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async findByQuery(query: { month: number; year: number; tab: string }) {
    const { month, year, tab } = query;
    const unit = tab.toUpperCase() as $Enums.Role;

    const schedule = await this.prisma.schedule.findUnique({
      where: {
        unit_year_month: { unit, year, month },
      },
      include: {
        employees: {
          include: {
            employeeShift: {
              include: {
                employee: true,
              },
            },
          },
        },
      },
    });

    if (!schedule) return null;

    return {
      ...schedule,
      employees: schedule.employees.map(({ employeeShift }) => ({
        ...employeeShift.employee,
        shift: employeeShift.shift,
        rate: employeeShift.rate,
        dayHours: employeeShift.dayHours,
        nightHours: employeeShift.nightHours,
        salary: employeeShift.salary,
      })),
    };
  }

  create(dtoCreate: CreateScheduleDto) {
    const { year, month, role, rowShifts } = dtoCreate;

    const unit = role as $Enums.Role;

    return this.prisma.$transaction(async (tx) => {
      const schedule = await tx.schedule.upsert({
        where: { unit_year_month: { unit, year, month } },
        create: { unit, year, month },
        update: {},
        select: { id: true },
      });

      const shiftIds: string[] = [];

      for (const row of rowShifts) {
        const data = {
          shift: row.shifts,
          rate: toInt(row.rate),
          dayHours: toInt(row.dayHours),
          nightHours: toInt(row.nightHours),
          salary: toInt(row.salary),
        };

        const employee = await tx.employeeShift.upsert({
          where: {
            employeeId_year_month: { employeeId: row.employeeId, year, month },
          },
          create: { employeeId: row.employeeId, year, month, ...data },
          update: data,
          select: { id: true },
        });

        shiftIds.push(employee.id);
      }

      await tx.scheduleEmployee.deleteMany({
        where: {
          scheduleId: schedule.id,
          employeeShiftId: { notIn: shiftIds },
        },
      });
      await tx.scheduleEmployee.createMany({
        data: shiftIds.map((employeeShiftId) => ({
          scheduleId: schedule.id,
          employeeShiftId,
        })),
        skipDuplicates: true,
      });

      return { scheduleId: schedule.id, saved: shiftIds.length };
    });
  }
}
