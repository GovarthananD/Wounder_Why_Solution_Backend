import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  player1: {
    name: { type: String, required: true },
    score: { type: Number, default: 0 }
  },
  player2: {
    name: { type: String, required: true },
    score: { type: Number, default: 0 }
  },
  rounds: [
    {
      roundNumber: Number,
      player1Choice: { type: String, enum: ['stone', 'paper', 'scissors'] },
      player2Choice: { type: String, enum: ['stone', 'paper', 'scissors'] },
      winner: { type: String, enum: ['player1', 'player2', 'tie'] },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  winner: { type: String, enum: ['player1', 'player2', 'tie'] },
  createdAt: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;