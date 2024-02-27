pub mod compiler;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn ibps_to_py(code: &str) -> String {
    let compiled = compiler::ibps_to_py(code, "ibps_wasm", false);
    let stdlib = compiler::stdlib::generate_stdlib(&compiled);
    return format!("{}\n{}", stdlib, compiled);
}

pub fn ibps_to_py_native(code: &str, filename: &str) -> String {
    let compiled = compiler::ibps_to_py(code, filename, true);
    let stdlib = compiler::stdlib::generate_stdlib(&compiled);
    return format!("{}\n{}", stdlib, compiled);
}

#[wasm_bindgen]
pub fn compiler_version() -> String {
    format!(
        "{}-s{}",
        env!("CARGO_PKG_VERSION"),
        include_str!("../stdlib/VERSION")
    )
}

// Ensure backwards compatibility
#[wasm_bindgen]
pub fn ibpscomp_rs_version() -> String {
    compiler_version()
}
