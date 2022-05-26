import {rest} from "msw"

export const handlers = [
    rest.post('/test', (req, res, ctx) => {
        console.log("< /test")

        console.log("< Request:")
        console.log(req)

        return res(
            ctx.status(200),
            ctx.body("test OK")
        )
    })
]