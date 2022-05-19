export const data: DataType = {
  report: [],
};
const MappedReport = {
  income: 'income',
  expense: 'expense',
} as const;

type MappedReportLiteralType = typeof MappedReport[keyof typeof MappedReport];

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
