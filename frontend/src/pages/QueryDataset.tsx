import { Component, createSignal, For } from 'solid-js' 
import { outdent } from 'outdent'

interface Query {
    title: string;
    query: string;
}

const Queries: Query[] = [
    {
        title: 'Custom Query',
        query: '',
    },
    {
        title: 'All the persons mentioned by the Dataset',
        query: outdent`
        SELECT ?person
        WHERE {
            ?person
                a foaf:person ;
                ao:isRepresentedBy ?thing .
             ?thing
                mlo:isPart "idDataset" .
        }
        `,
    },
    {
        title: 'Technique used to anonymized the Dataset',
        query: outdent`
        SELECT ?techniqueName ?techniqueDescription
        WHERE {
            ?technique
                a ao:AnonymizationTechnique ;
                ao:name ?techniqueName;
                ao:description ?techniqueDescription;
                ao:usedFor ?anonymizedDataset.
            ?anonymizedDataset
                ao:anonymizedFrom "idDataset"
        }
        `,
    },
];

const QueryDataset: Component = () => {
    const [selected, setSelected] = createSignal(Queries[0]);

    const resolveQuery = async function() {
        alert(selected().query)
    }

    return (
        <div class="flex flex-col items-center justify-center bg-gray-800 w-full h-auto my-20 sm:w-3/4 sm:rounded-lg sm:shadow-xl">
            <h2 class="my-10 text-2xl font-semibold">
                You dataset has been successfully Anonymized!
            </h2>    
            <div class="p-4 w-full flex flex-col items-center justify-center">
                <div class="group relative w-full flex items-center justify-center">
                    <button class="text-white bg-gray-700 px-6 h-10 rounded border border-2 border-gray-600 w-3/4 hover:bg-gray-600">Select a query</button>
                    <nav tabindex="0" class="cursor-pointer flex items-center justify-center border border-2 w-3/4 bg-gray-700 invisible border-gray-600 rounded absolute top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1">
                        <ul class="py-1 w-full">
                            <For each={Queries}>
                                { el =>                                    
                                    <li class="hover:bg-gray-600" onClick={() => setSelected(el)}>
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
                        value={selected().query}
                        placeholder="Insert query here...">           
                    </textarea>
                </div>
                <div class="w-1/5 flex justify-center items-center">
                    <img class="cursor-pointer" src="https://img.icons8.com/glyph-neue/64/fcd34d/play-button-circled.png" onClick={resolveQuery}/>
                </div>
                <div class="w-2/5 flex justify-center items-center">
                    <textarea 
                        id="result"
                        readonly 
                        rows="6" 
                        class="block p-2.5 mt-8 w-4/5 h-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Result">           
                    </textarea>
                </div>
            </div>
        </div>
    );
};

export default QueryDataset
