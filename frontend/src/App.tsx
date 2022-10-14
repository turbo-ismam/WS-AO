import { Routes, Route } from "@solidjs/router"
import { lazy } from "solid-js";

const Home = lazy(() => import("./pages/Home"));

export default function App() {
  return <>
    <nav class="px-4 lg:px-6 py-2.5 ">
      <div class="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">
        <a class="flex items-center ml-20 pt-10">
          <img src="https://i.imgur.com/jtSCRjH.png" class="mr-3" alt="anonym.me Logo" />
        </a>        
      </div>
    </nav>
    <Routes>
      <Route path="/" component={Home} />
    </Routes>
  </>
}