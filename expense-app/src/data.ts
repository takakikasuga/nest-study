export const MappedReport = {
  income: 'income',
  expense: 'expense',
} as const;

export const data: DataType = {
  report: [
    {
      id: 'uuid1',
      source: 'Salary',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: MappedReport.income,
    },
    {
      id: 'uuid2',
      source: 'YouTube',
      amount: 2500,
      created_at: new Date(),
      updated_at: new Date(),
      type: MappedReport.income,
    },
    {
      id: 'uuid3',
      source: 'Food',
      amount: 500,
      created_at: new Date(),
      updated_at: new Date(),
      type: MappedReport.expense,
    },
  ],
};

export type MappedReportLiteralType =
  typeof MappedReport[keyof typeof MappedReport];

type DataType = {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: MappedReportLiteralType;
  }[];
};
