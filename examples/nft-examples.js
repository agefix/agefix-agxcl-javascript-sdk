/**
 * AgeFix NFT Marketplace Examples
 * 
 * Examples demonstrating how to interact with AgeFix NFT protocols:
 * - NFT minting
 * - Listing and buying
 * - Auctions
 * - NFT discovery and browsing
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
// NFT MINTING EXAMPLES
// ========================================

/**
 * Example 1: Mint a new NFT
 */
async function mintNFT(metadata) {
  try {
    const result = await client.nft.mint({
      name: metadata.name,
      description: metadata.description,
      category: metadata.category,
      metadata: metadata.attributes,
      ipfsHash: metadata.ipfsHash,
      royaltyPercentage: metadata.royaltyPercentage || 5.0
    });

    console.log('✅ NFT minted successfully!');
    console.log('NFT ID:', result.nftId);
    console.log('Token ID:', result.tokenId);
    console.log('Mint Fee (AGX):', result.mintFeeAgx);
    console.log('IPFS URL:', result.ipfsUrl);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to mint NFT:', error.message);
    throw error;
  }
}

/**
 * Example 2: Mint health data certificate NFT
 */
async function mintHealthCertificate() {
  const metadata = {
    name: 'Health Data Certificate #001',
    description: 'Verified health data contribution certificate for 365 days of activity tracking',
    category: 'health_certificate',
    attributes: {
      rarity: 'rare',
      dataPoints: 10000,
      accuracy: 98.5,
      durationDays: 365
    },
    ipfsHash: 'QmXyZ123abc456def789...',
    royaltyPercentage: 5.0
  };

  return await mintNFT(metadata);
}

/**
 * Example 3: Mint achievement badge NFT
 */
async function mintAchievementBadge(achievementData) {
  const metadata = {
    name: `Achievement Badge: ${achievementData.name}`,
    description: achievementData.description,
    category: 'achievement_badge',
    attributes: {
      rarity: achievementData.rarity,
      gameId: achievementData.gameId,
      unlockedAt: new Date().toISOString(),
      playerRank: achievementData.playerRank
    },
    ipfsHash: achievementData.ipfsHash,
    royaltyPercentage: 2.5
  };

  return await mintNFT(metadata);
}

// ========================================
// MARKETPLACE LISTING EXAMPLES
// ========================================

/**
 * Example 4: List NFT for sale
 */
async function listNFTForSale(nftId, priceAgx, durationDays = 7) {
  try {
    const result = await client.nft.list({
      nftId: nftId,
      priceAgx: priceAgx,
      listingDurationDays: durationDays
    });

    console.log('✅ NFT listed for sale!');
    console.log('Listing ID:', result.listingId);
    console.log('Expires At:', result.expiresAt);
    console.log('Marketplace Fee:', result.marketplaceFeePercentage + '%');
    
    return result.listingId;
  } catch (error) {
    console.error('❌ Failed to list NFT:', error.message);
    throw error;
  }
}

/**
 * Example 5: Buy NFT from marketplace
 */
async function buyNFT(listingId) {
  try {
    const result = await client.nft.buy({
      listingId: listingId
    });

    console.log('✅ NFT purchased successfully!');
    console.log('NFT ID:', result.nftId);
    console.log('Price Paid (AGX):', result.pricePaidAgx);
    console.log('Marketplace Fee (AGX):', result.marketplaceFeeAgx);
    console.log('Royalty Fee (AGX):', result.royaltyFeeAgx);
    console.log('Seller Received (AGX):', result.sellerReceivedAgx);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to buy NFT:', error.message);
    throw error;
  }
}

/**
 * Example 6: Cancel NFT listing
 */
async function cancelListing(listingId) {
  try {
    const result = await client.nft.cancelListing({
      listingId: listingId
    });

    console.log('✅ Listing cancelled successfully!');
    console.log('NFT ID:', result.nftId);
    console.log('Refund Amount:', result.refundAmount);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to cancel listing:', error.message);
    throw error;
  }
}

// ========================================
// AUCTION EXAMPLES
// ========================================

/**
 * Example 7: Create auction
 */
async function createAuction(nftId, startingPrice, reservePrice, durationHours = 48) {
  try {
    const result = await client.nft.createAuction({
      nftId: nftId,
      startingPriceAgx: startingPrice,
      reservePriceAgx: reservePrice,
      durationHours: durationHours,
      bidIncrementAgx: 5
    });

    console.log('✅ Auction created successfully!');
    console.log('Auction ID:', result.auctionId);
    console.log('Ends At:', result.endsAt);
    
    return result.auctionId;
  } catch (error) {
    console.error('❌ Failed to create auction:', error.message);
    throw error;
  }
}

/**
 * Example 8: Place bid on auction
 */
