/**
 * AgeFix DeFi Protocol Examples
 * 
 * Examples demonstrating how to interact with AgeFix DeFi protocols:
 * - Liquidity pools
 * - Token swaps
 * - Lending & borrowing
 * - Yield farming
 */

import { AgefixClient } from '@agefix/agxcl-sdk';

// Initialize client
const client = new AgefixClient({
  apiUrl: 'https://api.agefix.com',
  apiKey: process.env.AGEFIX_API_KEY,
  network: 'mainnet',
  walletAddress: process.env.WALLET_ADDRESS,
  privateKey: process.env.PRIVATE_KEY
});

// ========================================
// LIQUIDITY POOL EXAMPLES
// ========================================

/**
 * Example 1: Create a new liquidity pool
 */
async function createLiquidityPool() {
  try {
    const result = await client.defi.createPool({
      tokenA: 'AGX',
      tokenB: 'CURE',
      initialAmountA: 100000,
      initialAmountB: 50000
    });

    console.log('✅ Pool created successfully!');
    console.log('Pool ID:', result.poolId);
    console.log('LP Tokens Minted:', result.lpTokensMinted);
    
    return result.poolId;
  } catch (error) {
    console.error('❌ Failed to create pool:', error.message);
    throw error;
  }
}

/**
 * Example 2: Add liquidity to existing pool
 */
async function addLiquidity(poolId) {
  try {
    const result = await client.defi.addLiquidity({
      poolId: poolId,
      amountA: 1000,
      amountB: 500,
      slippageTolerance: 0.5 // 0.5%
    });

    console.log('✅ Liquidity added successfully!');
    console.log('LP Tokens Minted:', result.lpTokensMinted);
    console.log('Final Amount A:', result.finalAmountA);
    console.log('Final Amount B:', result.finalAmountB);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to add liquidity:', error.message);
    throw error;
  }
}

/**
 * Example 3: Remove liquidity from pool
 */
async function removeLiquidity(poolId, lpTokens) {
  try {
    const result = await client.defi.removeLiquidity({
      poolId: poolId,
      lpTokens: lpTokens,
      slippageTolerance: 0.5
    });

    console.log('✅ Liquidity removed successfully!');
    console.log('Amount A Received:', result.amountAReceived);
    console.log('Amount B Received:', result.amountBReceived);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to remove liquidity:', error.message);
    throw error;
  }
}

// ========================================
// TOKEN SWAP EXAMPLES
// ========================================

/**
 * Example 4: Get swap quote before executing
 */
async function getSwapQuote(poolId, tokenIn, amountIn) {
  try {
    const quote = await client.defi.getSwapQuote({
      poolId: poolId,
      tokenIn: tokenIn,
      amountIn: amountIn
    });

    console.log('💱 Swap Quote:');
    console.log('Amount Out:', quote.amountOut);
    console.log('Exchange Rate:', quote.exchangeRate);
    console.log('Price Impact:', quote.priceImpact + '%');
    console.log('Protocol Fee:', quote.protocolFee);
    
    return quote;
  } catch (error) {
    console.error('❌ Failed to get quote:', error.message);
    throw error;
  }
}

/**
 * Example 5: Execute token swap
 */
async function swapTokens(poolId, tokenIn, amountIn, minAmountOut) {
  try {
    const result = await client.defi.swap({
      poolId: poolId,
      tokenIn: tokenIn,
      amountIn: amountIn,
      minAmountOut: minAmountOut,
      slippageTolerance: 0.5
    });

    console.log('✅ Swap executed successfully!');
    console.log('Amount Out:', result.amountOut);
    console.log('Price Impact:', result.priceImpact + '%');
    console.log('Protocol Fee:', result.protocolFee);
    
    return result;
  } catch (error) {
    console.error('❌ Swap failed:', error.message);
    throw error;
  }
}

// ========================================
// LENDING & BORROWING EXAMPLES
// ========================================

/**
 * Example 6: Deposit collateral for borrowing
 */
