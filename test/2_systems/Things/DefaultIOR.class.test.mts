import DefaultIOR from "../../../src/2_systems/Things/DefaultIOR.class.mjs";

describe("IOR Class", () => {


  test("clone", async () => {
    let url = new DefaultIOR().init("https://google.de/some/test?asdf=123");
    let url2 = url.clone();
    expect(url2.href).toEqual(url.href);
    expect(url2).not.toBe(url);

  })



  let validate: any[] = [];

  validate.push({
    url: "https://shifter.staging.shiftphones.com:30484/",
    result: {
      protocol: ["ior", "https"],
      pathName: "/",
      fileName: undefined,
      fileType: undefined,
      search: "",
      searchParameters: {},
      hash: undefined,
      host: "shifter.staging.shiftphones.com:30484",
      port: 30484,
      normalizedHref: "https://shifter.staging.shiftphones.com:30484/",
      origin: "https://shifter.staging.shiftphones.com:30484",
      hostName: "shifter.staging.shiftphones.com",
      href: "ior:https://shifter.staging.shiftphones.com:30484/",
    },
  });

  validate.push({
    url: "ior:ude:rest:http://test.wo-da.de/ior/131cac9f-ceb3-401f-a866-73f7a691fed7",
    result: {
      protocol: ["ior", "ude", "rest", "http"],
      hostName: "test.wo-da.de",
      pathName: "/ior/131cac9f-ceb3-401f-a866-73f7a691fed7",
      origin: "http://test.wo-da.de",
      id: "131cac9f-ceb3-401f-a866-73f7a691fed7",
      isLoaded: false,
      udeUniquePath: 'ior:/ior/131cac9f-ceb3-401f-a866-73f7a691fed7',
      basePath: '/ior'
    },
  });

  validate.push({
    url: "ior:esm:git:tla.EAM.Once",
    result: {
      protocol: ["ior", "esm", "git"],
      hostName: undefined,
      pathName: undefined,
      origin: undefined,
      isLoaded: false,
      namespace: "tla.EAM.Once",
    },
  });

  validate.push({
    url: "ior:esm:git:tla.EAM.Once[1.0.0]",
    result: {
      protocol: ["ior", "esm", "git"],
      hostName: undefined,
      pathName: undefined,
      origin: undefined,
      isLoaded: false,
      namespace: "tla.EAM.Once",
      namespaceVersion: "1.0.0",
    },
  });

  validate.push({
    url: "ior:esm:git:tla.EAM.Once[^1.0.0]",
    result: {
      protocol: ["ior", "esm", "git"],
      hostName: undefined,
      pathName: undefined,
      origin: undefined,
      isLoaded: false,
      namespace: "tla.EAM.Once",
      namespaceVersion: "^1.0.0",
      href: "ior:esm:git:/tla.EAM.Once[^1.0.0]"
    },
  });

  validate.push({
    url: "ior:esm:git:tla.EAM.Once[latest]",
    result: {
      protocol: ["ior", "esm", "git"],
      hostName: undefined,
      pathName: undefined,
      origin: undefined,
      isLoaded: false,
      namespace: "tla.EAM.Once",
      namespaceVersion: "latest",
      href: "ior:esm:git:/tla.EAM.Once[latest]"
    },
  });



  validate.push({
    url: "ior:esm:git:tla.EAM.Namespace[#branchName]",
    result: {
      protocol: ["ior", "esm", "git"],
      hostName: undefined,
      pathName: undefined,
      origin: undefined,
      isLoaded: false,
      namespace: "tla.EAM.Namespace",
      namespaceVersion: "#branchName",
      href: "ior:esm:git:/tla.EAM.Namespace[#branchName]"
    },
  });

  validate.push({
    url: "ior:esm:git:tla.EAM.Once[latest]/someClassName",
    result: {
      protocol: ["ior", "esm", "git"],
      hostName: undefined,
      pathName: undefined,
      origin: undefined,
      isLoaded: false,
      namespace: "tla.EAM.Once",
      namespaceVersion: "latest",
      namespaceObject: "someClassName",
      href: "ior:esm:git:/tla.EAM.Once[latest]/someClassName"
    },
  });

  validate.push({
    url: "ior:esm:git:/tla.EAM.Once[latest]",
    result: {
      protocol: ["ior", "esm", "git"],
      hostName: undefined,
      pathName: undefined,
      origin: undefined,
      isLoaded: false,
      namespace: "tla.EAM.Once",
      namespaceVersion: "latest",
      href: "ior:esm:git:/tla.EAM.Once[latest]"
    },
  });

  validate.push({
    url: "ior:ude:http://localhost:3000/UDE/6b8c04b7-c88f-4cde-ba97-325e6914d2bd",
    result: {
      protocol: ["ior", "ude", "http"],
      port: 3000,
      hostName: "localhost",
      pathName: "/UDE/6b8c04b7-c88f-4cde-ba97-325e6914d2bd",
      origin: "http://localhost:3000",
      isLoaded: false,
      id: "6b8c04b7-c88f-4cde-ba97-325e6914d2bd",
      href: "ior:ude:http://localhost:3000/UDE/6b8c04b7-c88f-4cde-ba97-325e6914d2bd"
    },
  });


  // validate.push({
  //   url: "ior:esm:github:tla.EAM.OnceService.Once.express#/ONCE-DAO/Once.express",
  //   result: {
  //     protocol: ["ior", "esm", "github"],
  //     hostName: undefined,
  //     pathName: undefined,
  //     origin: undefined,
  //     isLoaded: false,
  //     namespace: "tla.EAM.OnceService.Once.express",
  //     namespaceVersion: "#sdsgzudhsudhusidh",
  //     href: "ior:github:tla.EAM.OnceService.Once.express#/ONCE-DAO/Once.express"
  //   },
  // });




  for (let testConfig of validate) {
    test("Test Parser IOR: " + testConfig.url, () => {
      let url = new DefaultIOR().init(testConfig.url);
      for (const [key, value] of Object.entries(testConfig.result)) {
        // @ts-ignore
        expect(url[key], `${key} : ${value} => ${url[key]}`).toEqual(value);
      }
    });

  }
});
