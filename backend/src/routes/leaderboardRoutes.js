const express = require('express');
const Leaderboard = require('../models/Leaderboard');
const router = express.Router();

//get  leaderboard
router.get('/', async(req, res) => {
    try{
        const topUsers = await Leaderboard.find().sort({score: -1}).limit(5);
        res.status(200).json(topUsers);
    }catch(err){
        res.status(500).json({error: 'Failed ot fetch leaderboard'});
    }
});

//add or update leaderboard
router.post('/', async (req, res) => {
    const {username, score} = req.body;

    try{
        const user = await Leaderboard.findOne({username});
        if(user){
            user.score = Math.max(user.score, score); //update score if it is higher
            await user.save();
        }else{
            const newUser = new Leaderboard({username, score});
            await newUser.save();
        }

        res.status(200).json({message : 'Score updated'});
    }catch(err){
        res.status(500).json({error: 'Failed to update leaderboard'});
    }
});

//get user score by username
router.get('/user/:username', async(req, res) => {
    const {username} = req.params;

    try{
        const user = await Leaderboard.findOne({username});
        if(user){
            res.status(200).json({username : user.username, score : user.score});
        }else{
            res.status(404).json({error: 'User not found'});
        }
    }catch(err){
        res.status(500).json({error: 'Failed to fetch user score'});
    }
});

module.exports = router;