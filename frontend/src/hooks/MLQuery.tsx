import axios from 'axios'

const createMLQuery = async (text: String) => {
    return await axios.post(
        "https://api-inference.huggingface.co/models/dslim/bert-large-NER",
        JSON.stringify(text),
        {
            headers: { Authorization: "Bearer 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" },
        },
    )
}

export default createMLQuery