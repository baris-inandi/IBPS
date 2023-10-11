use crate::compiler::ibps_to_py;

const USE_IBPS_STDLIB: bool = false;

pub fn generate_stdlib() -> String {
    fn valid(code: &str) -> String {
        return format!(
            "\n{}",
            code.lines()
                .filter(|line| !line.trim().ends_with("# stdlibignore"))
                .collect::<Vec<&str>>()
                .join("\n")
        );
    }
    if !USE_IBPS_STDLIB {
        let mut lib = String::new();
        lib.push_str(&valid(std::include_str!("../../stdlib/python/header.py")));
        lib.push_str(&valid(std::include_str!("../../stdlib/python/stdcoll.py")));
        lib.push_str(&valid(std::include_str!("../../stdlib/python/stdqueue.py")));
        lib.push_str(&valid(std::include_str!("../../stdlib/python/stdstack.py")));
        lib.push_str(&valid(std::include_str!("../../stdlib/python/stdarr.py")));
        lib.push_str("\n");
        return lib;
    }
    let ibps_lib = &valid(std::include_str!("../../stdlib/stdlib.ibps"));
    ibps_to_py(ibps_lib)
}
