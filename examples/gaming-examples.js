/**
 * AgeFix Gaming Protocol Examples
 * 
 * Examples demonstrating how to interact with AgeFix Gaming protocols:
 * - Game registration and sessions
 * - Tournaments
 * - Achievements
 * - Leaderboards
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
// GAME MANAGEMENT EXAMPLES
// ========================================

/**
 * Example 1: Register a new game
 */
async function registerGame() {
  try {
    const result = await client.gaming.registerGame({
      gameName: 'AgeFix Quest',
      gameType: 'adventure',
      entryFeeAgx: 10,
      rewardPoolAgx: 1000
    });

    console.log('✅ Game registered successfully!');
    console.log('Game ID:', result.gameId);
    console.log('Status:', result.status);
    
    return result.gameId;
  } catch (error) {
    console.error('❌ Failed to register game:', error.message);
    throw error;
  }
}

/**
 * Example 2: Start a game session
 */
async function startGameSession(gameId) {
  try {
    const result = await client.gaming.startSession({
      gameId: gameId
    });

    console.log('✅ Game session started!');
    console.log('Session ID:', result.sessionId);
    console.log('Game State:', result.gameState);
    
    return result.sessionId;
  } catch (error) {
    console.error('❌ Failed to start session:', error.message);
    throw error;
  }
}

/**
 * Example 3: Submit game score
 */
async function submitScore(sessionId, score, achievements = []) {
  try {
    const result = await client.gaming.submitScore({
      sessionId: sessionId,
      score: score,
      achievements: achievements
    });

    console.log('✅ Score submitted successfully!');
    console.log('Rewards Earned (AGX):', result.rewardsEarnedAgx);
    console.log('New Rank:', result.newRank);
    console.log('Achievements Unlocked:', result.achievementsUnlocked);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to submit score:', error.message);
    throw error;
  }
}

/**
 * Example 4: End game session
 */
async function endGameSession(sessionId, finalScore) {
  try {
    const result = await client.gaming.endSession({
      sessionId: sessionId,
      finalScore: finalScore
    });

    console.log('✅ Game session ended!');
    console.log('Final Score:', result.finalScore);
    console.log('Total Rewards:', result.totalRewards);
    console.log('Duration:', result.durationMinutes, 'minutes');
    
    return result;
  } catch (error) {
    console.error('❌ Failed to end session:', error.message);
    throw error;
  }
}

// ========================================
// TOURNAMENT EXAMPLES
// ========================================

/**
 * Example 5: Create a tournament
 */
async function createTournament(gameId) {
  try {
    const result = await client.gaming.createTournament({
      gameId: gameId,
      entryFeeAgx: 50,
      prizePoolAgx: 5000,
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      durationHours: 72,
      maxParticipants: 100
    });

    console.log('✅ Tournament created successfully!');
    console.log('Tournament ID:', result.tournamentId);
    console.log('Status:', result.status);
    
    return result.tournamentId;
  } catch (error) {
    console.error('❌ Failed to create tournament:', error.message);
    throw error;
  }
}

/**
 * Example 6: Join a tournament
 */
async function joinTournament(tournamentId) {
  try {
    const result = await client.gaming.joinTournament({
      tournamentId: tournamentId
    });

    console.log('✅ Successfully joined tournament!');
    console.log('Participant Number:', result.participantNumber);
    console.log('Entry Fee Paid:', result.entryFeePaid);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to join tournament:', error.message);
    throw error;
  }
}

/**
 * Example 7: Get tournament leaderboard
 */
async function getTournamentLeaderboard(tournamentId) {
  try {
    const leaderboard = await client.gaming.getTournamentLeaderboard(tournamentId);

    console.log('🏆 Tournament Leaderboard:');
    console.log('Tournament ID:', leaderboard.tournamentId);
    console.log('Total Participants:', leaderboard.totalParticipants);
    console.log('Prize Pool (AGX):', leaderboard.prizePoolAgx);
    console.log('\nTop 10:');
    leaderboard.leaderboard.slice(0, 10).forEach(entry => {
      console.log(`  ${entry.rank}. ${entry.playerAddress.slice(0, 10)}... - Score: ${entry.score}, Prize: ${entry.prizeAgx} AGX`);
    });
    
    return leaderboard;
  } catch (error) {
    console.error('❌ Failed to get leaderboard:', error.message);
    throw error;
  }
}

