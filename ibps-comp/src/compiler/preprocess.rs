mod remove_comments;
mod replace_ibps_tokens;

pub fn preprocess_ibps(code: &str) -> String {
    replace_ibps_tokens::regex_replace(&remove_comments::remove_comments(code))
}
