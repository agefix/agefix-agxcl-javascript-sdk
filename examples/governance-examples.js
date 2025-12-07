/**
 * AgeFix Governance Protocol Examples
 * 
 * Examples demonstrating how to interact with AgeFix Governance protocols:
 * - Proposal creation and voting
 * - Gauge weight voting
 * - Validator bribes
 * - Governance statistics
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
// PROPOSAL MANAGEMENT EXAMPLES
// ========================================

/**
 * Example 1: Create a parameter change proposal
 */
async function createParameterProposal() {
  try {
    const result = await client.governance.createProposal({
      proposalType: 'parameter_change',
      title: 'Increase Protocol Fee from 0.3% to 0.5%',
      description: 'This proposal aims to increase protocol sustainability by raising the swap fee from 0.3% to 0.5%. Additional revenue will fund validator rewards and development.',
      parameters: {
        targetContract: 'DeFiProtocol',
        function: 'setProtocolFee',
        args: [0.5]
      },
      ipfsHash: 'QmProposal123...',
      votingPeriodDays: 7
    });

    console.log('✅ Proposal created successfully!');
    console.log('Proposal ID:', result.proposalId);
    console.log('State:', result.state);
    console.log('Voting Starts:', result.votingStarts);
    console.log('Voting Ends:', result.votingEnds);
    console.log('Quorum Required:', result.quorumRequired);
    
    return result.proposalId;
  } catch (error) {
    console.error('❌ Failed to create proposal:', error.message);
    throw error;
  }
}

/**
 * Example 2: Create a treasury spend proposal
 */
async function createTreasuryProposal() {
  try {
    const result = await client.governance.createProposal({
      proposalType: 'treasury_spend',
      title: 'Fund AgeFix Mobile App Development',
      description: 'Allocate 100,000 AGX from treasury to fund mobile app development for iOS and Android platforms. Development timeline: 6 months.',
      parameters: {
        recipient: '0x...developerAddress',
        amount: 100000,
        token: 'AGX',
        milestones: [
          { description: 'UI/UX Design', amount: 20000 },
          { description: 'Core Features', amount: 40000 },
          { description: 'Testing & Launch', amount: 40000 }
        ]
      },
      votingPeriodDays: 14
    });

    console.log('✅ Treasury proposal created successfully!');
    console.log('Proposal ID:', result.proposalId);
    
    return result.proposalId;
  } catch (error) {
    console.error('❌ Failed to create treasury proposal:', error.message);
    throw error;
  }
}

/**
 * Example 3: Cast vote on proposal
 */
async function voteOnProposal(proposalId, vote, reason = '') {
  try {
    const result = await client.governance.vote({
      proposalId: proposalId,
      vote: vote, // 'for', 'against', or 'abstain'
      reason: reason
    });

    console.log('✅ Vote cast successfully!');
    console.log('Voting Power:', result.votingPower);
    console.log('Vote:', result.voteRecorded);
    console.log('Updated Totals:');
    console.log('  For:', result.updatedTotals.forVotes);
    console.log('  Against:', result.updatedTotals.againstVotes);
    console.log('  Abstain:', result.updatedTotals.abstainVotes);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to vote:', error.message);
    throw error;
  }
}

/**
 * Example 4: Get proposal details
 */
