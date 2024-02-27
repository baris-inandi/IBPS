import { shell } from "@tauri-apps/api";
import { FunctionalComponent } from "preact";
import { HTMLAttributes } from "preact/compat";

interface AhrefProps extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {}

const Ahref: FunctionalComponent<AhrefProps> = (props) => {
  if (window.__TAURI__) {
    return (
      <button
        onClick={() => {
          if (props.href) {
            shell.open(String(props.href));
          }
        }}
        {...{
          ...props,
          className: props.className + " cursor-pointer inline tauri-ahref",
        }}
      >
        {props.children}
      </button>
    );
  }
  return <a {...props}>{props.children}</a>;
};

export default Ahref;