/**
 * Example 8: Get tournament details
 */
async function getTournamentDetails(tournamentId) {
  try {
    const details = await client.gaming.getTournamentDetails(tournamentId);

    console.log('📋 Tournament Details:');
    console.log('Name:', details.name);
    console.log('Game ID:', details.gameId);
    console.log('Status:', details.status);
    console.log('Prize Pool:', details.prizePoolAgx, 'AGX');
    console.log('Participants:', details.currentParticipants, '/', details.maxParticipants);
    console.log('Start Time:', details.startTime);
    console.log('End Time:', details.endTime);
    
    return details;
  } catch (error) {
    console.error('❌ Failed to get tournament details:', error.message);
    throw error;
  }
}

// ========================================
// ACHIEVEMENT EXAMPLES
// ========================================

/**
 * Example 9: Unlock an achievement
 */
async function unlockAchievement(achievementId, gameId) {
  try {
    const result = await client.gaming.unlockAchievement({
      achievementId: achievementId,
      gameId: gameId
    });

    console.log('🎖️ Achievement unlocked!');
    console.log('Achievement Name:', result.achievementName);
    console.log('Rarity:', result.rarity);
    console.log('AGX Reward:', result.agxReward);
    console.log('NFT Badge Minted:', result.nftBadgeMinted ? 'Yes' : 'No');
    
    return result;
  } catch (error) {
    console.error('❌ Failed to unlock achievement:', error.message);
    throw error;
  }
}

/**
 * Example 10: Get player achievements
 */
async function getPlayerAchievements() {
  try {
    const achievements = await client.gaming.getPlayerAchievements();

    console.log('🏅 Player Achievements:');
    console.log('Total Unlocked:', achievements.totalUnlocked);
    console.log('Total Rewards (AGX):', achievements.totalRewardsAgx);
    console.log('\nRecent Achievements:');
    achievements.recent.forEach(achievement => {
      console.log(`  ${achievement.name} (${achievement.rarity}) - ${achievement.gameId}`);
      console.log(`    Unlocked: ${achievement.unlockedAt}`);
      console.log(`    Reward: ${achievement.reward} AGX`);
    });
    
    return achievements;
  } catch (error) {
    console.error('❌ Failed to get achievements:', error.message);
    throw error;
  }
}

/**
 * Example 11: Get available achievements for a game
 */
async function getGameAchievements(gameId) {
  try {
    const achievements = await client.gaming.getGameAchievements(gameId);

    console.log(`🎯 Achievements for Game ${gameId}:`);
    achievements.forEach(achievement => {
      console.log(`\n${achievement.name} (${achievement.rarity})`);
      console.log(`  Description: ${achievement.description}`);
      console.log(`  Reward: ${achievement.rewardAgx} AGX`);
      console.log(`  Unlocked by: ${achievement.unlockedByPlayers} players`);
    });
    
    return achievements;
  } catch (error) {
    console.error('❌ Failed to get game achievements:', error.message);
    throw error;
  }
}

// ========================================
// PLAYER STATISTICS
// ========================================

/**
 * Example 12: Get player stats
 */
async function getPlayerStats() {
  try {
    const stats = await client.gaming.getPlayerStats();

    console.log('📊 Player Statistics:');
    console.log('Total Games Played:', stats.totalGamesPlayed);
    console.log('Total Earnings (AGX):', stats.totalEarningsAgx);
    console.log('Win Rate:', stats.winRate + '%');
    console.log('Current Rank:', stats.currentRank);
    console.log('Achievements Unlocked:', stats.achievementsUnlocked);
    console.log('Tournaments Won:', stats.tournamentsWon);
    console.log('Highest Score:', stats.highestScore);
    
    return stats;
  } catch (error) {
    console.error('❌ Failed to get player stats:', error.message);
    throw error;
  }
}

/**
 * Example 13: Get global leaderboard
 */
async function getGlobalLeaderboard(limit = 100) {
  try {
    const leaderboard = await client.gaming.getGlobalLeaderboard({ limit });

    console.log('🌍 Global Leaderboard (Top', limit + '):');
    leaderboard.forEach(entry => {
      console.log(`  ${entry.rank}. ${entry.playerAddress.slice(0, 10)}...`);
      console.log(`     Rank: ${entry.rankTier}, Total Earnings: ${entry.totalEarningsAgx} AGX`);
      console.log(`     Win Rate: ${entry.winRate}%, Games: ${entry.gamesPlayed}`);
    });
    
    return leaderboard;
  } catch (error) {
    console.error('❌ Failed to get global leaderboard:', error.message);
    throw error;
  }
}

