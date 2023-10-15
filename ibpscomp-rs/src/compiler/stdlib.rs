use crate::compiler::ibps_to_py;

pub enum StdlibType {
    Python,
    Ibps,
}

pub fn generate_stdlib(stdlib_type: StdlibType) -> String {
    fn valid(code: &str) -> String {
        return format!(
            "\n{}",
            code.lines()
                .filter(|line| !line.trim().ends_with("# stdlibignore"))
                .filter(|line| !line.trim().ends_with("// stdlibignore"))
                .collect::<Vec<&str>>()
                .join("\n")
        );
    }
    if matches!(stdlib_type, StdlibType::Ibps) {
        let ibps_lib = &valid(std::include_str!("../../stdlib/stdlib.ibps"));
        return ibps_to_py(ibps_lib);
    }
    let mut lib = String::new();
    lib.push_str(&valid(std::include_str!("../../stdlib/python/header.py")));
    lib.push_str(&valid(std::include_str!("../../stdlib/python/stdcoll.py")));
    lib.push_str(&valid(std::include_str!("../../stdlib/python/stdqueue.py")));
    lib.push_str(&valid(std::include_str!("../../stdlib/python/stdstack.py")));
    lib.push_str(&valid(std::include_str!("../../stdlib/python/stdarr.py")));
    lib.push_str("\n");
    return lib;
}