async function placeBid(auctionId, bidAmount) {
  try {
    const result = await client.nft.placeBid({
      auctionId: auctionId,
      bidAmountAgx: bidAmount
    });

    console.log('✅ Bid placed successfully!');
    console.log('Bid Rank:', result.bidRank);
    console.log('Current Highest Bid:', result.currentHighestBid);
    console.log('Next Minimum Bid:', result.nextMinimumBid);
    console.log('Time Remaining (seconds):', result.timeRemainingSeconds);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to place bid:', error.message);
    throw error;
  }
}

/**
 * Example 9: Get auction details
 */
async function getAuctionDetails(auctionId) {
  try {
    const auction = await client.nft.getAuctionDetails(auctionId);

    console.log('🔨 Auction Details:');
    console.log('NFT ID:', auction.nftId);
    console.log('Starting Price:', auction.startingPriceAgx, 'AGX');
    console.log('Current Bid:', auction.currentBidAgx, 'AGX');
    console.log('Reserve Price:', auction.reservePriceAgx, 'AGX');
    console.log('Number of Bids:', auction.numberOfBids);
    console.log('Ends At:', auction.endsAt);
    console.log('Status:', auction.status);
    console.log('\nTop Bidders:');
    auction.topBidders.forEach((bidder, index) => {
      console.log(`  ${index + 1}. ${bidder.address.slice(0, 10)}... - ${bidder.bidAmount} AGX`);
    });
    
    return auction;
  } catch (error) {
    console.error('❌ Failed to get auction details:', error.message);
    throw error;
  }
}

// ========================================
// NFT DISCOVERY & BROWSING
// ========================================

/**
 * Example 10: Browse NFTs by category
 */
async function browseNFTs(category, options = {}) {
  try {
    const results = await client.nft.browse({
      category: category,
      minPrice: options.minPrice,
      maxPrice: options.maxPrice,
      sort: options.sort || 'newest',
      limit: options.limit || 20,
      offset: options.offset || 0
    });

    console.log(`🖼️  NFTs in category "${category}" (${results.totalResults} total):`);
    results.nfts.forEach((nft, index) => {
      console.log(`\n${index + 1}. ${nft.name}`);
      console.log(`   ID: ${nft.nftId}`);
      console.log(`   Price: ${nft.priceAgx} AGX`);
      console.log(`   Rarity: ${nft.rarity}`);
      console.log(`   Views: ${nft.views}, Favorites: ${nft.favorites}`);
    });
    
    return results;
  } catch (error) {
    console.error('❌ Failed to browse NFTs:', error.message);
    throw error;
  }
}

/**
 * Example 11: Search NFTs by keyword
 */
async function searchNFTs(keyword, options = {}) {
  try {
    const results = await client.nft.search({
      keyword: keyword,
      category: options.category,
      minPrice: options.minPrice,
      maxPrice: options.maxPrice,
      limit: options.limit || 20
    });

    console.log(`🔍 Search results for "${keyword}" (${results.totalResults} found):`);
    results.nfts.forEach((nft, index) => {
      console.log(`  ${index + 1}. ${nft.name} - ${nft.priceAgx} AGX`);
    });
    
    return results;
  } catch (error) {
    console.error('❌ Failed to search NFTs:', error.message);
    throw error;
  }
}

/**
 * Example 12: Get NFT details
 */
async function getNFTDetails(nftId) {
  try {
    const nft = await client.nft.getDetails(nftId);

    console.log('🖼️  NFT Details:');
    console.log('Name:', nft.name);
    console.log('Token ID:', nft.tokenId);
    console.log('Description:', nft.description);
    console.log('Creator:', nft.creatorAddress);
    console.log('Current Owner:', nft.currentOwner);
    console.log('Category:', nft.category);
    console.log('Rarity:', nft.metadata.rarity);
    console.log('Royalty:', nft.royaltyPercentage + '%');
    console.log('Mint Date:', nft.mintDate);
    console.log('\nAttributes:');
    Object.entries(nft.metadata.attributes).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
    console.log('\nTransfer History:');
    nft.transferHistory.forEach((transfer, index) => {
      console.log(`  ${index + 1}. ${transfer.from.slice(0, 10)}... → ${transfer.to.slice(0, 10)}...`);
      console.log(`     Price: ${transfer.priceAgx} AGX, Date: ${transfer.timestamp}`);
    });
    
    return nft;
  } catch (error) {
    console.error('❌ Failed to get NFT details:', error.message);
    throw error;
  }
}

// ========================================
// USER COLLECTION MANAGEMENT
// ========================================

/**
 * Example 13: Get user's NFT collection
 */
