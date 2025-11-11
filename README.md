# @agefix/agxcl-sdk

Official JavaScript/TypeScript SDK for interacting with AGXCL smart contracts on the AgeFix blockchain.

## Installation

```bash
npm install @agefix/agxcl-sdk
```

## Quick Start

```typescript
import { AgefixClient, TokenContract } from '@agefix/agxcl-sdk';

// Initialize client
const client = new AgefixClient({
  rpcUrl: 'https://rpc.agefix.com',
  chainId: 'agefix-mainnet-1',
  privateKey: 'YOUR_PRIVATE_KEY' // Optional, required for transactions
});

// Deploy a token contract
const token = new TokenContract(client);
const deployment = await token.deploy('MyToken', 'MTK', '1000000');
console.log('Token deployed at:', deployment.contractAddress);

// Transfer tokens
await token.transfer('0x...recipientAddress', '100');
```

## Features

- 🚀 Simple API for contract deployment and interaction
- 💰 Built-in helpers for Token and NFT contracts
- 🔒 Secure transaction signing
- 📊 Query contract state
- ⛽ Gas estimation
- 🔍 Transaction receipts and status

## API Reference

### AgefixClient

#### Constructor
```typescript
new AgefixClient(config: AgefixConfig)
```

#### Methods

**deployContract(contractCode, constructorArgs)**
Deploy a new AGXCL smart contract.

**queryContract(contractAddress, method, args)**
Query contract state (read-only operation).

**executeTransaction(contractAddress, method, args, value)**
Execute a state-changing transaction.

**getBalance(address)**
Get AGX token balance for an address.

**estimateGas(contractAddress, method, args)**
Estimate gas cost for a transaction.

### TokenContract

Helper class for ERC-20 style tokens.

```typescript
const token = new TokenContract(client);
await token.deploy('Token Name', 'SYMBOL', '1000000');
await token.transfer(toAddress, amount);
await token.approve(spenderAddress, amount);
const balance = await token.balanceOf(address);
```

### NFTContract

Helper class for NFT (non-fungible token) contracts.

```typescript
const nft = new NFTContract(client);
await nft.deploy('NFT Collection', 'NFT');
await nft.mint(ownerAddress, metadataURI);
const owner = await nft.ownerOf(tokenId);
```

## Examples

### Deploy Custom Contract

```typescript
const contractCode = `
contract SimpleStorage {
  state {
    uint256 value;
  }

  function setValue(uint256 newValue) public {
    value = newValue;
  }

  function getValue() public view returns (uint256) {
    return value;
  }
}
`;

const deployment = await client.deployContract(contractCode);
await client.executeTransaction(deployment.contractAddress, 'setValue', [42]);
const result = await client.queryContract(deployment.contractAddress, 'getValue', []);
console.log('Stored value:', result.data);
```

### Check Transaction Status

```typescript
const tx = await token.transfer(recipientAddress, '100');
const receipt = await client.getTransactionReceipt(tx.txHash);
console.log('Transaction status:', receipt.status);
console.log('Block number:', receipt.blockNumber);
console.log('Gas used:', receipt.gasUsed);
```

## Error Handling

```typescript
try {
  await token.transfer(toAddress, amount);
} catch (error) {
  console.error('Transaction failed:', error.message);
}
```

## Security

- Never commit private keys to version control
- Use environment variables for sensitive data
- Always estimate gas before transactions
- Validate contract addresses and amounts

## License

MIT

## Support

- Documentation: https://agefix.com/developers
- GitHub: https://github.com/agefix/agxcl-sdk
- Discord: https://discord.gg/agefix
