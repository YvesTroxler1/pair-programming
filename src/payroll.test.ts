import {calculatePayslip, Salary} from "./payroll";

describe("calculatePayroll", () => {
    it("should not deduct anything for a 16 year old with 700 francs", () => {
        const salary: Salary = {
            born: new Date("2008-03-08"),
            payday: new Date("2025-25-08"),
            gross: 700,
        };

        const payslip = calculatePayslip(salary);
        expect(payslip.deductions.size).toBe(0);
        expect(payslip.totalDeductions).toBe(0);
        expect(payslip.net).toBe(700);
    });
});