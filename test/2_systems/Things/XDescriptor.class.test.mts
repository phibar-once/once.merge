import DefaultIOR from "../../../src/2_systems/Things/DefaultIOR.class.mjs"
import BaseThing from "../../../src/1_infrastructure/BaseThing.class.mjs";
import Url, { UrlID } from "../../../src/3_services/Url.interface.mjs";
import DefaultUrl from "../../../src/2_systems/Things/DefaultUrl.class.mjs";
import ServerSideUcpComponentDescriptor from "../../../src/2_systems/ServerSideUcpComponentDescriptor.class.mjs";
import InterfaceDescriptor from "../../../src/2_systems/Things/InterfaceDescriptor.class.mjs";
import ClassDescriptor from "../../../src/2_systems/Things/ClassDescriptor.class.mjs";



interface MyString {
  myString: string;
}

const MyStringID = InterfaceDescriptor.lastDescriptor;

interface MyString2 {
  myString: string;
}
const MyString2ID = InterfaceDescriptor.lastDescriptor;

interface MyUrl extends MyString {
  myUrl: string;
}

const MyUrlID = InterfaceDescriptor.lastDescriptor;


@ClassDescriptor.componentExport('defaultExport')
//@ts-ignore
class TestClass1 extends DefaultUrl implements MyUrl, MyString, MyString2 {
  myUrl: string = "";
  myString: string = "";

}