async function depositCollateral(token, amount) {
  try {
    const result = await client.defi.depositCollateral({
      token: token,
      amount: amount
    });

    console.log('✅ Collateral deposited successfully!');
    console.log('Collateral Value (USD):', result.collateralValueUsd);
    console.log('Borrow Limit (USD):', result.borrowLimitUsd);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to deposit collateral:', error.message);
    throw error;
  }
}

/**
 * Example 7: Borrow tokens against collateral
 */
async function borrowTokens(token, amount) {
  try {
    const result = await client.defi.borrow({
      token: token,
      amount: amount
    });

    console.log('✅ Tokens borrowed successfully!');
    console.log('Borrowed Amount:', result.borrowedAmount);
    console.log('Interest Rate APY:', result.interestRateApy + '%');
    console.log('Health Factor:', result.healthFactor);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to borrow:', error.message);
    throw error;
  }
}

/**
 * Example 8: Get user lending position
 */
async function getLendingPosition() {
  try {
    const position = await client.defi.getLendingPosition();

    console.log('📊 Lending Position:');
    console.log('Collateral (USD):', position.collateralUsd);
    console.log('Borrowed (USD):', position.borrowedUsd);
    console.log('Health Factor:', position.healthFactor);
    console.log('Available to Borrow (USD):', position.availableToBorrowUsd);
    
    return position;
  } catch (error) {
    console.error('❌ Failed to get position:', error.message);
    throw error;
  }
}

// ========================================
// YIELD FARMING EXAMPLES
// ========================================

/**
 * Example 9: Stake LP tokens for farming rewards
 */
async function stakeLPTokens(poolId, lpAmount, lockDurationDays) {
  try {
    const result = await client.defi.stakeLPTokens({
      poolId: poolId,
      lpAmount: lpAmount,
      lockDurationDays: lockDurationDays
    });

    console.log('✅ LP tokens staked successfully!');
    console.log('Stake ID:', result.stakeId);
    console.log('APY:', result.apyPercentage + '%');
    console.log('Estimated Daily Rewards:', result.estimatedDailyRewards);
    console.log('Unlock Date:', result.unlockDate);
    
    return result.stakeId;
  } catch (error) {
    console.error('❌ Failed to stake LP tokens:', error.message);
    throw error;
  }
}

/**
 * Example 10: Claim farming rewards
 */
async function claimFarmingRewards(stakeId) {
  try {
    const result = await client.defi.claimFarmingRewards({
      stakeId: stakeId
    });

    console.log('✅ Rewards claimed successfully!');
    console.log('Rewards Amount:', result.rewardsClaimed);
    console.log('Token:', result.token);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to claim rewards:', error.message);
    throw error;
  }
}

/**
 * Example 11: Get farming positions
 */
async function getFarmingPositions() {
  try {
    const positions = await client.defi.getFarmingPositions();

    console.log('🌾 Active Farming Positions:');
    positions.forEach((position, index) => {
      console.log(`\nPosition ${index + 1}:`);
      console.log('  Pool:', position.poolId);
      console.log('  Staked Value (USD):', position.stakedValueUsd);
      console.log('  APY:', position.apy + '%');
      console.log('  Pending Rewards:', position.pendingRewards);
      console.log('  Lock Ends:', position.lockEndsAt);
    });
    
    return positions;
  } catch (error) {
    console.error('❌ Failed to get farming positions:', error.message);
    throw error;
  }
}

// ========================================
// STATISTICS & ANALYTICS
// ========================================

/**
 * Example 12: Get DeFi TVL statistics
 */
