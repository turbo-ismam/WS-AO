import type { Component } from 'solid-js'

const Header: Component = () => {
  return (
    <nav class="px-4 lg:px-6 py-2.5 ">
        <div class="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">
        <a class="flex items-center ml-20 pt-10">
            <img src="https://i.imgur.com/jtSCRjH.png" class="mr-3" alt="anonym.me Logo" />
        </a>        
        </div>
    </nav>
  )
}

export default Header
