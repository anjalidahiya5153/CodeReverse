const axios = require('axios');

const executeCode = async (req, res) => {
    const { code, language_id, input } = req.body;

    try {
        const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
            source_code: code,
            language_id,
            stdin: input,
        }, {
            headers: {
                'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,  // Replace with your Judge0 API key
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            }
        });

        const token = response.data.token;
        const result = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
            headers: {
                'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            }
        });

        res.json(result.data);
    } catch (error) {
        res.status(500).json({ error: 'Code execution failed' });
    }
};

module.exports = { executeCode };
