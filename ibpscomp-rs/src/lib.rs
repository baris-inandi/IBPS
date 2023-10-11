mod compiler;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn ibps_to_py(code: &str) -> String {
    format!(
        "{}{}",
        compiler::stdlib::generate_stdlib(),
        compiler::ibps_to_py(code)
    )
}
