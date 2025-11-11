# Changelog

All notable changes to the AGXCL JavaScript/TypeScript SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-07

### Added
- Initial release of AGXCL JavaScript/TypeScript SDK
- `AgefixClient` class for blockchain interactions
- `TokenContract` helper for ERC-20 style tokens
- `NFTContract` helper for NFT management
- Contract deployment functionality
- Contract query methods (read-only operations)
- Transaction execution (state-changing operations)
- Gas estimation capabilities
- Balance checking utilities
- Transaction receipt retrieval
- Full TypeScript type definitions
- Comprehensive JSDoc documentation
- Example code for common use cases
- Browser and Node.js compatibility
- Axios-based HTTP client with timeout handling
- Error handling and validation

### Features
- **Contract Deployment**: Deploy AGXCL smart contracts with constructor arguments
- **Contract Queries**: Execute read-only contract method calls
- **Transactions**: Submit signed transactions to blockchain
- **Token Operations**: Create, transfer, and manage ERC-20 tokens
- **NFT Operations**: Mint, transfer, and query NFTs
- **Gas Estimation**: Predict transaction costs before execution
- **Account Management**: Query balances and transaction history
- **Type Safety**: Full TypeScript support with interfaces and types
- **Documentation**: Interactive HTML docs with code examples

### Dependencies
- axios ^1.6.0
- ethers ^6.9.0

### Development Dependencies
- @types/node ^20.0.0
- typescript ^5.3.0
- jest ^29.7.0
- jsdoc ^4.0.2
- docdash ^2.0.2

### Documentation
- API reference available at `/docs/index.html`
- JSDoc comments on all public methods
- Example code for token and NFT contracts
- Quick start guide included

### License
MIT License

### Repository
https://github.com/agefix/agxcl-sdk-js

### npm Package
https://www.npmjs.com/package/@agefix/agxcl-sdk
