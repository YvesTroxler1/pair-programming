import {calculatePayslip, Salary} from "./payroll";

describe("calculatePayroll", () => {
    it("should not deduct anything for a 16 year old with 700 francs", () => {
        const salary: Salary = {
            born: new Date("2008-03-08"),
            payday: new Date("2025-08-25"),
            gross: 700,
        };

        const payslip = calculatePayslip(salary);
        expect(payslip.deductions.size).toBe(0);
        expect(payslip.totalDeductions).toBe(0);
        expect(payslip.net).toBe(700);
    });
})

it("should deduct AHV.... for an 18 year old with 1200 franke", () => {
    const salary: Salary = {
        born: new Date("2006-03-01"),
        payday: new Date("2025-08-01"),
        gross: 1200,
    };

    const payslip = calculatePayslip(salary);
    expect(payslip.deductions.has("AHV")).toBe(true);
    expect(payslip.deductions.has("IV")).toBe(true);
    expect(payslip.deductions.has("EO")).toBe(true);
    expect(payslip.deductions.has("ALV")).toBe(true);
    expect(payslip.deductions.has("NBU")).toBe(true);
    expect(payslip.deductions.has("PK")).toBe(true);
})