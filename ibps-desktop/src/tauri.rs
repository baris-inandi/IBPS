// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use ibpscomp::{compiler_version, ibps_to_py};
use tauri::Manager;
use tauri::WindowEvent;

#[allow(unused_imports)]
use window_vibrancy::{apply_mica, apply_vibrancy, NSVisualEffectMaterial};

#[tauri::command]
fn ibps_to_py_tauri(code: &str) -> String {
    ibps_to_py(code)
}

#[tauri::command]
fn compiler_version_tauri() -> String {
    compiler_version()
}

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            println!("{}, {argv:?}, {cwd}", app.package_info().name);

            app.emit_all("single-instance", Payload { args: argv, cwd })
                .unwrap();
        }))
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .setup(|app| {
            #[allow(unused_variables)]
            let window = app.get_window("main").unwrap();

            #[allow(dead_code)]
            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform.");

            #[allow(dead_code)]
            #[cfg(target_os = "windows")]
            apply_mica(&window, None).expect("Unsupported platform.");

            Ok(())
        })
        .on_window_event(|e| {
            if let WindowEvent::Resized(_) = e.event() {
                std::thread::sleep(std::time::Duration::from_millis(5));
            }
        })
        .invoke_handler(tauri::generate_handler![
            ibps_to_py_tauri,
            compiler_version_tauri
        ])
        .run(tauri::generate_context!())
        .expect("error while running IBPS IDE");
}
