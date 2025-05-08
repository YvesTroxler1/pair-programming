export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

export function calculatePayslip(salary: Salary): Payslip {
  // TODO: implement
  const result: Payslip = {
    salary: salary,
    deductions: new Map(),
    totalDeductions: 0.0,
    net: salary.gross,
  };
  const monthly = salary.gross;
  const yearly = monthly * 12;

  const after17thBirthday = new Date(salary.born.getFullYear() + 17, salary.born.getMonth(), salary.born.getDate());
  const deductionStart = new Date(after17thBirthday.getFullYear() + 1, 0, 1);
  const socialDeductionsAllowed = salary.payday >= deductionStart;

  if (socialDeductionsAllowed) {
    for (const key of ["AHV", "IV", "EO", "ALV", "NBU", "PK"]) {
      const rate = DEDUCTION_RATES.get(key) / 100;
      const amount = monthly * rate;
      result.deductions.set(key, amount);
        result.totalDeductions += amount;
    }
  }

  return result;
}