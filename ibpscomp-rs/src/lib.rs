pub mod compiler;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn ibps_to_py(code: &str) -> String {
    let compiled = compiler::ibps_to_py(code);
    let stdlib = compiler::stdlib::generate_stdlib(&compiled);
    return format!("{}\n{}", stdlib, compiled);
}

#[wasm_bindgen]
pub fn ibpscomp_rs_version() -> String {
    String::from(env!("CARGO_PKG_VERSION"))
}
