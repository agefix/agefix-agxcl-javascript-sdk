import AgefixClient from './index';

/**
 * Token Contract Helper
 * Provides utilities for creating and managing AGXCL token contracts
 */
export class TokenContract {
  private client: AgefixClient;
  private contractAddress?: string;

  constructor(client: AgefixClient, contractAddress?: string) {
    this.client = client;
    this.contractAddress = contractAddress;
  }

  /**
   * Deploy a new token contract
   * @param name - Token name
   * @param symbol - Token symbol
   * @param totalSupply - Initial supply
   * @returns Contract deployment info
   */
  async deploy(name: string, symbol: string, totalSupply: string) {
    const tokenCode = `
contract Token {
  state {
    string name = "${name}";
    string symbol = "${symbol}";
    uint256 totalSupply = ${totalSupply};
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowances;
  }

  constructor() {
    balances[msg.sender] = totalSupply;
  }

  function balanceOf(address account) public view returns (uint256) {
    return balances[account];
  }

  function transfer(address to, uint256 amount) public returns (bool) {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    balances[msg.sender] -= amount;
    balances[to] += amount;
    emit Transfer(msg.sender, to, amount);
    return true;
  }

  function approve(address spender, uint256 amount) public returns (bool) {
    allowances[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);
    return true;
  }

  function transferFrom(address from, address to, uint256 amount) public returns (bool) {
    require(balances[from] >= amount, "Insufficient balance");
    require(allowances[from][msg.sender] >= amount, "Insufficient allowance");
    balances[from] -= amount;
    balances[to] += amount;
    allowances[from][msg.sender] -= amount;
    emit Transfer(from, to, amount);
    return true;
  }

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}
    `;

    const deployment = await this.client.deployContract(tokenCode);
    this.contractAddress = deployment.contractAddress;
    return deployment;
  }

  /**
   * Get token balance for an address
   */
  async balanceOf(address: string): Promise<string> {
    if (!this.contractAddress) throw new Error('Contract not deployed');
    const result = await this.client.queryContract(
      this.contractAddress,
      'balanceOf',
      [address]
    );
    return result.data;
  }

  /**
   * Transfer tokens to another address
   */
  async transfer(to: string, amount: string) {
    if (!this.contractAddress) throw new Error('Contract not deployed');
    return await this.client.executeTransaction(
      this.contractAddress,
      'transfer',
      [to, amount]
    );
  }

  /**
   * Approve spender to use tokens
   */
  async approve(spender: string, amount: string) {
    if (!this.contractAddress) throw new Error('Contract not deployed');
    return await this.client.executeTransaction(
      this.contractAddress,
      'approve',
      [spender, amount]
    );
  }
}

/**
 * NFT Contract Helper
 */
export class NFTContract {
  private client: AgefixClient;
  private contractAddress?: string;

  constructor(client: AgefixClient, contractAddress?: string) {
    this.client = client;
    this.contractAddress = contractAddress;
  }

  /**
   * Deploy a new NFT contract
   */
  async deploy(name: string, symbol: string) {
    const nftCode = `
contract NFT {
  state {
    string name = "${name}";
    string symbol = "${symbol}";
    uint256 nextTokenId = 1;
    mapping(uint256 => address) owners;
    mapping(uint256 => string) tokenURIs;
    mapping(address => uint256) balances;
  }

  function mint(address to, string memory uri) public returns (uint256) {
    uint256 tokenId = nextTokenId++;
    owners[tokenId] = to;
    tokenURIs[tokenId] = uri;
    balances[to]++;
    emit Mint(to, tokenId, uri);
    return tokenId;
  }

  function ownerOf(uint256 tokenId) public view returns (address) {
    return owners[tokenId];
  }

  function tokenURI(uint256 tokenId) public view returns (string memory) {
    return tokenURIs[tokenId];
  }

  function balanceOf(address owner) public view returns (uint256) {
    return balances[owner];
  }

  event Mint(address indexed to, uint256 indexed tokenId, string uri);
}
    `;

    const deployment = await this.client.deployContract(nftCode);
    this.contractAddress = deployment.contractAddress;
    return deployment;
  }

  /**
   * Mint a new NFT
   */
  async mint(to: string, uri: string) {
    if (!this.contractAddress) throw new Error('Contract not deployed');
    return await this.client.executeTransaction(
      this.contractAddress,
      'mint',
      [to, uri]
    );
  }

  /**
   * Get NFT owner
   */
  async ownerOf(tokenId: number): Promise<string> {
    if (!this.contractAddress) throw new Error('Contract not deployed');
    const result = await this.client.queryContract(
      this.contractAddress,
      'ownerOf',
      [tokenId]
    );
    return result.data;
  }
}

export { AgefixClient } from './index';
