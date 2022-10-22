import { Component, createSignal } from 'solid-js'
import createMLQuery from '../hooks/MLQuery' 

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
                    <div>
                        <a href="#" class="mt-10 group relative inline-block text-xs text-gray-500 hover:text-red-500 duration-300">
                            File should in .json format
                            <span class="absolute hidden group-hover:flex -top-6 -right-3 translate-x-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:top-1/2  before:right-[100%] before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-gray-700">
                                The file should contain only one column with the records to anonymize
                            </span>
                        </a>
                    </div>
                    <div class="text-xs text-gray-500"></div> 
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
