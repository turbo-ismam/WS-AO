import axios from 'axios'

const createMLQuery = (text: String) => {
    return axios.post(
        "https://api-inference.huggingface.co/models/dslim/bert-large-NER",
        JSON.stringify(text),
        { 
            headers: { Authorization: "Bearer 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" },
        },
    )
}

export default createMLQuery