import Game from '../model/Game.js';



// Create new game
const createGame = async (req, res) => {
  try {
    const { player1Name, player2Name } = req.body;
    
    const game = new Game({
      player1: { name: player1Name },
      player2: { name: player2Name },
      rounds: []
    });
    
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all games
const getAllGame = async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update game with round results
const updateGame = async (req, res) => {
  try {
    const { roundNumber, player1Choice, player2Choice, winner } = req.body;
    
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    
    // Add round
    game.rounds.push({
      roundNumber,
      player1Choice,
      player2Choice,
      winner
    });
    
    // Update scores
    if (winner === 'player1') game.player1.score += 1;
    if (winner === 'player2') game.player2.score += 1;
    
    // Determine final winner after 6 rounds
    if (game.rounds.length === 6) {
      if (game.player1.score > game.player2.score) {
        game.winner = 'player1';
      } else if (game.player2.score > game.player1.score) {
        game.winner = 'player2';
      } else {
        game.winner = 'tie';
      }
    }
    
    await game.save();
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get single game
const singleGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {createGame, getAllGame, updateGame, singleGame};