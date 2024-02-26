# IBPS

IBPS is a scripting language based on the pseudocode specification of the International Baccalaureate Diploma Program Computer Science course.

## Contents

This repository contains the following contents:

### `ibpscomp-rs`: The Rust-based IBPS Compiler

The Rust-based implementation of the IBPS compiler.

This Rust crate includes a library and a binary. The library is used to compile IBPS code to an intermediate representation. The binary compiles the IBPS code in the specified path and prints the intermediate representation to stdout.

### The IBPS IDE

The online IBPS IDE. This is a Preact application written in Typescript that allows users to write and execute IBPS code in their browser.

The IDE ships `ibpscomp-rs` compiled using `wasm-pack`. The IDE uses WebAssembly to compile and run the IBPS code.

### The IBPS CLI

`ibps-cli` is a command line interface that allows users to run IBPS code using `ibpscomp-rs` on their local machine. Not a part of IBPS IDE.

### IBPS Language Support for Visual Studio Code

For users that choose to run ibps locally, a Visual Studio Code Extension is available to provide syntax highlighting and code completion for IBPS code. Use the .ibps extension for your files.
