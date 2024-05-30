import type { TabStream } from './stream/tab-stream';
import type { Subject } from './stream/subject';

import { ZilliqaUtils } from './crypto/zilliqa-utils';
import { HTTPProvider } from './provider';
import { CryptoUtils } from './crypto/utils';
import { Blockchain } from './blockchain';
import { Wallet } from './wallet';
import { TransactionFactory } from './transaction';
import { ContractControl } from './contract';

export class ZilPay {
  public utils = ZilliqaUtils;
  public crypto = CryptoUtils;

  public provider: HTTPProvider;
  public blockchain: Blockchain;
  public wallet: Wallet;
  public transactions: TransactionFactory;
  public contracts: ContractControl;

  constructor(stream: TabStream, subject: Subject) {
    this.provider = new HTTPProvider(stream, subject);
    this.wallet = new Wallet(stream, subject);

    this.blockchain = new Blockchain(this.provider, this.wallet);
    this.transactions = new TransactionFactory(this.provider, this.wallet);
    this.contracts = new ContractControl(this.transactions);
  }
}