async function getUserCollection() {
  try {
    const collection = await client.nft.getMyCollection();

    console.log('🎨 My NFT Collection:');
    console.log('Total NFTs:', collection.totalNfts);
    console.log('Total Value (AGX):', collection.totalValueAgx);
    console.log('\nNFTs by Category:');
    Object.entries(collection.byCategory).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });
    console.log('\nRecent Acquisitions:');
    collection.recentNfts.forEach((nft, index) => {
      console.log(`  ${index + 1}. ${nft.name} (${nft.category}) - Acquired: ${nft.acquiredAt}`);
    });
    
    return collection;
  } catch (error) {
    console.error('❌ Failed to get collection:', error.message);
    throw error;
  }
}

/**
 * Example 14: Get NFT ownership history
 */
async function getOwnershipHistory(nftId) {
  try {
    const history = await client.nft.getOwnershipHistory(nftId);

    console.log(`📜 Ownership History for NFT ${nftId}:`);
    history.forEach((record, index) => {
      console.log(`\n${index + 1}. Owner: ${record.owner}`);
      console.log(`   Acquired: ${record.acquiredAt}`);
      console.log(`   Price: ${record.priceAgx} AGX`);
      console.log(`   Duration: ${record.durationDays} days`);
    });
    
    return history;
  } catch (error) {
    console.error('❌ Failed to get ownership history:', error.message);
    throw error;
  }
}

/**
 * Example 15: Transfer NFT to another address
 */
async function transferNFT(nftId, toAddress) {
  try {
    const result = await client.nft.transfer({
      nftId: nftId,
      toAddress: toAddress
    });

    console.log('✅ NFT transferred successfully!');
    console.log('From:', result.from);
    console.log('To:', result.to);
    console.log('Transaction Hash:', result.txHash);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to transfer NFT:', error.message);
    throw error;
  }
}

// ========================================
// MARKETPLACE STATISTICS
// ========================================

/**
 * Example 16: Get marketplace statistics
 */
async function getMarketplaceStats() {
  try {
    const stats = await client.nft.getMarketplaceStats();

    console.log('📊 NFT Marketplace Statistics:');
    console.log('Total NFTs Minted:', stats.totalNftsMinted);
    console.log('Total Trading Volume (AGX):', stats.totalVolumeAgx);
    console.log('Active Listings:', stats.activeListings);
    console.log('Active Auctions:', stats.activeAuctions);
    console.log('Average Sale Price (AGX):', stats.averageSalePriceAgx);
    console.log('\nTop Categories:');
    stats.topCategories.forEach((category, index) => {
      console.log(`  ${index + 1}. ${category.name}: ${category.count} NFTs, $${category.volumeUsd} volume`);
    });
    console.log('\nTrending NFTs:');
    stats.trendingNfts.forEach((nft, index) => {
      console.log(`  ${index + 1}. ${nft.name} - ${nft.views} views, ${nft.sales} sales`);
    });
    
    return stats;
  } catch (error) {
    console.error('❌ Failed to get marketplace stats:', error.message);
    throw error;
  }
}

// ========================================
// COMPLETE NFT WORKFLOW
// ========================================

/**
 * Example 17: Complete NFT marketplace workflow
 * Mints NFT, lists for sale, creates auction, and browses collection
 */
async function completeNFTWorkflow() {
  console.log('🎨 Starting Complete NFT Workflow...\n');

  try {
    // Step 1: Mint health certificate NFT
    console.log('Step 1: Minting health certificate NFT...');
    const mintResult = await mintHealthCertificate();
    console.log('');

    // Step 2: Get NFT details
    console.log('Step 2: Getting NFT details...');
    await getNFTDetails(mintResult.nftId);
    console.log('');

    // Step 3: List NFT for sale
    console.log('Step 3: Listing NFT for sale...');
    const listingId = await listNFTForSale(mintResult.nftId, 100, 7);
    console.log('');

    // Step 4: Browse similar NFTs
    console.log('Step 4: Browsing health certificate NFTs...');
    await browseNFTs('health_certificate', { limit: 5 });
    console.log('');

    // Step 5: Check user collection
    console.log('Step 5: Checking user collection...');
    await getUserCollection();
    console.log('');

    // Step 6: Get marketplace stats
    console.log('Step 6: Checking marketplace statistics...');
    await getMarketplaceStats();
    console.log('');

    console.log('✅ Complete NFT workflow finished successfully!');
  } catch (error) {
    console.error('❌ Workflow failed:', error.message);
    throw error;
  }
}

// ========================================
// RUN EXAMPLES
// ========================================

async function main() {
  try {
    // Uncomment the example you want to run:
    
    // await completeNFTWorkflow();
    // await mintHealthCertificate();
    // await browseNFTs('health_certificate');
    await getUserCollection();
    
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
  mintNFT,
  mintHealthCertificate,
  mintAchievementBadge,
  listNFTForSale,
  buyNFT,
  cancelListing,
  createAuction,
  placeBid,
  getAuctionDetails,
  browseNFTs,
  searchNFTs,
  getNFTDetails,
  getUserCollection,
  getOwnershipHistory,
  transferNFT,
  getMarketplaceStats,
  completeNFTWorkflow
};
