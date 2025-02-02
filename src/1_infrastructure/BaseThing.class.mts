import Thing, { ThingObjectState } from "../3_services/Thing.interface.mjs";
import EventService from "../3_services/EventService.interface.mjs";
import ClassDescriptor from "../2_systems/Things/ClassDescriptor.class.mjs";

import { Metaclass, TSClass } from '../3_services/TypeDescriptor.interface.mjs';

export enum emptyEventList { }

export default abstract class BaseThing<ClassInterface> implements Thing<ClassInterface> {
  objectState: ThingObjectState = ThingObjectState.ACTIVE;

  EVENT_NAMES = emptyEventList;
  protected _eventSupport!: EventService<any>;

  static get classDescriptor(): ClassDescriptor {
    if (this === BaseThing) {
      // @ts-ignore This should never happen
      return undefined;
    }
    // @ts-ignore
    return ClassDescriptor.getClassDescriptor4Class(this);
  }

  get classDescriptor(): ClassDescriptor {
    //TODO@MD Check how to do it better
    // HACK
    // @ts-ignore
    return this.constructor.classDescriptor;
  }


  protected _name: string | undefined;

  //type: any;
  //get name(): string { return this.constructor.name };
  get name(): string { return this._name || this.constructor.name };


  //static get type(): Metaclass {

  static get type(): TSClass {
    return Metaclass.getClass(this);
    // let result = this._typeDescriptorStore.get(this);
    // if (!result) {
    //   // @ts-ignore
    //   // It is abstract, but TS does not understand that
    //   result = new DefaultClassDescriptor().init(this);
    //   this._typeDescriptorStore.set(this, result);
    // }
    // return result;
  }

  get type(): Metaclass {
    //TODO@MD Check how to do it better
    // HACK
    // @ts-ignore
    return (this.constructor as Metaclass).type.metaclass;
  }

  get tsClass(): TSClass {
    //TODO@MD Check how to do it better
    // HACK
    // @ts-ignore
    return Metaclass.getClass(this.constructor) as TSClass;
  }

  static _typeDescriptor: any;

  private _id: string | undefined;
  get id() {
    // TODO Preplace with correct ID generator
    if (!this._id) {
      this._id = Math.round(Math.random() * 1000000000000) + "";
    }
    return this._id;
  }

  init(...a: any[]) {
    return this;
  }


  static getInstance() {
    // HACK
    // @ts-ignore
    return new this();
  }

  destroy(): void {
    this.objectState = ThingObjectState.DESTROYED;
  }

  get class(): any {
    return this.constructor
  }


}
