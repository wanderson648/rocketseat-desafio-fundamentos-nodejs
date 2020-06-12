import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((accumulator, transaction) => {
      if (transaction.type === 'income') return accumulator + transaction.value;
      return accumulator;
    }, 0);

    const outcome = this.transactions.reduce((accumulator, transaction) => {
      if (transaction.type === 'outcome')
        return accumulator + transaction.value;
      return accumulator;
    }, 0);

    const total = income - outcome;

    return { total, income, outcome };
  }
}

export default TransactionRepository;
