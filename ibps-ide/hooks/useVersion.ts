import { useEffect, useState } from "preact/hooks";
import packagejson from "../../package.json";
import { getCompilerVersion } from "../lib/ibpscompInterop/ibpscomp";

export const useVersion = () => {
  const [compilerVersion, setCompilerVersion] = useState("");
  const [ideVersion, setIdeVersion] = useState("");

  useEffect(() => {
    setIdeVersion(packagejson.version);
    getCompilerVersion().then((version) => {
      setCompilerVersion(version);
    });
  }, []);

  return { compilerVersion, ideVersion };
};
