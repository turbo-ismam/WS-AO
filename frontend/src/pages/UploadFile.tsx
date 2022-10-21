import { Component, createSignal } from 'solid-js'
import createMLQuery from '../components/MLQuery'

const UploadFile: Component = () => {
    const [dataset, setDataset] = createSignal({})

    const fileChangeEvent = (files: FileList | null) => {
        if(files) {
            setDataset(files[0])
            submit()
        } else {
            alert("Error selecting file")
        }
    }

    const submit = async function() {
        const res = await createMLQuery(dataset() as File)
        console.log(res.data)
    }

  return (
        <div class="h-screen font-sans text-amber-300 border-box">
        <div class="flex justify-center w-full mx-auto sm:max-w-lg">
            <div class="flex flex-col items-center justify-center bg-gray-800 w-full h-auto my-20 sm:w-3/4 sm:rounded-lg sm:shadow-xl">
                <div class="mt-10 mb-10 text-center">
                    <h2 class="text-2xl font-semibold mb-2">Upload your Dataset</h2>
                    <p class="text-xs text-gray-500">File should be of format .csv</p>
                </div>
                <form class="relative w-4/5 h-32 max-w-xs mb-10">
                    <input type="file" id="file-upload" class="hidden" onChange={(e) => fileChangeEvent(e.currentTarget.files)}/>
                    <label for="file-upload" class="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
                        <p class="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
                        <svg class="z-10 w-8 h-8 text-amber-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                        </svg>
                    </label>
                </form>
            </div>
        </div>
    </div>
  );
};

export default UploadFile