async function getProposalDetails(proposalId) {
  try {
    const proposal = await client.governance.getProposal(proposalId);

    console.log('📋 Proposal Details:');
    console.log('ID:', proposal.proposalId);
    console.log('Title:', proposal.title);
    console.log('Type:', proposal.proposalType);
    console.log('State:', proposal.state);
    console.log('\nVoting Results:');
    console.log('  For:', proposal.forVotes, `(${proposal.passPercentage}%)`);
    console.log('  Against:', proposal.againstVotes);
    console.log('  Abstain:', proposal.abstainVotes);
    console.log('  Total:', proposal.totalVotes);
    console.log('\nStatus:');
    console.log('  Has Quorum:', proposal.hasQuorum ? 'Yes' : 'No');
    console.log('  Will Pass:', proposal.willPass ? 'Yes' : 'No');
    console.log('  Quorum:', proposal.quorumPercentage + '%');
    console.log('\nTimeline:');
    console.log('  Created:', proposal.createdAt);
    console.log('  Voting Ends:', proposal.votingEnds);
    console.log('  Time Remaining:', proposal.timeRemainingSeconds, 'seconds');
    
    if (proposal.userVote) {
      console.log('\nYour Vote:', proposal.userVote.vote);
      console.log('Your Voting Power:', proposal.userVote.votingPower);
    }
    
    return proposal;
  } catch (error) {
    console.error('❌ Failed to get proposal details:', error.message);
    throw error;
  }
}

/**
 * Example 5: List all proposals with filters
 */
async function listProposals(state = 'all', limit = 20) {
  try {
    const results = await client.governance.listProposals({
      state: state, // 'all', 'active', 'pending', 'succeeded', 'defeated', 'executed'
      limit: limit,
      offset: 0
    });

    console.log(`📊 Proposals (${state}): ${results.totalProposals} total, ${results.activeProposals} active`);
    results.proposals.forEach((proposal, index) => {
      console.log(`\n${index + 1}. ${proposal.title} (ID: ${proposal.proposalId})`);
      console.log(`   State: ${proposal.state}`);
      console.log(`   Votes: For ${proposal.forVotes}, Against ${proposal.againstVotes}`);
      console.log(`   Voting Ends: ${proposal.votingEnds}`);
      console.log(`   Will Pass: ${proposal.willPass ? 'Yes' : 'No'}`);
    });
    
    return results;
  } catch (error) {
    console.error('❌ Failed to list proposals:', error.message);
    throw error;
  }
}

// ========================================
// GAUGE VOTING EXAMPLES
// ========================================

/**
 * Example 6: Vote on gauge weights
 */
async function voteGaugeWeights(weights) {
  try {
    const result = await client.governance.voteGaugeWeights({
      gaugeWeights: weights // { defi: 40, gaming: 30, nft: 20, governance: 10 }
    });

    console.log('✅ Gauge weights updated successfully!');
    console.log('Voting Power Used:', result.votingPowerUsed);
    console.log('Weights Applied:');
    Object.entries(result.weightsApplied).forEach(([category, weight]) => {
      console.log(`  ${category}: ${weight}%`);
    });
    console.log('Next Epoch Starts:', result.nextEpochStarts);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to vote on gauge weights:', error.message);
    throw error;
  }
}

/**
 * Example 7: Get current gauge weights
 */
async function getGaugeWeights() {
  try {
    const weights = await client.governance.getGaugeWeights();

    console.log('⚖️  Current Gauge Weights:');
    console.log('Epoch:', weights.currentEpoch);
    console.log('Epoch Period:', weights.epochStarts, '→', weights.epochEnds);
    console.log('\nGauge Distribution:');
    weights.gaugeWeights.forEach(gauge => {
      console.log(`\n${gauge.category.toUpperCase()}:`);
      console.log(`  Weight: ${gauge.weightPercentage}%`);
      console.log(`  Total Votes: ${gauge.totalVotes}`);
      console.log(`  Emission Multiplier: ${gauge.emissionMultiplier}x`);
      console.log(`  Address: ${gauge.gaugeAddress}`);
    });
    
    return weights;
  } catch (error) {
    console.error('❌ Failed to get gauge weights:', error.message);
    throw error;
  }
}

/**
 * Example 8: Get user's gauge votes
 */
