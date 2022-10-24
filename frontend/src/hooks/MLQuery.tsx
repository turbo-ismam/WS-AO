import axios from 'axios'

const createMLQuery = (text: String) => {
    try {
        return axios.post(
            "https://api-inference.huggingface.co/models/dslim/bert-large-NER",
            JSON.stringify(text),
            { 
                headers: { Authorization: "Bearer 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" } 
            },
        )
    } catch {
        return {data: "ML Parsing Error"}
    }
}

export default createMLQuery