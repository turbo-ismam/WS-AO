import { Routes, Route } from "@solidjs/router"
import { lazy } from "solid-js";

const Header = lazy(() => import("./components/header"));
const Home = lazy(() => import("./pages/Home"));

export default function App() {
  return <>
    <Header />
    <Routes>
      <Route path="/" component={Home} />
    </Routes>
  </>
}