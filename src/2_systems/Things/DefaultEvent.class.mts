import { OnceEvent } from "../../3_services/EventService.interface.mjs";
import BaseThing from "../../1_infrastructure/BaseThing.class.mjs";
import Thing from "../../3_services/Thing.interface.mjs";
import WeakRefStore from "./WeakRefStore.class.mjs";

export default class DefaultEvent extends BaseThing<DefaultEvent> implements OnceEvent {

    private readonly _store = new WeakRefStore();
    addCallback(callbackFunction: Function, targetObject: Thing<any>): void {
        this._store.register(targetObject, callbackFunction);
    }
    async fire(eventSource: Thing<any>, ...args: any[]) {
        let result = this.getCallbackFunctions().map(eventTarget => {
            return eventTarget.value(this, eventSource, ...args) as Promise<any>;
        });
        return Promise.all(result);
    }

    getCallbackFunctions() {
        return this._store.discover();
    }


}