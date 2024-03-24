use ibpscomp::ibps_to_py_native;
use ibpscomp_runlocalpy::run_ibps_using_local_python;
use std::{env, process::exit};

fn main() {
    let filepath = env::args().nth(1).unwrap_or_else(|| {
        println!("Please specify a file path");
        exit(1)
    });
    run_ibps_using_local_python(&filepath, ibps_to_py_native);
}
