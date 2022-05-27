import {setupServer} from "msw/node"
import {handlers} from "../mswHandlers"
import axios from "axios";

// Setup mock server
const server = setupServer(...handlers)

describe("Real network requests to MSW tests", () => {
    beforeAll(() => server.listen())
    afterAll(() => server.close())

    test("fetch() test", async () => {
        const response = await fetch('/test', {
            method: 'POST',
            headers: new Headers({
                authorization: "Bearer some_token #2"
            })
        })

        // Read body as a text from response
        const responseBody = await response.text()

        expect(responseBody).toEqual("test OK")
    })

    test("axios test", async () => {
        try {
            const response = await axios.post('/test', {
                authorization: "Bearer some_token #3"
            })

            expect(response).toMatchObject({
                status: 200,
                data: "test OK"
            })
        }
        catch (error) {
            console.log("Error:")
            console.log(error)
            throw error             // test fail
        }
    })
})
