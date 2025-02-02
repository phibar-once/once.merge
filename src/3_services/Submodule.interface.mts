import Once from "./Once.interface.mjs";

export default interface Submodule {
  path: string | undefined;
  devPath: string | undefined;
  url: string | undefined;
  branch: string | undefined;
  distPath: string;
  installDependencies(eamdPath: string): void;
  build(eamdPath: string): void;
  afterbuild(eamdPath: string): void;
  watch(eamdPath: string): Promise<void>;
  init(config: { path?: string, url?: string, branch?: string }): Promise<Submodule>;
  addFromRemoteUrl(args: AddSubmoduleArgs): Promise<Submodule>;
}

export type AddSubmoduleArgs = {
  url: string;
  // TODO remove from args
  once: Once;
  branch?: string;
  overwrite?: { name: string; namespace: string };
};
