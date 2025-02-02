import ExtendedPromise from "../../../src/2_systems/JSExtensions/Promise.class.mjs";
import WeakRefPromiseStore from "../../../src/2_systems/Things/WeakRefPromiseStore.class.mjs";

describe("Default Store", () => {
    test("init", async () => {
        let store = new WeakRefPromiseStore().init();
        expect(store).toBeInstanceOf(WeakRefPromiseStore);
    })

    let targetObject = { some: 'data' };



    test("register key=String", async () => {
        let store = new WeakRefPromiseStore().init();
        store.register('123', targetObject)

        expect(await store.lookup('123')).toBe(targetObject);
    })

    test("register key=Object", async () => {
        let store = new WeakRefPromiseStore().init();
        store.register(targetObject, targetObject);

        expect(await store.lookup(targetObject)).toBe(targetObject);
    })

    test("register Promise Equal on Query", async () => {
        let store = new WeakRefPromiseStore().init();

        let promiseHandler = ExtendedPromise.createPromiseHandler();

        store.register('123', promiseHandler.promise);

        let clone = store.lookup('123');

        expect(clone === promiseHandler.promise).toBeTruthy();
    })

    test("register Promise => Success", async () => {
        let store = new WeakRefPromiseStore().init();

        let promiseHandler = ExtendedPromise.createPromiseHandler();

        store.register('123', promiseHandler.promise);

        promiseHandler.setSuccess(555);

        let clone = await store.lookup('123');

        expect(clone).toBe(555);
    })

    test("register Promise => Error", async () => {
        let store = new WeakRefPromiseStore().init();

        let promiseHandler = ExtendedPromise.createPromiseHandler();

        store.register('123', promiseHandler.promise);

        promiseHandler.setError(new Error("Error"));
        await ExtendedPromise.wait(1);

        let clone = await store.lookup('123');

        expect(clone).toBe(undefined);
    })

    test("remove key=String", async () => {
        let store = new WeakRefPromiseStore().init();
        store.register('123', targetObject);

        store.remove('123');
        expect(await store.lookup('123')).toBe(undefined);

    })

    test("remove key=Object", async () => {
        let store = new WeakRefPromiseStore().init();
        store.register(targetObject, targetObject);

        store.remove(targetObject);
        expect(await store.lookup(targetObject)).toBe(undefined);

    })

    test("discover", async () => {
        let store = new WeakRefPromiseStore().init();
        store.register('123', targetObject);

        store.register(targetObject, targetObject);

        expect(store.discover()).toStrictEqual([{ key: '123', value: targetObject }, { key: targetObject, value: targetObject }]);
    })

    test("clear", async () => {
        let store = new WeakRefPromiseStore().init();
        store.register('123', targetObject);
        store.register(targetObject, targetObject);

        store.clear();

        expect(store.discover()).toStrictEqual([]);
    })

})