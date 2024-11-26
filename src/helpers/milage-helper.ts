const MILAGE_DEDUCTION: { year: number; deduction: number }[] = [
  {
    year: 2023,
    deduction: 65.5,
  },
  {
    year: 2024,
    deduction: 67,
  },
];

export const getMilageInfo = (year: number) =>
  MILAGE_DEDUCTION.find((milageInfo) => milageInfo.year === year);
