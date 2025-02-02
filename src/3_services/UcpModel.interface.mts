import { EventServiceConsumer } from "./EventService.interface.mjs";
import { JSONProvider } from "./JSON.interface.mjs";
import { ParticleUDEStructure } from "./Particle.interface.mjs";
import Thing from "./Thing.interface.mjs";
import Wave from "./Wave.interface.mjs";

export default interface UcpModel extends EventServiceConsumer, Thing<UcpModel>, JSONProvider {
    model: any;
    changelog: any; // UcpModelChangeLog | undefined
    destroy(): void;
    startTransaction(): void;
    processTransaction(): void;
    rollbackTransaction(): void;
    transactionState: UcpModelTransactionStates;
    loadOnAccess: boolean;
    toUDEStructure(particleSnapshot?: any): ParticleUDEStructure;
    version: string;
}


export enum UcpModelChangeLogMethods { "set" = "set", "delete" = "delete", "create" = "create" }

export type UcpModelChangelog = {
    [key: string | number]: UcpModelChangelog | Wave
}


export enum UcpModelTransactionStates {
    TRANSACTION_OPEN = "transactionOpen",
    BEFORE_CHANGE = "beforeChange",
    ON_CHANGE = "onChange",
    AFTER_CHANGE = "afterChange",
    TRANSACTION_CLOSED = "transactionClosed",
    TRANSACTION_ROLLBACK = "transactionRollback",
}

export enum UcpModelEvents {
    ON_MODEL_CHANGED = 'ON_MODEL_CHANGED',
    ON_MODEL_WILL_CHANGE = 'ON_MODEL_WILL_CHANGE',
    ON_MODEL_LOCAL_CHANGED = 'ON_MODEL_LOCAL_CHANGED'
}