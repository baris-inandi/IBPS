use std::env;
use std::fs;
use std::path::Path;
use std::process::exit;

use ibpscomp::ibps_to_py_native;
mod runpy;

fn main() {
    let filepath = env::args().nth(1).unwrap_or_else(|| {
        println!("Usage: ibps <path>");
        exit(1)
    });

    let filename = String::from(
        Path::new(&filepath)
            .file_name()
            .unwrap()
            .to_str()
            .unwrap_or(""),
    );

    let contents = &fs::read_to_string(&filepath).unwrap_or_else(|_| {
        eprintln!("No such file or directory");
        exit(1)
    });

    let pycode = ibps_to_py_native(contents, &filename);

    match runpy::runpy(&pycode, &filename) {
        Ok(_) => {}
        Err(_) => {
            eprintln!("Runtime error");
            exit(1);
        }
    };
}
