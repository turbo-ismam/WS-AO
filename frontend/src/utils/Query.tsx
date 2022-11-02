import createStardogQuery from "../hooks/StardogQuery"
import {outdent} from "outdent";

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
    return createStardogQuery(outdent`
        PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
        INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO/> {
                <#12341>
                    a ao:Record ;
                    ao:text "Gianfalco".
            }
        }
    `)
}

export function addSensitiveThing() {
    return createStardogQuery(outdent`
        PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
        INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO/> {
                <#Sensitive_Thing>
                    a ao:SensitiveThing ;
                    ao:text "Berlusconi" ;
                    ao:position "13" .
            }
        }
    `)
}

export function createAnonymizedDataset() {
    return createStardogQuery(outdent`
        PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
        INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO/> {
                <#Anonymized_Dataset_01>
                    a ao:AnonymizedDataset ;
            }
        }
    `)
}