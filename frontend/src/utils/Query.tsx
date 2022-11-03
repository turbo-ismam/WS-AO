import createStardogQuery from '../hooks/StardogQuery'
import { StardogPrefix } from '../models/Stardog'
import { Record } from '../models/Record'
import { SensitiveThing } from '../models/SensitiveThing'
import { outdent } from 'outdent'
import { AnonymizedDataset } from '../models/AnonymizedDataset'

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

export async function createDataset() {   
    const newID = await getNewID()
    return createStardogQuery(outdent`
        PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
        INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO/> {
                <#DS_${newID}> 
                    a dcat:Dataset .
            }
        }
    `)
}

export function createRecord(record: Record) {
    return createStardogQuery(outdent`
        PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
        INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO/> {
                <${record.id}>
                    a ao:Record ;
                    ao:text "${record.text}" ;
                    ao:isContainedIn <${StardogPrefix(record.dataset)}> .
                <${StardogPrefix(record.dataset)}>
                    ao:contains <${StardogPrefix(record.id)}> .
            }
        }
    `)
}

export function addSensitiveThing(sensitiveThing: SensitiveThing) {
    return createStardogQuery(outdent`
        INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO/> {
                <${sensitiveThing.id}>
                    a ao:SensitiveThing ;
                    ao:text "${sensitiveThing.text}" ;
                    ao:position ${sensitiveThing.position} ;
                    ao:locatedIn <${StardogPrefix(sensitiveThing.record)}> ;
                    ${sensitiveThing.represents ? "ao:represents <" + sensitiveThing.represents + "> ;" : ""}
                    ao:identifiedByMLTechnique <http://www.a2rd.net.br/mlo#Text_Classification> .
                <http://www.a2rd.net.br/mlo#Text_Classification>
                    ao:identifies <${StardogPrefix(sensitiveThing.id)}> .
                <${StardogPrefix(sensitiveThing.record)}>
                    ao:has <${StardogPrefix(sensitiveThing.id)}> .
                ${sensitiveThing.represents ? "<" + sensitiveThing.represents + "> ao:isRepresentedAs <" + StardogPrefix(sensitiveThing.id) + "> .": ""}
            }
        }
    `)
}

export function createAnonymizedDataset(anonymizedDataset: AnonymizedDataset) {
    return createStardogQuery(outdent`
        PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
        INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO/> {
                <${anonymizedDataset.id}>
                    a ao:AnonymizedDataset ;
                    ao:usedTechnique <${StardogPrefix(anonymizedDataset.technique)}> ;
                    ao:anonymizedFrom <${StardogPrefix(anonymizedDataset.dataset)}> .
                <${anonymizedDataset.dataset}>
                    ao:anonymizedAs <${StardogPrefix(anonymizedDataset.id)}> .               
                <${anonymizedDataset.technique}>
                    ao:usedFor <${StardogPrefix(anonymizedDataset.id)}> .
            }
        }
    `)
}