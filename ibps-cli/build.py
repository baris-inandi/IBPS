# rustup target add x86_64-pc-windows-gnu

from os import path, mkdir, chmod
import subprocess
import shutil

build = [
    {
        "target": "x86_64-pc-windows-gnu",
        "name": "ibps-windows",
        "ext": ".exe",
    },
    {
        "target": "x86_64-apple-darwin",
        "name": "ibps-macos-x86_64",
        "ext": "",
    },
    {
        "target": "aarch64-apple-darwin",
        "name": "ibps-macos-aarch64",
        "ext": "",
    },
]

for b in build:
    print(f"Building for {b['target']}...")
    subprocess.run(
        ["cargo", "build", "--release", f"--target={b['target']}"],
        check=True,
    )
    if not path.exists("dist"):
        mkdir("dist")
    print(f"Copying {b['name']}...")
    dist = "./dist/" + b["name"] + b["ext"]
    shutil.copyfile("./target/" + b["target"] + "/release/ibps" + b["ext"], dist)
    print(f"Making {b['name']} executable...")
    chmod(dist, 0o755)
