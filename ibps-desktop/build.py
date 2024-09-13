# When using macOS, you can build for Windows too
# See: https://tauri.app/v1/guides/building/cross-platform

from os import system

TARGET='CARGO_TARGET_DIR'
DARWIN='universal-apple-darwin'
WINDOWS='x86_64-pc-windows-msvc'

# build for macOS (universal binary)
# rustup target add universal-apple-darwin
system(f'{TARGET} cargo tauri build --target {DARWIN}')

# build for Windows
# rustup target add x86_64-pc-windows-msvc
# cargo install --locked cargo-xwin
system(f'{TARGET} cargo tauri build --runner cargo-xwin --target {WINDOWS}')

system('mkdir build')
system(f'cp target-desktop/{DARWIN}/release/bundle/dmg/*.dmg build')
system(f'cp target-desktop/{WINDOWS}/release/bundle/nsis/*.exe build')
