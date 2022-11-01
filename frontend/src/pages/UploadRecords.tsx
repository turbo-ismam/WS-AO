import { Component, createSignal } from 'solid-js'
import parseText from '../hooks/TextParser' 
import createMLQuery from '../hooks/MLQuery'
import { getAnonymizedRecord } from '../utils/Anonymization'
import { MLResponse } from '../models/MLResponse'

const UploadFile: Component = () => {
    const [dataset, setDataset] = createSignal("")

    const submit = async function() {
        parseText(dataset()).forEach(async el => {
            try {
                handleResponse(el, (await createMLQuery(el)).data)
            } catch (e) {
                console.error(e)
            }
        })
    }

    const handleResponse = async function(record: String, response: MLResponse[]) {
        const anonymizedRecord = getAnonymizedRecord(record, response.filter(
            record => record.entity_group == "ORG" && record.score >= 0.6
        ))
        console.log(record + "\n" + anonymizedRecord)
    }

  return (
    <div class="flex flex-col items-center justify-center bg-gray-800 w-full h-auto my-20 sm:w-3/4 sm:rounded-lg sm:shadow-xl">
        <form class="mt-10 mb-10 text-center w-full">
            <h2 class="text-2xl font-semibold mb-2">Anonymize your records!</h2>      
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Each line will be considered a record (max 100 records)</label>
            <textarea 
                id="message" 
                rows="4" 
                class="block p-2.5 mt-8 ml-16 w-11/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                value={dataset()}
                onChange={(e) => setDataset(e.currentTarget.value)}
                placeholder="Paste records here...">           
            </textarea>
            <button type="button" onClick={submit} class="mt-8 font-bold py-2 px-4 rounded bg-amber-300 hover:bg-amber-500 text-black" disabled={dataset() == ""}>Anonymize!</button>
        </form>              
    </div>
  );
};

export default UploadFile
