import createStardogQuery from "../hooks/StardogQuery"

export function createDataset(id: String) {
    try {
        const query = createStardogQuery(`
            PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
            SELECT ?r
            WHERE {
                ?r a dcat:Dataset ;
            }
        `)
        query.execute()
    } catch (error) {
        alert("Some error occured. Please check!")
    }
}

export function createRecord() {

}

export function addSensitiveThing() {

}

export function createAnonymizedDataset() {

}