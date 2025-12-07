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

The `examples/` directory contains comprehensive code examples for all AgeFix protocol interactions:

### 📁 Available Example Files

- **[defi-examples.js](examples/defi-examples.js)** - DeFi Protocol Examples
  - Liquidity pool creation and management
  - Token swaps with slippage protection
  - Lending and borrowing with collateral
  - Yield farming and staking
  - Portfolio analytics and TVL statistics

- **[gaming-examples.js](examples/gaming-examples.js)** - Gaming Protocol Examples
  - Game registration and session management
  - Tournament creation and participation
  - Achievement unlocking and tracking
  - Player statistics and leaderboards

- **[nft-examples.js](examples/nft-examples.js)** - NFT Marketplace Examples
  - NFT minting with metadata and IPFS
  - Listing and buying NFTs
  - Auction creation and bidding
  - NFT discovery and collection management

- **[governance-examples.js](examples/governance-examples.js)** - Governance Protocol Examples
  - Proposal creation and voting
  - Gauge weight voting for reward distribution
  - Validator bribes and incentives
  - Governance statistics and history

### 🚀 Running Examples

Each example file can be run directly or imported into your project:

```bash
# Install dependencies
npm install

# Set environment variables
export AGEFIX_API_KEY="your_api_key"
export WALLET_ADDRESS="your_wallet_address"
export PRIVATE_KEY="your_private_key"

# Run a specific example
node examples/defi-examples.js
node examples/gaming-examples.js
node examples/nft-examples.js
node examples/governance-examples.js
```

### 📖 Using Examples in Your Code

Import individual functions from example files:

```typescript
import { 
  createLiquidityPool,
  swapTokens,
  completeDeFiWorkflow 
} from '@agefix/agxcl-sdk/examples/defi-examples';

// Create a liquidity pool
const pool = await createLiquidityPool();

// Execute a token swap
await swapTokens(pool.poolId, 'AGX', 100, 49.5);

// Run complete DeFi workflow
await completeDeFiWorkflow();
```

### 🎯 Quick Example: DeFi Swap

```typescript
import { AgefixClient } from '@agefix/agxcl-sdk';

const client = new AgefixClient({
  apiUrl: 'https://api.agefix.com',
  apiKey: process.env.AGEFIX_API_KEY,
  walletAddress: process.env.WALLET_ADDRESS,
  privateKey: process.env.PRIVATE_KEY
});

// Get swap quote
const quote = await client.defi.getSwapQuote({
  poolId: 'pool_123',
  tokenIn: 'AGX',
  amountIn: 100
});

console.log('You will receive:', quote.amountOut, 'CURE');

// Execute swap with slippage protection
const result = await client.defi.swap({
  poolId: 'pool_123',
  tokenIn: 'AGX',
  amountIn: 100,
  minAmountOut: quote.amountOut * 0.99 // 1% slippage
});

console.log('Swap completed!', result.txHash);
```

### 🎮 Quick Example: Gaming Session

```typescript
// Register a game
const game = await client.gaming.registerGame({
  gameName: 'AgeFix Quest',
  gameType: 'adventure',
  entryFeeAgx: 10,
  rewardPoolAgx: 1000
});

// Start game session
const session = await client.gaming.startSession({
  gameId: game.gameId,
  difficulty: 'hard'
});

// Submit score with achievements
const result = await client.gaming.submitScore({
  sessionId: session.sessionId,
  score: 9500,
  achievementIds: ['first_win', 'speed_runner']
});

console.log('Earned:', result.rewardsEarned, 'AGX');
```

For more detailed examples, see the individual example files in the `examples/` directory.

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
