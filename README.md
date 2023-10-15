# IBPS

IBPS is a scripting language based on the pseudocode specification of the International Baccalaureate Diploma Program Computer Science course. This repository contains the following:

## `ibpscomp-rs`

The Rust-based implementation of the IBPS compiler.

This Rust crate includes a library and a binary. The library is used to compile IBPS code to an intermediate representation. The binary implements a basic CLI and interpreter that uses the library to run IBPS code locally.

### Note to compile the binary

The `ibpscomp-rs` binary depends on `RustPython`, a library that implements the Python interpreter and the Python standard library in Rust. `RustPython` is not available on crates.io. To use it, clone the `RustPython` repo in the `ibpscomp-rs` directory using the following command:

```git clone https://github.com/RustPython/RustPython```

## `ibps-ide`

The online IBPS IDE. This is a React application written in Typescript that allows users to write and execute IBPS code in their browser.

The IDE ships `ibpscomp-rs`
