import { Routes, Route } from "@solidjs/router"
import { lazy } from "solid-js"

const Header = lazy(() => import("./components/Header"))
const UploadRecords = lazy(() => import("./pages/UploadRecords"))
const QueryDataset = lazy(() => import("./pages/QueryDataset"))

export default function App() {
  return <>
    <Header />
    <div class="h-screen font-sans text-amber-300 border-box">
      <div class="flex justify-center w-full mx-auto">
        <Routes>
          <Route path="/" component={QueryDataset} />
        </Routes>
      </div>
    </div>
  </>
}