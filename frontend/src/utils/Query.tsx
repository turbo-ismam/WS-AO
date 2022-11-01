import createStardogQuery from "../hooks/StardogQuery"

export function createDataset(id: String) {
    try {
        const query = createStardogQuery(`
            INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO> {
                <#18245131>
                a dcat:Dataset ;
                dcat:sensitivity "12" .
                }
            }
        `).execute()
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