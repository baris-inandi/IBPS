use fancy_regex::Regex;
use std::collections::HashMap;

pub fn regex_replace(code: &str) -> String {
    let mut out = format!("{}\n", code);
    let bindings = HashMap::from([
        ("AND", "and"),
        ("OR", "or"),
        ("NOT", "not"),
        ("div", "//"),
        ("mul", "*"),
        ("mod", "%"),
    ]);
    for (k, v) in bindings {
        // TODO: this doesnt work becasuse in the last token, replace_all replaces the \n with a space
        let re = Regex::new(&format!(
            r####"(?<=\s){k}(?=\s)(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$)"####
        ))
        .unwrap();
        out = String::from(re.replace_all(&out, v).as_ref());
    }
    out
}
