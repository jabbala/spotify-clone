import './App.css'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from './components/ui/button';


function App() {

  return (
    <>
      <header>
      <SignedOut>
        <SignInButton>
          <Button>
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    <main>
      <h1>Helloworld</h1>
    </main>
    </>
  )
}

export default App
