import { shell } from "@tauri-apps/api";
import { FunctionalComponent } from "preact";
import { HTMLAttributes } from "preact/compat";

interface AhrefProps extends HTMLAttributes<HTMLAnchorElement> {}

const Ahref: FunctionalComponent<AhrefProps> = (props) => {
    if (window.__TAURI__) {
        const href = String(props.href);
        delete props.href;
        return (
            <a
                data-tauri-ahref={href}
                onClick={() => {
                    if (props.href) {
                        shell.open(href, "open");
                    }
                }}
                {...{
                    ...props,
                    className: props.className + " cursor-pointer",
                }}
            >
                {props.children}
            </a>
        );
    }
    return <a {...props}>{props.children}</a>;
};

export default Ahref;