async function getTVLStats() {
  try {
    const stats = await client.defi.getTVLStats();

    console.log('📈 DeFi TVL Statistics:');
    console.log('Total TVL (USD):', stats.totalTvlUsd);
    console.log('Liquidity Pools TVL:', stats.liquidityPoolsTvl);
    console.log('Lending TVL:', stats.lendingTvl);
    console.log('Farming TVL:', stats.farmingTvl);
    console.log('\nTop Pools:');
    stats.topPools.forEach((pool, index) => {
      console.log(`  ${index + 1}. ${pool.pair} - TVL: $${pool.tvlUsd}, APY: ${pool.apy}%`);
    });
    
    return stats;
  } catch (error) {
    console.error('❌ Failed to get TVL stats:', error.message);
    throw error;
  }
}

/**
 * Example 13: Get user DeFi portfolio
 */
async function getUserPortfolio() {
  try {
    const portfolio = await client.defi.getPortfolio();

    console.log('💼 DeFi Portfolio:');
    console.log('Total Value (USD):', portfolio.totalValueUsd);
    console.log('\nLiquidity Positions:');
    portfolio.liquidityPositions.forEach(position => {
      console.log(`  ${position.poolId}: $${position.valueUsd} (${position.sharePercentage}%)`);
    });
    console.log('\nLending Positions:');
    console.log('  Collateral:', portfolio.lendingPositions.collateralUsd);
    console.log('  Borrowed:', portfolio.lendingPositions.borrowedUsd);
    console.log('  Health Factor:', portfolio.lendingPositions.healthFactor);
    console.log('\nFarming Positions:');
    portfolio.farmingPositions.forEach(position => {
      console.log(`  ${position.pool}: $${position.stakedValueUsd}, Pending: ${position.pendingRewardsAgx} AGX`);
    });
    
    return portfolio;
  } catch (error) {
    console.error('❌ Failed to get portfolio:', error.message);
    throw error;
  }
}

// ========================================
// COMPLETE WORKFLOW EXAMPLE
// ========================================

/**
 * Example 14: Complete DeFi workflow
 * Creates pool, adds liquidity, swaps, and stakes for farming
 */
async function completeDeFiWorkflow() {
  console.log('🚀 Starting Complete DeFi Workflow...\n');

  try {
    // Step 1: Create liquidity pool
    console.log('Step 1: Creating liquidity pool...');
    const poolId = await createLiquidityPool();
    console.log('');

    // Step 2: Get initial TVL stats
    console.log('Step 2: Checking TVL statistics...');
    await getTVLStats();
    console.log('');

    // Step 3: Get swap quote
    console.log('Step 3: Getting swap quote...');
    const quote = await getSwapQuote(poolId, 'AGX', 100);
    console.log('');

    // Step 4: Execute swap
    console.log('Step 4: Executing token swap...');
    await swapTokens(poolId, 'AGX', 100, quote.amountOut * 0.995);
    console.log('');

    // Step 5: Add more liquidity
    console.log('Step 5: Adding more liquidity...');
    const liquidityResult = await addLiquidity(poolId);
    console.log('');

    // Step 6: Stake LP tokens for farming
    console.log('Step 6: Staking LP tokens...');
    const stakeId = await stakeLPTokens(poolId, liquidityResult.lpTokensMinted, 90);
    console.log('');

    // Step 7: Check portfolio
    console.log('Step 7: Checking portfolio...');
    await getUserPortfolio();
    console.log('');

    console.log('✅ Complete workflow finished successfully!');
  } catch (error) {
    console.error('❌ Workflow failed:', error.message);
    throw error;
  }
}

// ========================================
// RUN EXAMPLES
// ========================================

// Run individual examples or complete workflow
async function main() {
  try {
    // Uncomment the example you want to run:
    
    // await completeDeFiWorkflow();
    // await createLiquidityPool();
    // await getTVLStats();
    await getUserPortfolio();
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  main();
}

// Export functions for use in other modules
export {
  createLiquidityPool,
  addLiquidity,
  removeLiquidity,
  getSwapQuote,
  swapTokens,
  depositCollateral,
  borrowTokens,
  getLendingPosition,
  stakeLPTokens,
  claimFarmingRewards,
  getFarmingPositions,
  getTVLStats,
  getUserPortfolio,
  completeDeFiWorkflow
};
