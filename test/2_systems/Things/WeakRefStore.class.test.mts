import WeakRefStore from "../../../src/2_systems/Things/WeakRefStore.class.mjs";

describe("Default Store", () => {
    test("init", async () => {
        let store = new WeakRefStore().init();
        expect(store).toBeInstanceOf(WeakRefStore);
    })

    let targetObject = { some: 'data' };



    test("register key=String", async () => {
        let store = new WeakRefStore().init();
        store.register('123', targetObject)

        expect(store.lookup('123')).toBe(targetObject);
    })

    test("register key=Object", async () => {
        let store = new WeakRefStore().init();
        store.register(targetObject, targetObject);

        expect(store.lookup(targetObject)).toBe(targetObject);
    })

    test("remove key=String", async () => {
        let store = new WeakRefStore().init();
        store.register('123', targetObject);

        store.remove('123');
        expect(store.lookup('123')).toBe(undefined);

    })

    test("remove key=Object", async () => {
        let store = new WeakRefStore().init();
        store.register(targetObject, targetObject);

        store.remove(targetObject);
        expect(store.lookup(targetObject)).toBe(undefined);

    })

    test("discover", async () => {
        let store = new WeakRefStore().init();
        store.register('123', targetObject);

        store.register(targetObject, targetObject);

        expect(store.discover()).toStrictEqual([{ key: '123', value: targetObject }, { key: targetObject, value: targetObject }]);
    })

    test("clear", async () => {
        let store = new WeakRefStore().init();
        store.register('123', targetObject);
        store.register(targetObject, targetObject);

        store.clear();

        expect(store.discover()).toStrictEqual([]);
    })

})