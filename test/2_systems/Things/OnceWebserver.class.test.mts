import OnceNodeServer from "../../../src/2_systems/Once/OnceNodeServer.class.mjs";

import fetch from 'node-fetch';

import OnceWebserver from "../../../src/2_systems/Once/Fastify.class.mjs";
import ExtendedPromise from "../../../src/2_systems/JSExtensions/Promise.class.mjs";

let server: OnceWebserver;

beforeEach(async () => {
    if (ONCE_STARTED === false) await OnceNodeServer.start();
});

afterEach(async () => {
    await server.stop();
})

describe("Once WebServer", () => {


    test("init", async () => {
        server = new OnceWebserver();
        expect(server).toBeInstanceOf(OnceWebserver);

        expect(server.status).toBe("stopped");
    })



    test("start", async () => {
        server = new OnceWebserver();

        await server.start();
        expect(server.status).toBe("running");


        let result = await fetch(server.internalUrl.href);

        expect(result.status).toBe(500);

        await server.stop();
        expect(server.status).toBe("stopped");


    })

    test("test EAMD.ucp Directory", async () => {
        server = new OnceWebserver();

        await server.start();
        expect(server.status).toBe("running");


        let url = server.internalUrl;
        url.pathName = "/EAMD.ucp/README.md";
        let href = url.href
        let result = await fetch(href);
        let text = await result.text();
        expect(result.ok).toBe(true);


        await server.stop();
        expect(server.status).toBe("stopped");


    })


    test("test ONCE.ts Directory", async () => {
        server = new OnceWebserver();

        await server.start();
        expect(server.status).toBe("running");


        let url = server.internalUrl;
        url.pathName = "/EAMD.ucp/tla/EAM/once.ts/README.md";
        let href = url.href
        let result = await fetch(href);
        let text = await result.text();
        expect(result.ok).toBe(true);


        await server.stop();
        expect(server.status).toBe("stopped");


    })

    // test("test ONCE.ts index.html", async () => {

    //     server = new OnceWebserver();

    //     await server.start();
    //     expect(server.status).toBe("running");


    //     let url = server.internalUrl;
    //     url.pathName = "/EAMD.ucp/tla/EAM/once.ts";
    //     let href = url.href
    //     let result = await fetch(href);
    //     let text = await result.text();

    //     //await ExtendedPromise.wait(1000000)

    //     expect(result.ok).toBe(true);


    //     await server.stop();
    //     expect(server.status).toBe("stopped");


    // }, 1000000)
})
