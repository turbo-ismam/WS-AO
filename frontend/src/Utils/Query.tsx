import createStardogQuery from "../hooks/StardogQuery"

export function createDataset(id: String) {
    try {
        const query = createStardogQuery(`
            PREFIX ao: <https://github.com/turbo-ismam/WS-AO.git/>
            INSERT DATA {
                GRAPH: <https://ao.ontology/> {
                    #DCAT DATASET

                }
            }
        `)

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