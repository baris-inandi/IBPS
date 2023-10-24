pub mod compiler;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn ibps_to_py(code: &str) -> String {
    format!(
        "{}{}",
        compiler::stdlib::generate_stdlib(compiler::stdlib::StdlibType::Ibps),
        compiler::ibps_to_py(code)
    )
}

#[wasm_bindgen]
pub fn ibpscomp_rs_version() -> String {
    String::from(env!("CARGO_PKG_VERSION"))
}
