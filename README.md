# IBPS

IBPS is a scripting language based on the pseudocode specification of the International Baccalaureate Diploma Program Computer Science course. This repository contains the following:

## `ibpscomp-rs`

The Rust-based implementation of the IBPS compiler.

This Rust crate includes a library and a binary. The library is used to compile IBPS code to an intermediate representation. The binary compiles the IBPS code in the specified path and prints the intermediate representation to stdout.

## `ibps-ide`

The online IBPS IDE. This is a React application written in Typescript that allows users to write and execute IBPS code in their browser.

The IDE ships `ibpscomp-rs` compiled using `wasm-pack`. The IDE uses WebAssembly to compile and run the IBPS code.
