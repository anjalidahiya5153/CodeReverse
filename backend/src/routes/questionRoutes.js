const express = require('express');
const Question = require('../models/Question');
const User = require('../models/User');
const verifyToken = require('../middlewares/authMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//fetch all the questions or search by tags
router.get('/', async(req, res) => {
    const {tags} = req.query;

    try{
        const query = tags ? {tags: {$in: tags.split(',')}}:{};
        const questions = await Question.find(query);
        res.status(200).json(questions);
    } catch(err){
        res.status(500).json({error: 'Failed to fetch questions'});
    }
});

//add a new question : admin only functionality
router.post('/', async (req, res) => {
    const {title, description, score, tags, difficulty} = req.body;

    try{
        const newQuestion = new Question({title, description, score, tags, difficulty});
        await newQuestion.save();
        res.status(200).json({message: 'Question created successfully', question: newQuestion});
    }catch(err){
        res.status(500).json({error: 'Failed to create question'});
    }
});

//fetch questions by title
router.get('/search', async (req, res) => {
    const {title} = req.query;

    if(!title){
        return res.status(400).json({error: 'title query parameter is required'});
    }

    try{
        const questions = await Question.find({
            title: {$regex: title, $options: 'i'}  //case insenstive search
        });

        if(questions.length === 0){
            return res.status(404).json({message: 'No questons found matching the title'});
        }

        res.status(200).json(questions);
    }catch(err){
        res.status(500).json({error: 'Failed ot search questions by title'});
    }
});

//mark question as solved for logged in user
// router.post('/:id/solve', verifyToken, async (req, res) => {
//     const {id} = req.params;
//     const userId = req.user; //extract user id from token

//     try{
//         const question = await Question.findById(id);
//         if(!question){
//             return res.status(404).json({error: 'Question not foudn'});
//         }

//         const user = await User.findById(userId);
//         if(user.solvedQuestions.includes(id)){
//             return res.status(400).json({error: 'Question alredy solved'});
//         }

//         user.solvedQuestions.push(id);
//         user.score += question.score;
//         await user.save();

//         res.status(200).json({message: 'Question marked as solved', updatedScored : user.score});
//     } catch(err){
//         res.status(500).json({error: 'Failed to mark question as solved'});
//     }

// });

router.post('/bookmark/:questionId', authMiddleware, async(req, res) => {
    const {questionId} = req.params;

    try{
        const user = await User.findById(req.user);
        if(!user){
            return res.status(404).json({error : 'User not found'});
        }

        if(user.bookmarkedQuesions.includes(questionId)){
            user.bookmarkedQuesions = user.bookmarkedQuesions.filter(q => q.toString() !== questionId);

        }else{
            user.bookmarkedQuesions.push(questionId);
        }

        await user.save();
        res.status(200).json({message: 'Bookmark updated', bookmarkedQuesions: user.bookmarkedQuesions});
    }catch(err){
        res.status(500).json({err : 'Failed to update bookmark'});
    }
});

router.post('/solve/:questionId', authMiddleware, async(req, res) => {
    const {questionId} = req.params;

    try{
        const user = await User.findById(req.user);
        if(!user){
            return res.status(404).json({error : 'User not found'});
        }

        if(user.solvedQuestions.includes(questionId)){
            user.solvedQuestions = user.solvedQuestions.filter(q => q.toString() !== questionId);

        }else{
            user.solvedQuestions.push(questionId);
        }

        await user.save();
        res.status(200).json({message: 'Bookmark updated', solvedQuestions: user.bookmarkedQuesions});
    }catch(err){
        res.status(500).json({err : 'Failed to update bookmark'});
    }
});

module.exports = router;