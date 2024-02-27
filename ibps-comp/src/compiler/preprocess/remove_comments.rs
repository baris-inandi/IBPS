pub fn remove_comments(code: &str) -> String {
    let mut in_comment = false;
    let mut code_nomultiline = String::new();
    let mut skip = 0;
    for (i, val) in String::from(code).chars().enumerate() {
        if skip > 0 {
            skip -= 1;
            continue;
        }
        if i != code.len() {
            let next = i + 1;
            let comb = format!(
                "{}{}",
                code.chars().nth(i).unwrap_or_default(),
                code.chars().nth(next).unwrap_or_default()
            );

            if comb == "/*" {
                in_comment = true;
            } else if comb == "*/" {
                in_comment = false;
                skip += 1;
                continue;
            }

            if !in_comment {
                code_nomultiline.push(val);
            }
        }
    }
    return code_nomultiline
        .lines()
        .filter(|line| !line.trim().starts_with("//"))
        .collect::<Vec<&str>>()
        .join("\n");
}
