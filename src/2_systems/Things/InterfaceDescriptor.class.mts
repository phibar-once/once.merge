import ClassDescriptorInterface from "../../3_services/ClassDescriptor.interface.mjs";
import InterfaceDescriptorInterface from "../../3_services/InterfaceDescriptor.interface.mjs";
import UcpComponentDescriptorInterface from "../../3_services/UcpComponentDescriptor.interface.mjs";
import UcpComponentDescriptor from "../BaseUcpComponentDescriptor.class.mjs";

export default class InterfaceDescriptor implements InterfaceDescriptor {
    public readonly name: string;

    readonly extends: InterfaceDescriptorInterface[] = [];
    readonly implementations: ClassDescriptorInterface[] = [];
    private static _lastDescriptor: InterfaceDescriptor;
    public ucpComponentDescriptor!: UcpComponentDescriptorInterface;

    public filename: string = "Missing";

    _componentExport: 'namedExport' | 'defaultExport' | undefined;


    static get lastDescriptor(): InterfaceDescriptor {
        if (!this._lastDescriptor) throw new Error("Missing last Descriptor. Check TS transform Script")
        return this._lastDescriptor;
    }

    get componentExportName(): string {
        return this.name + 'ID';
    }

    get packagePath(): string {
        if (!this.ucpComponentDescriptor?.srcPath) throw new Error("Missing srcPath in ucpComponentDescriptor");
        return this.ucpComponentDescriptor.srcPath;
    }
    get packageName(): string {
        if (!this.ucpComponentDescriptor?.name) throw new Error("Missing name in ucpComponentDescriptor");
        return this.ucpComponentDescriptor.name;

    }
    get packageVersion(): string {
        if (!this.ucpComponentDescriptor?.version) throw new Error("Missing version in ucpComponentDescriptor");
        return this.ucpComponentDescriptor.version;

    }


    get allExtendedInterfaces(): InterfaceDescriptorInterface[] {
        let result: InterfaceDescriptorInterface[] = [];
        for (const interfaceObject of this.extends) {
            result.push(interfaceObject);
            const subInterfaces = interfaceObject.allExtendedInterfaces;
            if (subInterfaces.length > 0) result.push(...subInterfaces);
        }
        return result;
    }

    get implementedInterfaces(): InterfaceDescriptorInterface[] {
        return this._getImplementedInterfaces();
    }

    get componentExport(): 'namedExport' | 'defaultExport' | undefined { return this._componentExport }
    set componentExport(value: 'namedExport' | 'defaultExport' | undefined) { this._componentExport = value; }

    _getImplementedInterfaces(interfaceList: InterfaceDescriptorInterface[] = []): InterfaceDescriptorInterface[] {
        if (!interfaceList.includes(this)) {
            interfaceList.push(this);
            for (const interfaceObject of this.extends) {
                (interfaceObject as InterfaceDescriptor)._getImplementedInterfaces(interfaceList);
            }
        }
        return interfaceList;
    }

    addImplementation(classDescriptor: ClassDescriptorInterface): this {
        this.implementations.push(classDescriptor);
        return this
    }


    addExtension(packagePath: string, packageName: string, packageVersion: string | undefined, interfaceName: string): InterfaceDescriptor {

        let ucpComponentDescriptor = UcpComponentDescriptor.getDescriptor(packagePath, packageName, packageVersion);

        let interfaceDesc = ucpComponentDescriptor.getUnitByName(interfaceName, 'InterfaceDescriptor')
        if (interfaceDesc === undefined) {
            interfaceDesc = new InterfaceDescriptor(ucpComponentDescriptor, interfaceName);
        }

        this.add(interfaceDesc);

        return this;
    }

    add(object: InterfaceDescriptor | UcpComponentDescriptorInterface): this {
        if (object instanceof InterfaceDescriptor) {
            this.extends.push(object)
        } else if ("writeToPath" in object) {
            this.ucpComponentDescriptor = object;
        }
        return this;
    }

    static register(packagePath: string, packageName: string, packageVersion: string | undefined, interfaceName: string): InterfaceDescriptor {
        let ucpComponentDescriptor = UcpComponentDescriptor.getDescriptor(packagePath, packageName, packageVersion);

        let interfaceDesc = ucpComponentDescriptor.getUnitByName(interfaceName, 'InterfaceDescriptor')
        if (interfaceDesc) {
            this._lastDescriptor = interfaceDesc;
            return interfaceDesc;
        }

        interfaceDesc = new this(ucpComponentDescriptor, interfaceName);
        this._lastDescriptor = interfaceDesc;

        return interfaceDesc;
    }

    constructor(ucpComponentDescriptor: UcpComponentDescriptorInterface, interfaceName: string) {
        this.name = interfaceName;
        ucpComponentDescriptor.register(this);
        return this;
    }

}