describe(" Descriptor", () => {

  describe("Class Descriptor", () => {


    test("new ClassDescriptor", async () => {
      let td = new ClassDescriptor().init(DefaultIOR);
      expect(td).toBeInstanceOf(ClassDescriptor);
    })

    test("ClassDescriptor on Class (Static)", async () => {
      expect(DefaultIOR.classDescriptor).toBeInstanceOf(ClassDescriptor);
    })

    test("ClassDescriptor on Instance", async () => {
      let ior = new DefaultIOR();
      expect(ior.classDescriptor).toBeInstanceOf(ClassDescriptor);
    })




    test("Class in ClassDescriptor", async () => {
      let ior = new DefaultIOR();
      expect(ior.classDescriptor.class).toBe(DefaultIOR);
    })

    test("ClassDescriptor extends", async () => {


      class TestClass1 extends DefaultUrl implements Url {

      }
      expect(TestClass1.classDescriptor.extends[0]).toBe(DefaultUrl);
      expect(TestClass1.classDescriptor.extends[1]).toBe(BaseThing);

    })




  })
  describe("Interface Descriptor", () => {



    test("Interface Registration", async () => {

      let x = new TestClass1();

      UrlID

      let allInterfaces = x.classDescriptor.implementedInterfaces;
      let interfaceNameList = allInterfaces.map(x => x.name);

      expect(interfaceNameList.includes('MyString2')).toBeTruthy();
      expect(interfaceNameList.includes('MyString')).toBeTruthy();
      expect(interfaceNameList.includes('MyUrl')).toBeTruthy();
      expect(interfaceNameList.includes('Url')).toBeTruthy();
      expect(interfaceNameList.includes('JSONProvider')).toBeTruthy();


      expect(allInterfaces.length).toEqual(5);


    })

    // test("File Location", async () => {
    //   //@ts-ignore
    //   expect(TestClass1.classDescriptor.filename).toBe(import.meta.url);
    // })



    test("Interface Descriptor implementations", () => {

      expect(MyUrlID?.implementations.includes(TestClass1.classDescriptor)).toBe(true);

    })

    test("Interface Descriptor extends", () => {

      expect(MyUrlID?.extends).toMatchObject([MyStringID]);
    })

    // test("Ucp Component Descriptor", () => {
    //   let x = new TestClass1();
    //   expect(x.classDescriptor.ucpComponentDescriptor).toBeInstanceOf(ServerSideUcpComponentDescriptor);

    // })
    // test("Class in Ucp Component Descriptor", () => {
    //   let x = new TestClass1();

    //   expect(x.classDescriptor.ucpComponentDescriptor).toBeInstanceOf(ServerSideUcpComponentDescriptor);

    //   //@ts-ignore
    //   expect(x.classDescriptor.ucpComponentDescriptor.units.includes(TestClass1)).toBe(true);


    // })

    test("ClassDescriptor implements", async () => {
      expect(MyUrlID).toBeInstanceOf(InterfaceDescriptor);

      if (MyUrlID) {

        expect(TestClass1.classDescriptor.implements(MyUrlID)).toBe(true);
      }
    })

    test("has ucpComponentDescriptor", async () => {
      expect(MyUrlID.ucpComponentDescriptor).toBeInstanceOf(ServerSideUcpComponentDescriptor);
      expect(MyUrlID.packageVersion).toBe(MyUrlID.ucpComponentDescriptor.version);
      expect(MyUrlID.packageName).toBe(MyUrlID.ucpComponentDescriptor.name);
      expect(MyUrlID.packagePath).toBe(MyUrlID.ucpComponentDescriptor.srcPath);
    })
  });


  describe("UcpComponent Descriptor", () => {
    test("getUnitByName (InterfaceDescriptor)", async () => {
      let ucpComponentDescriptor = MyUrlID.ucpComponentDescriptor;

      let ID = ucpComponentDescriptor.getUnitByName("MyUrl", "InterfaceDescriptor");

      expect(ID).toBeInstanceOf(InterfaceDescriptor);
    });
    /*
        test("createExportFile", async () => {
          let ucpComponentDescriptor = MyUrlID.ucpComponentDescriptor;
          ucpComponentDescriptor.exportFile = "index_test.ts.tmp"
          await ucpComponentDescriptor.createExportFile();
    
        })
        */

    test("defaultExportObject", async () => {
      let ucpComponentDescriptor = MyUrlID.ucpComponentDescriptor;

      expect(ucpComponentDescriptor.defaultExportObject).toBe(TestClass1);
    })

    test("Method _getInterfaceExportName export interface InterfaceName", async () => {
      let ucpComponentDescriptor = MyUrlID.ucpComponentDescriptor;
      let data = "\nexport interface InterfaceName \n"

      //@ts-ignore
      let interfaceName = ucpComponentDescriptor._getInterfaceExportName("", "InterfaceName", data);

      expect(interfaceName).toBe("InterfaceName");
    })

    test("Method _getInterfaceExportName export interface InterfaceName", async () => {
      let ucpComponentDescriptor = MyUrlID.ucpComponentDescriptor;
      let data = "\nexport default interface InterfaceName \n"

      //@ts-ignore
      let interfaceName = ucpComponentDescriptor._getInterfaceExportName("", "InterfaceName", data);

      expect(interfaceName).toBe("default");
    })

    test("Method _getInterfaceExportName export default interface InterfaceName", async () => {
      let ucpComponentDescriptor = MyUrlID.ucpComponentDescriptor;
      let data = "\nexport default interface InterfaceName \n"

      //@ts-ignore
      let interfaceName = ucpComponentDescriptor._getInterfaceExportName("", "InterfaceName", data);

      expect(interfaceName).toBe("default");
    })

    test("Method _getInterfaceExportName export default InterfaceName", async () => {
      let ucpComponentDescriptor = MyUrlID.ucpComponentDescriptor;
      let data = "\nexport default InterfaceName \n"

      //@ts-ignore
      let interfaceName = ucpComponentDescriptor._getInterfaceExportName("", "InterfaceName", data);

      expect(interfaceName).toBe("default");
    })

    test("Method _getInterfaceExportName export { InterfaceName }", async () => {
      let ucpComponentDescriptor = MyUrlID.ucpComponentDescriptor;
      let data = "\export { InterfaceName } \n"

      //@ts-ignore
      let interfaceName = ucpComponentDescriptor._getInterfaceExportName("", "InterfaceName", data);

      expect(interfaceName).toBe("InterfaceName");
    })

  })

});