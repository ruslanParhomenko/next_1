-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'BARMEN', 'WAITERS', 'COOK', 'DISH', 'SCR', 'CCTV', 'IT', 'CASH', 'TECH', 'DLR', 'MGR');

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "current_rate" DECIMAL(10,2) NOT NULL,
    "employment_date" TIMESTAMP(3) NOT NULL,
    "dismissal_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacation_used" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "count_day" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vacation_used_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "unit" "Role" NOT NULL,
    "year" SMALLINT NOT NULL,
    "month" SMALLINT NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_employee" (
    "id" TEXT NOT NULL,
    "schedule_id" TEXT NOT NULL,
    "employee_shift_id" TEXT NOT NULL,

    CONSTRAINT "schedule_employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_shift" (
    "id" TEXT NOT NULL,
    "year" SMALLINT NOT NULL,
    "month" SMALLINT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "shift" TEXT[],

    CONSTRAINT "employee_shift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_mail_key" ON "employees"("mail");

-- CreateIndex
CREATE INDEX "vacation_used_employee_id_start_date_idx" ON "vacation_used"("employee_id", "start_date");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_unit_year_month_key" ON "schedules"("unit", "year", "month");

-- CreateIndex
CREATE INDEX "schedule_employee_employee_shift_id_idx" ON "schedule_employee"("employee_shift_id");

-- CreateIndex
CREATE UNIQUE INDEX "schedule_employee_schedule_id_employee_shift_id_key" ON "schedule_employee"("schedule_id", "employee_shift_id");

-- CreateIndex
CREATE INDEX "employee_shift_employee_id_idx" ON "employee_shift"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_shift_employee_id_year_month_key" ON "employee_shift"("employee_id", "year", "month");

-- AddForeignKey
ALTER TABLE "vacation_used" ADD CONSTRAINT "vacation_used_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_employee" ADD CONSTRAINT "schedule_employee_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_employee" ADD CONSTRAINT "schedule_employee_employee_shift_id_fkey" FOREIGN KEY ("employee_shift_id") REFERENCES "employee_shift"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_shift" ADD CONSTRAINT "employee_shift_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
