use std::collections::HashMap;

const VERSION: &str = std::include_str!("../../stdlib/VERSION");

pub fn generate_stdlib(code: &str) -> String {
    fn valid(code: &str) -> String {
        return format!(
            "\n{}",
            code.lines()
                .filter(|line| !line.trim().ends_with("# stdlibignore"))
                .collect::<Vec<&str>>()
                .join("\n")
        );
    }

    let stdlib_source = HashMap::from([
        ("Array", valid(std::include_str!("../../stdlib/Array.py"))),
        ("Queue", valid(std::include_str!("../../stdlib/Queue.py"))),
        ("Stack", valid(std::include_str!("../../stdlib/Stack.py"))),
        (
            "Collection",
            valid(std::include_str!("../../stdlib/Collection.py")),
        ),
        ("String", valid(std::include_str!("../../stdlib/String.py"))),
        ("null", String::from("null = None")),
        ("none", String::from("none = None")),
        ("true", String::from("true = True")),
        ("false", String::from("false = False")),
        ("output", String::from("output = print")),
        ("Boolean", String::from("Boolean = bool")),
        ("Integer", String::from("Integer = int")),
        ("Float", String::from("Float = float")),
        ("Double", String::from("Double = float")),
        ("HashMap", String::from("HashMap = dict")),
        ("Set", String::from("HashMap = set")),
    ]);
    let mut stdlib_treeshaken = format!("### IBPS stdlib {} implemented in Python ###\n", VERSION);
    for (name, source) in stdlib_source.iter() {
        if code.contains(name) {
            stdlib_treeshaken.push_str(source);
            stdlib_treeshaken.push_str("\n");
        }
    }
    stdlib_treeshaken.push_str("\n### END OF STDLIB ###\n");
    return stdlib_treeshaken;
}
