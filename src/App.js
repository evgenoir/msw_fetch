import {setupWorker} from "msw"
import {useEffect} from "react"
import {handlers} from "./mswHandlers"

// Start the Mock Service Worker
export const worker = setupWorker()
worker.start({
    // I don't want to see warning in the browser console (default is warn)!
    onUnhandledRequest: 'bypass'
})

export default function App() {
    // Set handlers on component mount and reset on component unmount
    useEffect(() => {
        worker.resetHandlers(...handlers)
        return () => worker.resetHandlers()
    }, [])

    const clickHandler = async () => {
        console.log("Fetch clicked")

        const response = await fetch('/test', {
            method: 'POST',
            headers: new Headers({
                authorization: "Bearer some_token #1"
            })
        })

        // Read body as a text from response
        const responseBody = await response.text()

        console.log(`Response body: ${responseBody}`)
    }

    return (
        <>
            <button onClick={clickHandler}>Fetch</button>
        </>
    );
}
