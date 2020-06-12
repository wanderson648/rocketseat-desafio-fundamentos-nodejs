import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionRepository.getBalance();

    if (type === 'outcome' && value > total)
      throw new Error('Insufficient balance');

    const transaction = this.transactionRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
