use std::fs;
use std::process::exit;
use std::process::Command;

pub fn run_ibps_using_local_python(filepath: &str, compiler: fn(&str, &str) -> String) {
    let contents = &fs::read_to_string(&filepath).unwrap_or_else(|_| {
        eprintln!("No such file or directory");
        exit(1)
    });

    let pycode = compiler(contents, filepath);

    println!("{}", pycode);
    println!("### START OF PYTHON OUTPUT ###");

    Command::new("python")
        .arg("-c")
        .arg(format!("{}", pycode))
        .spawn()
        .expect("python failed to start");
}