async function getUserGaugeVotes() {
  try {
    const votes = await client.governance.getMyGaugeVotes();

    console.log('🗳️  Your Gauge Votes:');
    console.log('Voting Power Used:', votes.votingPowerUsed);
    console.log('Last Updated:', votes.lastUpdated);
    console.log('\nCurrent Allocation:');
    Object.entries(votes.weights).forEach(([category, weight]) => {
      console.log(`  ${category}: ${weight}%`);
    });
    
    return votes;
  } catch (error) {
    console.error('❌ Failed to get gauge votes:', error.message);
    throw error;
  }
}

// ========================================
// VALIDATOR BRIBE EXAMPLES
// ========================================

/**
 * Example 9: Create validator bribe
 */
async function createBribe(gaugeAddress, token, amount, durationWeeks) {
  try {
    const result = await client.governance.createBribe({
      gaugeAddress: gaugeAddress,
      token: token,
      amount: amount,
      durationWeeks: durationWeeks
    });

    console.log('✅ Bribe created successfully!');
    console.log('Bribe ID:', result.bribeId);
    console.log('Total Amount:', result.totalAmount);
    console.log('Reward Per Vote:', result.rewardPerVote);
    console.log('Expires At:', result.expiresAt);
    
    return result.bribeId;
  } catch (error) {
    console.error('❌ Failed to create bribe:', error.message);
    throw error;
  }
}

/**
 * Example 10: Get active bribes
 */
async function getActiveBribes(gaugeAddress = null) {
  try {
    const bribes = await client.governance.getActiveBribes({
      gaugeAddress: gaugeAddress
    });

    console.log('💰 Active Bribes:');
    bribes.activeBribes.forEach((bribe, index) => {
      console.log(`\n${index + 1}. Bribe ID: ${bribe.bribeId}`);
      console.log(`   Gauge: ${bribe.gaugeName}`);
      console.log(`   Token: ${bribe.token}`);
      console.log(`   Total Amount: ${bribe.totalAmount}`);
      console.log(`   Remaining: ${bribe.remainingAmount}`);
      console.log(`   Reward Per Vote: ${bribe.rewardPerVote}`);
      console.log(`   Expires: ${bribe.expiresAt} (${bribe.daysRemaining} days)`);
      console.log(`   Creator: ${bribe.creator}`);
    });
    
    return bribes;
  } catch (error) {
    console.error('❌ Failed to get active bribes:', error.message);
    throw error;
  }
}

/**
 * Example 11: Calculate bribe ROI
 */
async function calculateBribeROI(bribeId, votingPower) {
  try {
    const roi = await client.governance.calculateBribeROI({
      bribeId: bribeId,
      votingPower: votingPower
    });

    console.log('📊 Bribe ROI Calculation:');
    console.log('Voting Power:', votingPower);
    console.log('Expected Rewards:', roi.expectedRewards);
    console.log('ROI Percentage:', roi.roiPercentage + '%');
    console.log('Duration:', roi.durationWeeks, 'weeks');
    
    return roi;
  } catch (error) {
    console.error('❌ Failed to calculate ROI:', error.message);
    throw error;
  }
}

// ========================================
// GOVERNANCE STATISTICS
// ========================================

/**
 * Example 12: Get governance statistics
 */
async function getGovernanceStats() {
  try {
    const stats = await client.governance.getStats();

    console.log('📈 Governance Statistics:');
    console.log('\nCURE Token:');
    console.log('  Total Locked:', stats.totalCureLocked);
    console.log('  Total Supply:', stats.totalCureSupply);
    console.log('  Participation Rate:', stats.participationRate + '%');
    console.log('\nProposals:');
    console.log('  Active:', stats.activeProposals);
    console.log('  Total:', stats.totalProposals);
    console.log('  Passed:', stats.proposalsPassed);
    console.log('  Defeated:', stats.proposalsDefeated);
    console.log('\nParticipation:');
    console.log('  Total Voters:', stats.totalVoters);
    console.log('  Average Quorum:', stats.averageQuorum + '%');
    console.log('  Average Turnout:', stats.averageTurnout + '%');
    console.log('\nGauge Voting:');
    console.log('  Current Epoch:', stats.currentEpoch);
    console.log('  Total Gauge Votes:', stats.totalGaugeVotes);
    console.log('\nBribes:');
    console.log('  Active Bribes:', stats.activeBribes);
    console.log('  Total Bribe Value (USD):', stats.totalBribeValueUsd);
    
    return stats;
  } catch (error) {
    console.error('❌ Failed to get governance stats:', error.message);
    throw error;
  }
}

