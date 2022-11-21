import { Component, createSignal, For } from 'solid-js'
import { outdent } from 'outdent'
import createStardogQuery from '../hooks/StardogQuery'
import { useParams } from '@solidjs/router';

interface Query {
    title: string;
    query: string;
    reasoning: boolean;
}

const QueryDataset: Component = () => {
    const params = useParams();
    const from: string = '<https://github.com/turbo-ismam/WS-AO/>'
    const dataset: string = `<tag:stardog:api:#DS_${params.dataset}>`
    const anonymizedDS: string = `<tag:stardog:api:#ADS_${params.dataset}>`

    const Queries: Query[] = [
        {
            title: 'Custom Query',
            query: outdent`SELECT
            FROM ${from}
            WHERE {
                
            }`,
            reasoning: false,
        },
        {
            title: 'Inserted Records',
            query: outdent`SELECT ?record ?text
            FROM ${from}
            WHERE {
                ?record
                    a ao:Record ;
                    ao:text ?text ;
                    ao:isContainedIn ${dataset}.
            }`,
            reasoning: false,
        },
        {
            title: 'Anonimized Records',
            query: outdent`SELECT ?record ?text
            FROM ${from}
            WHERE {
                ?record
                    a ao:Record ;
                    ao:text ?text ;
                    ao:isContainedIn ${anonymizedDS}.
            }`,
            reasoning: false,
        },
        {
            title: 'Count total records and sensible records',
            query: outdent`SELECT (COUNT(?record) as ?NotSensibleRecords) (COUNT(?recordSens) as ?SensibleRecords)
            FROM ${from}
            WHERE {
                {
                ?record
                    a ao:Record ;
                    ao:isContainedIn ${dataset}.
                    MINUS {?record ao:has ?sens}
                } UNION {
                ?recordSens
                    a ao:Record ;
                    ao:has ?sens;
                    ao:isContainedIn ${dataset}.
                }
            }`,
            reasoning: false,
        },
        {
            title: 'All the organizations mentioned by the Dataset',
            query: outdent`
            SELECT ?name
            FROM ${from}
            WHERE {
                ?org
                    a foaf:Organization ;
                    foaf:name ?name ;
                    ao:isRepresentedAs ?thing .
                ?thing
                    mlo:isPart ${dataset} .
            }
            `,
            reasoning: true,
        },
        {
            title: 'Technique used to anonymized the Dataset',
            query: outdent`
            SELECT ?techniqueName ?techniqueDescription
            FROM ${from}
            WHERE {
                ?technique
                    a ao:AnonymizationTechnique ;
                    ao:name ?techniqueName;
                    ao:description ?techniqueDescription;
                    ao:usedFor ${anonymizedDS}.
            }
            `,
            reasoning: false,
        },
    ];

    const [queryText, setQueryText] = createSignal(Queries[1].query)
    const [results, setResults] = createSignal("Waiting for query..")
    const [reasoning, setReasoning] = createSignal(false)
    const [loading, setLoading] = createSignal(false)

    const resolveQuery = async function () {
        if (loading())
            return
        setLoading(true)
        const query = createStardogQuery(queryText(), { reasoning: reasoning() })
        try {
            let queryResult = await query.execute()
            if (queryResult.results && queryResult.results.bindings && queryResult.results.bindings.length > 0) {
                let text = ""
                queryResult.results.bindings.forEach((el: any, index) => {
                    text += `${index}: ${'\n'}`
                    for (var prop in el) {
                        if (Object.prototype.hasOwnProperty.call(el, prop)) {
                            text += `${prop}: ${el[prop].value} ${'\n'}`
                        }
                    }
                    text += '\n'
                })
                setResults(text)
                setLoading(false)
            } else {
                setResults("There hasn't been any match for the inserted query")
                setLoading(false)
            }
        } catch (e) {
            setResults("Error")
            setLoading(false)
            console.error(e)
        }
    }

    return (
        <div class="flex flex-col items-center justify-center bg-gray-800 w-full h-auto my-20 sm:w-3/4 sm:rounded-lg sm:shadow-xl">
            <h2 class="my-10 text-2xl font-semibold">
                Your dataset has been Anonymized!
            </h2>
            <div class="p-4 w-full flex flex-col items-center justify-center">
                <div class="group relative w-full flex items-center justify-center">
                    <button class="text-white bg-gray-700 px-6 h-10 rounded border border-2 border-gray-600 w-3/4 hover:bg-gray-600">Select a query</button>
                    <nav tabindex="0" class="cursor-pointer z-50 flex items-center justify-center border border-2 w-3/4 bg-gray-700 invisible border-gray-600 rounded absolute top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1">
                        <ul class="py-1 w-full">
                            <For each={Queries}>
                                {el =>
                                    <li class="hover:bg-gray-600" onClick={() => { setQueryText(el.query); setReasoning(el.reasoning) }}>
                                        <a class="text-white block px-4 py-2">
                                            {el.title}
                                        </a>
                                    </li>
                                }
                            </For>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="flex flex-row w-full justify-center items-center mb-20">
                <div class="w-2/5 flex justify-center items-center">
                    <textarea
                        id="query"
                        rows="6"
                        class="block p-2.5 mt-8 w-4/5 h-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={queryText()}
                        onChange={(el) => setQueryText(el.currentTarget.value)}
                        placeholder="Insert query here...">
                    </textarea>
                </div>
                <div class="w-1/5 flex flex-col justify-center items-center">
                    <span class="py-4 font-semibold">Reasoning:</span>
                    <label class="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox"
                            checked={reasoning()}
                            onChange={el => setReasoning(el.currentTarget.checked)}
                            class="sr-only peer" />
                        <div class="w-11 h-6 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-gray-700 peer-checked:after:border-0 dark:border-gray-600 peer-checked:bg-amber-300"></div>
                    </label>
                    <img class="cursor-pointer pt-8" src="https://img.icons8.com/glyph-neue/64/fcd34d/play-button-circled.png" onClick={resolveQuery} />
                </div>
                <div class="w-2/5 flex justify-center items-center">
                    <textarea
                        id="result"
                        readonly
                        rows="6"
                        class="block p-2.5 mt-8 w-4/5 h-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={results()}>
                    </textarea>
                </div>
            </div>
        </div>
    );
};

export default QueryDataset
