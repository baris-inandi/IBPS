# When using macOS, you can build for Windows too
# See: https://tauri.app/v1/guides/building/cross-platform

DARWIN='universal-apple-darwin'
WINDOWS='x86_64-pc-windows-msvc'

# build for macOS (universal binary)
# rustup target add universal-apple-darwin
CARGO_TARGET_DIR=target-desktop cargo tauri build --target $DARWIN

# build for Windows
# brew install nsis
# rustup target add x86_64-pc-windows-msvc
# cargo install --locked cargo-xwin
CARGO_TARGET_DIR=target-desktop cargo tauri build --runner cargo-xwin --target $WINDOWS

mkdir -p build
cp target-desktop/$DARWIN/release/bundle/dmg/*.dmg build
cp target-desktop/$WINDOWS/release/bundle/nsis/*.exe build
