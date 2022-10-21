import axios from 'axios'

const createMLQuery = (file: File) => {
    return axios.post(
        "https://api-inference.huggingface.co/models/dslim/bert-large-NER",
        {
            headers: { Authorization: "Bearer {}" },
            body: JSON.stringify("My name is Sarah Jessica Parker but you can call me Jessica"),
        }
    )
}

export default createMLQuery