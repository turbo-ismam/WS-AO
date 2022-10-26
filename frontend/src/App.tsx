import { Routes, Route } from "@solidjs/router"
import { lazy } from "solid-js"

const Header = lazy(() => import("./components/Header"))
const UploadRecords = lazy(() => import("./pages/UploadRecords"))
const QueryDataset = lazy(() => import("./pages/QueryDataset"))

export default function App() {
  return <>
    <Header />
    <Routes>
      <Route path="/" component={UploadRecords} />
    </Routes>
  </>
}