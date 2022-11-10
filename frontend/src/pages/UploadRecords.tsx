import { Component, createSignal } from 'solid-js'
import parseText from '../hooks/TextParser' 
import createMLQuery from '../hooks/MLQuery'
import { getAnonymizedRecord } from '../utils/Anonymization'
import { createDataset, createRecord, createSensitiveThing, createAnonymizedDataset, getNewID } from '../utils/Query'
import { MLResponse } from '../models/MLResponse'
import { useNavigate } from '@solidjs/router'


const UploadRecords: Component = () => {
    const [dataset, setDataset] = createSignal("")
    const navigate = useNavigate()

    const submit = async function() {  
        try {
            var idN = await getNewID()
            if(idN == undefined || idN == NaN)
                idN = 0
            console.log("Creating DS " + idN)
            const datasetID = "#DS_" + idN
            const anonymizedDatasetID = "#ADS_" + idN

            //For the scope of this project we consider all Datasets as valid, even if each string is already anonymous
            await createDataset({
                id: datasetID
            }).execute()

            await createAnonymizedDataset({
                id: anonymizedDatasetID,
                dataset: datasetID,
                technique: "#AT_DataMasking",
            }).execute()

            //forEach record in the textbox
            parseText(dataset()).forEach(async (el, i) => {                       
                const potentialSensitiveThings = (await createMLQuery(el)).data
                //In this case we only anonymize ORGanizations
                const sensitiveThings = potentialSensitiveThings.filter((responseEl: MLResponse) => 
                    responseEl.entity_group == "ORG" && responseEl.score >= 0.6
                )

                const recordID = `#R${idN}_${i}`
                await createRecord({
                    id: recordID,
                    text: el,
                    dataset: datasetID,
                }).execute()
                await createRecord({
                    id: `#AR${idN}_${i}`,
                    text: getAnonymizedRecord(el, sensitiveThings),
                    dataset: anonymizedDatasetID,
                }).execute()

                if(sensitiveThings.length > 0 ) {
                    sensitiveThings.forEach(async (sensitiveThing: MLResponse, sensitiveThingI: number) => {
                        await createSensitiveThing({
                            id: `#ST_${idN}_${i}_${sensitiveThingI}`,
                            text: sensitiveThing.word,
                            position: sensitiveThing.start,
                            record: recordID,
                        }).execute()
                    });
                } 
            }) 
        } catch (e) {
            alert("UPLOADING_RECORDS_ERROR: " + e)
        } finally {
            console.log("Dataset Anonymized")
            navigate("/query/" + idN)
        }
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

export default UploadRecords
