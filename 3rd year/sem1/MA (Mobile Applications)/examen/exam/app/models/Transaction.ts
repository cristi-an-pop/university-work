export interface Transaction {
    id: number;
    date: string;
    amount: number;
    type: string;
    category: string;
    description: string;
}

export default Transaction;