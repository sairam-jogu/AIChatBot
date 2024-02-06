import axios from 'axios'
const BASE_URL = `https://backend-ai-bot.vercel.app//api/bardApi`

const getBotResponse = (userMsg) => {
    return axios.get(`${BASE_URL}?query=${userMsg}`)
}

export default {getBotResponse};