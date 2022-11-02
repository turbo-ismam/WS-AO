import createStardogQuery from '../hooks/StardogQuery'
import { outdent } from 'outdent'

async function getNewID() {
    const lastDataset = await createStardogQuery(outdent`
        PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
        SELECT ?ds
        FROM <https://github.com/turbo-ismam/WS-AO/>
        WHERE {
            ?ds
                a dcat:Dataset .         
        }
        ORDER BY desc(?ds)
    `, { limit: 1 }).execute()
    try {
        const lastID: number = +(lastDataset.results.bindings[0].ds.value as String).slice(20)
        return(lastID + 1) 
    } catch {
        console.error("Error retrieving last ID")
    }
}

export function createDataset() {   
    return createStardogQuery(outdent`
        PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
        INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO/> {
                <#18245131> 
                a dcat:Dataset ;
                ao:sensitivity "12" .
            }
        }
    `)
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