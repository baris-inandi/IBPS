use std::{fs, path::Path, process::exit};

// TODO: this needs to resolve ABSOLUTE paths, not relative
// this is becasue the IDE algorithm also looks for files in the root directory by design.
pub fn resolve_include(line: &str, include_stack: &mut Vec<String>) -> String {
    let mut split = line.split("include");
    let spaces = split.next().unwrap_or("");
    let included_filename = split.next().unwrap_or("").trim();
    let included_filename_as_path = Path::new(included_filename);

    if !included_filename_as_path.is_file() {
        return format!(
            r#"
### INCLUDE COULDN'T BE RESOLVED ###
{}print(f"IBPS Include Error: No module named '{}'")
{}raise ImportError("IBPS include couldn't be resolved")
exit(1)
### END INCLUDE ###
"#,
            spaces, included_filename, spaces
        );
    } else if include_stack.contains(&included_filename.to_string()) {
        return format!(
            r#"
### INCLUDE COULDN'T BE RESOLVED ###
{}print(f"IBPS Include Error: Circular import")
{}raise ImportError("IBPS include couldn't be resolved")
exit(1)
### END INCLUDE ###
"#,
            spaces, spaces
        );
    }

    let contents = &fs::read_to_string(&included_filename).unwrap_or_else(|_| {
        eprintln!("No such file or directory");
        exit(1)
    });

    include_stack.push(included_filename.to_string());

    format!(
        r#"
### INCLUDE STARTS ###
# included: {}
{}
### END INCLUDE ###
"#,
        included_filename,
        resolve_include(&contents, include_stack)
    )
}
