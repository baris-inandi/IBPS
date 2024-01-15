import { useEffect, useState } from "react";
import packagejson from "../../package.json";
import { getCompilerVersion } from "../lib/ibpscomp-rs/ibpscomp";

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

