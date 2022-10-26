import { Component, createSignal } from 'solid-js' 
import { outdent } from "outdent"
import {
    HeadlessDisclosureChild,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from 'solid-headless';

interface Query {
    title: string;
    query: string;
}

const Queries: Query[] = [
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

    return (
        <div class="h-screen font-sans text-amber-300 border-box flex justify-center w-full mx-auto">
            <div class="flex flex-col items-center justify-center bg-gray-800 w-full h-auto my-20 sm:w-3/4 sm:rounded-lg sm:shadow-xl">
                <h2 class="text-2xl font-semibold mt-0 ">
                    You dataset has been successfully Anonymized!
                    Try one of the following queries:
                </h2>    
                <Listbox defaultOpen value={selected()} onSelectChange={setSelected}>
                    <ListboxButton class="relative dark:bg-gray-700 w-11/12 py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        {selected().title}
                    </ListboxButton>                   
                </Listbox>
                <div class="grid grid-cols-3 gap-4 w-full items-center">
                    <div>
                        <textarea 
                            id="query" 
                            rows="6" 
                            class="block p-2.5 mt-8 w-4/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Insert query here...">           
                        </textarea>
                    </div>
                    <div>
                        >
                    </div>
                    <div>
                        <textarea 
                            id="result" 
                            rows="6" 
                            class="block p-2.5 mt-8 w-4/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Result">           
                        </textarea>
                    </div>
                </div>
                
                
            </div>
        </div>
    );
    };

export default QueryDataset
