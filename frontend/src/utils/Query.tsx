import createStardogQuery from '../hooks/StardogQuery'
import { StardogPrefix } from '../models/Stardog'
import { Record } from '../models/Record'
import { SensitiveThing } from '../models/SensitiveThing'
import { outdent } from 'outdent'
import { AnonymizedDataset } from '../models/AnonymizedDataset'
import { DcatDataset } from '../models/DcatDataset'

const from: string = '<https://github.com/turbo-ismam/WS-AO/>'

export async function getNewID() {
    const lastDataset = await createStardogQuery(outdent`
        SELECT ?ds
        FROM ${from}
        WHERE {
            ?ds
                a dcat:Dataset .         
        }
    `).execute()
    try {
        let lastElement = lastDataset.results.bindings[lastDataset.results.bindings.length - 1]
        const lastID: number = +((lastElement as any).ds.value as String).slice(20)
        return (lastID + 1)
    } catch {
        console.error("Error retrieving last ID")
    }
}

export function createDataset(dataset: DcatDataset) {
    return createStardogQuery(outdent`
        INSERT DATA {
            GRAPH ${from} {
                <${dataset.id}> 
                    a dcat:Dataset .
            }
        }
    `)
}

export function createRecord(record: Record) {
    return createStardogQuery(outdent`
        INSERT DATA {
            GRAPH ${from} {
                <${record.id}>
                    a ao:Record ;
                    ao:text "${record.text}" ;
                    ao:isContainedIn ${StardogPrefix(record.dataset)} .
                ${StardogPrefix(record.dataset)}
                    ao:contains ${StardogPrefix(record.id)} .
            }
        }
    `)
}

export async function getOrganizationByName(name: string): Promise<string | undefined> {
    try {
        let response = await createStardogQuery(outdent`
    SELECT ?org
    FROM ${from}
    WHERE {
        ?org 
            a foaf:Organization;
            foaf:name "${name}".
    }
    `, { limit: 1 }).execute()

        return (response.results.bindings[0] as any).org.value
    } catch {
        return undefined
    }
}

export function createSensitiveThing(sensitiveThing: SensitiveThing) {
    return createStardogQuery(outdent`
        INSERT DATA {
            GRAPH ${from} {
                <${sensitiveThing.id}>
                    a ao:SensitiveThing ;
                    ao:text "${sensitiveThing.text}" ;
                    ao:position ${sensitiveThing.position} ;
                    ao:locatedIn ${StardogPrefix(sensitiveThing.record)} ;
                    ${sensitiveThing.represents ? "ao:represents <" + sensitiveThing.represents + "> ;" : ""}
                    ao:identifiedByMLTechnique <http://www.a2rd.net.br/mlo#Text_Classification> .
                <http://www.a2rd.net.br/mlo#Text_Classification>
                    ao:identifies ${StardogPrefix(sensitiveThing.id)} .
                ${StardogPrefix(sensitiveThing.record)}
                    ao:has ${StardogPrefix(sensitiveThing.id)} .
                ${sensitiveThing.represents ? "<" + sensitiveThing.represents + "> ao:isRepresentedAs " + StardogPrefix(sensitiveThing.id) + " ." : ""}
            }
        }
    `)
}

export function createAnonymizedDataset(anonymizedDataset: AnonymizedDataset) {
    return createStardogQuery(outdent`
        PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
        INSERT DATA {
            GRAPH ${from} {
                <${anonymizedDataset.id}>
                    a ao:AnonymizedDataset ;
                    ao:usedTechnique ${StardogPrefix(anonymizedDataset.technique)} ;
                    ao:anonymizedFrom ${StardogPrefix(anonymizedDataset.dataset)} .
                <${anonymizedDataset.dataset}>
                    ao:anonymizedAs ${StardogPrefix(anonymizedDataset.id)} .               
                <${anonymizedDataset.technique}>
                    ao:usedFor ${StardogPrefix(anonymizedDataset.id)} .
            }
        }
    `)
}