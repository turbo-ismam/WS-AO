import { Routes, Route } from "@solidjs/router"
import { lazy } from "solid-js"

const Header = lazy(() => import("./components/Header"))
const UploadFile = lazy(() => import("./pages/UploadFile"))

export default function App() {
  return <>
    <Header />
    <Routes>
      <Route path="/" component={UploadFile} />
    </Routes>
  </>
}