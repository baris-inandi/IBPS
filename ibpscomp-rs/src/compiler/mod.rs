use regex::Regex;

use self::preprocess::preprocess_ibps;
mod preprocess;
pub mod stdlib;

pub fn ibps_to_py(code: &str) -> String {
    let preprocessed_code = preprocess_ibps(code);
    let mut out = String::new();

    for line in preprocessed_code.lines() {
        let l = line.trim();
        if l.starts_with("output ") || l == "output" {
            let spaces = line.split("output").next().unwrap();
            let args = line.split("output").nth(1).unwrap_or("").trim();
            out.push_str(&format!("{}output({})\n", spaces, args));
        } else if l.starts_with("input ") {
            let spaces = line.split("input").next().unwrap();
            let args = line.split("input").nth(1).unwrap_or("").trim();
            out.push_str(&format!("{}{} = input('>>> ')\n", spaces, args));
        } else if Regex::new(r"(?m)\w+\s+input\s+[a-zA-Z_][a-zA-Z0-9_]*")
            .unwrap()
            .is_match(l)
        {
            let indentation = line
                .chars()
                .take_while(|&c| c.is_whitespace())
                .collect::<String>();
            let tokens: Vec<&str> = l.split(" ").collect();
            let wrapper = tokens[0];
            let args = tokens
                .iter()
                .skip(2)
                .map(|c| c.to_string())
                .collect::<Vec<String>>()
                .join(" ");
            out.push_str(&format!(
                "{}{} = {}(input('>>> '))\n",
                indentation, args, wrapper
            ));
        } else if l.starts_with("loop while ") {
            let colon = if l.ends_with(":") { "" } else { ":" };
            let spaces = line.split("loop while").next().unwrap();
            let args = line.split("loop while").nth(1).unwrap_or("").trim();
            out.push_str(&format!("{}while {}{}\n", spaces, args, colon));
        } else if l.starts_with("loop until ") {
            let colon = if l.ends_with(":") { "" } else { ":" };
            let spaces = line.split("loop until").next().unwrap();
            let args = line.split("loop until").nth(1).unwrap_or("").trim();
            out.push_str(&format!("{}__ibps_until_flag__ = True\n", spaces));
            out.push_str(&format!(
                "{}while __ibps_until_flag__ or {}{}\n",
                spaces, args, colon
            ));
            if spaces == "" {
                out.push_str("    __ibps_until_flag__ = False\n");
                continue;
            }
            out.push_str(&format!(
                "{}{}__ibps_until_flag__ = False\n",
                spaces, spaces
            ));
        } else if l.starts_with("loop ") {
            let spaces = line.split("loop").next().unwrap();
            let re = Regex::new(r"loop \w from \s*.*\s* to \s*.*\s*$").unwrap();
            let is_range = re.is_match(l);
            if is_range {
                // Split the input string into tokens
                let tokens: Vec<&str> = l.split_whitespace().collect();

                // Extract the loop variable and the loop bounds
                // loop I from   (1 - 1) to 10 + 90
                let loop_variable = tokens[1];
                let loop_range = l
                    .split(" from ")
                    .collect::<Vec<&str>>()
                    .split_off(1)
                    .join("");
                let start = loop_range.split(" to ").collect::<Vec<&str>>()[0];
                let end = loop_range.split(" to ").collect::<Vec<&str>>()[1];

                // Build the output string
                out.push_str(&format!(
                    "{}for {} in range(int({}), int({})+1):\n",
                    spaces, loop_variable, start, end
                ));
                continue;
            }
            let args = line.split("loop").nth(1).unwrap_or("").trim();
            let colon = if l.ends_with(":") { "" } else { ":" };
            out.push_str(&format!("{}for {}{}\n", spaces, args, colon));
        } else if l.starts_with("if ") {
            // turn "if condition then" to "if condition:"
            let mut tokens: Vec<&str> = l.split_whitespace().collect();
            let spaces = line.split("if").next().unwrap();
            if *tokens.get(tokens.len() - 1).unwrap_or(&"") == "then" {
                tokens.pop();
            }
            let colon = if l.ends_with(":") { "" } else { ":" };
            out.push_str(&format!("{}{}{}\n", spaces, tokens.join(" "), colon));
        } else if l.starts_with("else if ") {
            let mut tokens: Vec<&str> = l.split_whitespace().collect();
            tokens.remove(0);
            tokens.remove(0);
            tokens.insert(0, "elif");
            if *tokens.get(tokens.len() - 1).unwrap_or(&"") == "then" {
                tokens.pop();
            }
            let colon = if l.ends_with(":") { "" } else { ":" };
            out.push_str(&format!(
                "{}{}{}\n",
                line.split("else if").next().unwrap(),
                tokens.join(" "),
                colon
            ));
        } else if l == "else" {
            let mut tokens: Vec<&str> = l.split_whitespace().collect();
            if *tokens.get(tokens.len() - 1).unwrap_or(&"") == "then" {
                tokens.pop();
            }
            out.push_str(&format!(
                "{}{}:\n",
                line.split("else").next().unwrap(),
                tokens.join(" "),
            ));
        } else if l.starts_with("sub ") {
            let args = l.split("sub").nth(1).unwrap_or("").trim();
            let spaces = line.split("sub").next().unwrap();
            let colon = if l.ends_with(":") { "" } else { ":" };
            out.push_str(&format!("{}def {}{}\n", spaces, args, colon));
        } else if l.starts_with("end ") {
            out.push_str("\n");
            continue;
        } else {
            out.push_str(&format!("{}\n", line));
        }
    }

    out
}