/**
 * Example 14: Get player ranking
 */
async function getPlayerRanking() {
  try {
    const ranking = await client.gaming.getPlayerRanking();

    console.log('🎖️ Player Ranking:');
    console.log('Global Rank:', ranking.globalRank);
    console.log('Rank Tier:', ranking.rankTier);
    console.log('Points:', ranking.points);
    console.log('Next Tier:', ranking.nextTier);
    console.log('Points to Next Tier:', ranking.pointsToNextTier);
    
    return ranking;
  } catch (error) {
    console.error('❌ Failed to get player ranking:', error.message);
    throw error;
  }
}

// ========================================
// COMPLETE GAMING WORKFLOW
// ========================================

/**
 * Example 15: Complete gaming workflow
 * Registers game, starts session, plays, submits score, and checks achievements
 */
async function completeGamingWorkflow() {
  console.log('🎮 Starting Complete Gaming Workflow...\n');

  try {
    // Step 1: Register game
    console.log('Step 1: Registering game...');
    const gameId = await registerGame();
    console.log('');

    // Step 2: Start session
    console.log('Step 2: Starting game session...');
    const sessionId = await startGameSession(gameId);
    console.log('');

    // Step 3: Simulate gameplay (wait 5 seconds)
    console.log('Step 3: Playing game...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('Gameplay complete!');
    console.log('');

    // Step 4: Submit score with achievements
    console.log('Step 4: Submitting score...');
    const scoreResult = await submitScore(sessionId, 15000, ['first_win', 'speed_runner']);
    console.log('');

    // Step 5: Check player stats
    console.log('Step 5: Checking player stats...');
    await getPlayerStats();
    console.log('');

    // Step 6: Check achievements
    console.log('Step 6: Checking achievements...');
    await getPlayerAchievements();
    console.log('');

    // Step 7: Check global ranking
    console.log('Step 7: Checking global ranking...');
    await getPlayerRanking();
    console.log('');

    console.log('✅ Complete gaming workflow finished successfully!');
  } catch (error) {
    console.error('❌ Workflow failed:', error.message);
    throw error;
  }
}

/**
 * Example 16: Complete tournament workflow
 * Creates tournament, joins, plays, and checks leaderboard
 */
async function completeTournamentWorkflow() {
  console.log('🏆 Starting Complete Tournament Workflow...\n');

  try {
    // Step 1: Create tournament
    console.log('Step 1: Creating tournament...');
    const gameId = 'game_quest_001'; // Assume game exists
    const tournamentId = await createTournament(gameId);
    console.log('');

    // Step 2: Get tournament details
    console.log('Step 2: Getting tournament details...');
    await getTournamentDetails(tournamentId);
    console.log('');

    // Step 3: Join tournament
    console.log('Step 3: Joining tournament...');
    await joinTournament(tournamentId);
    console.log('');

    // Step 4: Play tournament game
    console.log('Step 4: Playing tournament game...');
    const sessionId = await startGameSession(gameId);
    await new Promise(resolve => setTimeout(resolve, 5000));
    await submitScore(sessionId, 25000, ['tournament_participant']);
    console.log('');

    // Step 5: Check leaderboard
    console.log('Step 5: Checking tournament leaderboard...');
    await getTournamentLeaderboard(tournamentId);
    console.log('');

    console.log('✅ Complete tournament workflow finished successfully!');
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
    
    // await completeGamingWorkflow();
    // await completeTournamentWorkflow();
    await getPlayerStats();
    // await getGlobalLeaderboard(10);
    
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
  registerGame,
  startGameSession,
  submitScore,
  endGameSession,
  createTournament,
  joinTournament,
  getTournamentLeaderboard,
  getTournamentDetails,
  unlockAchievement,
  getPlayerAchievements,
  getGameAchievements,
  getPlayerStats,
  getGlobalLeaderboard,
  getPlayerRanking,
  completeGamingWorkflow,
  completeTournamentWorkflow
};
