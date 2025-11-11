import axios, { AxiosInstance } from 'axios';

export interface AgefixConfig {
  rpcUrl: string;
  chainId: string;
  privateKey?: string;
}

export interface ContractDeployment {
  contractAddress: string;
  transactionHash: string;
  blockNumber: number;
}

export interface QueryResult {
  success: boolean;
  data: any;
  error?: string;
}

export interface TransactionResult {
  txHash: string;
  blockNumber: number;
  gasUsed: number;
  success: boolean;
}

/**
 * AgeFix AGXCL SDK Client
 * Provides methods for deploying and interacting with AGXCL smart contracts
 */
export class AgefixClient {
  private config: AgefixConfig;
  private http: AxiosInstance;

  constructor(config: AgefixConfig) {
    this.config = config;
    this.http = axios.create({
      baseURL: config.rpcUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Deploy a new AGXCL smart contract
   * @param contractCode - AGXCL contract source code
   * @param constructorArgs - Constructor arguments
   * @returns Deployment information including contract address
   */
  async deployContract(
    contractCode: string,
    constructorArgs: any[] = []
  ): Promise<ContractDeployment> {
    try {
      const response = await this.http.post('/deploy', {
        code: contractCode,
        args: constructorArgs,
        chainId: this.config.chainId,
        privateKey: this.config.privateKey,
      });

      return {
        contractAddress: response.data.contractAddress,
        transactionHash: response.data.txHash,
        blockNumber: response.data.blockNumber,
      };
    } catch (error: any) {
      throw new Error(`Contract deployment failed: ${error.message}`);
    }
  }

  /**
   * Query contract state (read-only)
   * @param contractAddress - Address of deployed contract
   * @param method - Method name to call
   * @param args - Method arguments
   * @returns Query result
   */
  async queryContract(
    contractAddress: string,
    method: string,
    args: any[] = []
  ): Promise<QueryResult> {
    try {
      const response = await this.http.post('/query', {
        contractAddress,
        method,
        args,
        chainId: this.config.chainId,
      });

      return {
        success: true,
        data: response.data.result,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  /**
   * Execute contract transaction (state-changing)
   * @param contractAddress - Address of deployed contract
   * @param method - Method name to call
   * @param args - Method arguments
   * @param value - Amount of AGX tokens to send (optional)
   * @returns Transaction result
   */
  async executeTransaction(
    contractAddress: string,
    method: string,
    args: any[] = [],
    value: string = '0'
  ): Promise<TransactionResult> {
    if (!this.config.privateKey) {
      throw new Error('Private key required for transactions');
    }

    try {
      const response = await this.http.post('/execute', {
        contractAddress,
        method,
        args,
        value,
        chainId: this.config.chainId,
        privateKey: this.config.privateKey,
      });

      return {
        txHash: response.data.txHash,
        blockNumber: response.data.blockNumber,
        gasUsed: response.data.gasUsed,
        success: true,
      };
    } catch (error: any) {
      throw new Error(`Transaction execution failed: ${error.message}`);
    }
  }

  /**
   * Get transaction receipt
   * @param txHash - Transaction hash
   * @returns Transaction receipt with status and logs
   */
  async getTransactionReceipt(txHash: string): Promise<any> {
    try {
      const response = await this.http.get(`/tx/${txHash}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get transaction receipt: ${error.message}`);
    }
  }

  /**
   * Get account balance
   * @param address - Account address
   * @returns Balance in AGX tokens
   */
  async getBalance(address: string): Promise<string> {
    try {
      const response = await this.http.get(`/balance/${address}`);
      return response.data.balance;
    } catch (error: any) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  /**
   * Estimate gas for transaction
   * @param contractAddress - Contract address
   * @param method - Method name
   * @param args - Method arguments
   * @returns Estimated gas cost
   */
  async estimateGas(
    contractAddress: string,
    method: string,
    args: any[] = []
  ): Promise<number> {
    try {
      const response = await this.http.post('/estimateGas', {
        contractAddress,
        method,
        args,
        chainId: this.config.chainId,
      });
      return response.data.gasEstimate;
    } catch (error: any) {
      throw new Error(`Failed to estimate gas: ${error.message}`);
    }
  }
}

export default AgefixClient;
