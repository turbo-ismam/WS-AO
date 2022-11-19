import { Component, createSignal } from 'solid-js'
import parseText from '../hooks/TextParser'
import createMLQuery from '../hooks/MLQuery'
import { getAnonymizedRecord } from '../utils/Anonymization'
import { createDataset, createRecord, createSensitiveThing, createAnonymizedDataset, getNewID, getOrganizationByName } from '../utils/Query'
import { MLResponse } from '../models/MLResponse'
import { useNavigate } from '@solidjs/router'


const UploadRecords: Component = () => {
    const [dataset, setDataset] = createSignal("")
    const [loading, setLoading] = createSignal(false)
    const navigate = useNavigate()

    const submit = async function () {
        setLoading(true)

        // First we try to contact the ML Algorythm since it could be busy
        let sensitiveThings: MLResponse[][] = []
        let errored = false

        const parsedDS = parseText(dataset())
        for (let el in parsedDS) {
            try {
                const { data, status } = await createMLQuery(parsedDS[el])
                if (status != 200) {
                    alert("ML busy, retry in a few seconds")
                    setLoading(false)
                    errored = true
                    return
                }

                //In this case we only anonymize ORGanizations
                sensitiveThings[el] = data.filter((responseEl: MLResponse) =>
                    responseEl.entity_group == "ORG" && responseEl.score >= 0.6
                )
            } catch (e) {
                setLoading(false)
                console.log("Error Interrogating HuggingFace: " + e)
            }
        }

        if (errored == true)
            return

        // Proceed to create all the Entities in StarDog
        var idN = await getNewID()
        if (idN == undefined || idN == NaN)
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

        //for record in the textbox
        for (let recordI in parsedDS) {
            const recordID = `#R${idN}_${recordI}`
            await createRecord({
                id: recordID,
                text: parsedDS[recordI],
                dataset: datasetID,
            }).execute()

            await createRecord({
                id: `#AR${idN}_${recordI}`,
                text: getAnonymizedRecord(parsedDS[recordI], sensitiveThings[recordI]),
                dataset: anonymizedDatasetID,
            }).execute()

            if (sensitiveThings.length > 0) {
                // Check if any element corresponds to an existing foaf:Organization and create SensitiveThing
                for (let thingI in sensitiveThings[recordI]) {
                    const response = await getOrganizationByName(sensitiveThings[recordI][thingI].word)

                    console.log(response)

                    await createSensitiveThing({
                        id: `#ST_${idN}_${recordI}_${thingI}`,
                        text: sensitiveThings[recordI][thingI].word,
                        position: sensitiveThings[recordI][thingI].start,
                        record: recordID,
                        represents: response
                    }).execute()
                }
            }
        }

        setLoading(false)
        console.log("Dataset Anonymized")
        navigate("/query/" + idN)
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
                <button type="button" onClick={submit} class="mt-8 font-bold py-2 px-4 rounded bg-amber-300 hover:bg-amber-500 text-black" disabled={dataset() == "" || loading() == true}>Anonymize!</button>
            </form>
        </div>
    );
};

export default UploadRecords
