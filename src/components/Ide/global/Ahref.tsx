import { shell } from "@tauri-apps/api";
import { FunctionalComponent } from "preact";
import { HTMLAttributes } from "preact/compat";

interface AhrefProps extends HTMLAttributes<HTMLAnchorElement> {}

const Ahref: FunctionalComponent<AhrefProps> = (props) => {
    if (window.__TAURI__) {
        return (
            <a
                onClick={() => {
                    if (props.href) {
                        shell.open(String(props.href));
                    }
                }}
                {...{ ...props, href: "javascript:;" }}
            >
                {props.children}
            </a>
        );
    }
    return <a {...props}>{props.children}</a>;
};

export default Ahref;
