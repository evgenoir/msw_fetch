import {setupServer} from "msw/node"
import {handlers} from "../mswHandlers"

// Setup mock server
const server = setupServer(...handlers)

describe("Fetch under Jest tests", () => {
    beforeAll(() => server.listen())
    afterAll(() => server.close())

    test("Real fetch request from Jest's test", async () => {
        const response = await fetch('/test', {
            method: 'POST',
            headers: new Headers({
                authorization: "Bearer some_token #2"
            })
        })

        console.log("Response:")
        console.log(response)

        expect(response).toMatchObject({    // Error - Response doesn't contain body
            body: "test OK"
        })
    })
})