/**
 * Example 13: Get user voting history
 */
async function getVotingHistory() {
  try {
    const history = await client.governance.getMyVotingHistory();

    console.log('📜 Your Voting History:');
    console.log('Total Votes Cast:', history.totalVotes);
    console.log('Current Voting Power:', history.currentVotingPower);
    console.log('\nRecent Votes:');
    history.recentVotes.forEach((vote, index) => {
      console.log(`\n${index + 1}. Proposal ${vote.proposalId}: ${vote.proposalTitle}`);
      console.log(`   Vote: ${vote.vote}`);
      console.log(`   Voting Power: ${vote.votingPower}`);
      console.log(`   Date: ${vote.timestamp}`);
      if (vote.reason) {
        console.log(`   Reason: ${vote.reason}`);
      }
    });
    
    return history;
  } catch (error) {
    console.error('❌ Failed to get voting history:', error.message);
    throw error;
  }
}

// ========================================
// COMPLETE GOVERNANCE WORKFLOW
// ========================================

/**
 * Example 14: Complete governance workflow
 * Creates proposal, votes, checks gauge weights, and creates bribe
 */
async function completeGovernanceWorkflow() {
  console.log('🏛️  Starting Complete Governance Workflow...\n');

  try {
    // Step 1: Get governance stats
    console.log('Step 1: Checking governance statistics...');
    await getGovernanceStats();
    console.log('');

    // Step 2: Create parameter proposal
    console.log('Step 2: Creating parameter change proposal...');
    const proposalId = await createParameterProposal();
    console.log('');

    // Step 3: Get proposal details
    console.log('Step 3: Getting proposal details...');
    await getProposalDetails(proposalId);
    console.log('');

    // Step 4: Cast vote
    console.log('Step 4: Casting vote...');
    await voteOnProposal(proposalId, 'for', 'This change will improve protocol sustainability');
    console.log('');

    // Step 5: Get gauge weights
    console.log('Step 5: Checking current gauge weights...');
    const weights = await getGaugeWeights();
    console.log('');

    // Step 6: Vote on gauge weights
    console.log('Step 6: Voting on gauge weights...');
    await voteGaugeWeights({
      defi: 40.0,
      gaming: 30.0,
      nft: 20.0,
      governance: 10.0
    });
    console.log('');

    // Step 7: Create bribe for DeFi gauge
    console.log('Step 7: Creating bribe for DeFi gauge...');
    const defiGauge = weights.gaugeWeights.find(g => g.category === 'defi');
    await createBribe(defiGauge.gaugeAddress, 'AGX', 10000, 4);
    console.log('');

    // Step 8: Check active bribes
    console.log('Step 8: Checking active bribes...');
    await getActiveBribes();
    console.log('');

    // Step 9: Check voting history
    console.log('Step 9: Checking voting history...');
    await getVotingHistory();
    console.log('');

    console.log('✅ Complete governance workflow finished successfully!');
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
    
    // await completeGovernanceWorkflow();
    // await listProposals('active');
    // await getGaugeWeights();
    await getGovernanceStats();
    
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
  createParameterProposal,
  createTreasuryProposal,
  voteOnProposal,
  getProposalDetails,
  listProposals,
  voteGaugeWeights,
  getGaugeWeights,
  getUserGaugeVotes,
  createBribe,
  getActiveBribes,
  calculateBribeROI,
  getGovernanceStats,
  getVotingHistory,
  completeGovernanceWorkflow
};
