// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use ibps::{ibps_to_py, ibpscomp_rs_version};
use tauri::Manager;
use tauri::WindowEvent;

#[allow(unused_imports)]
use window_vibrancy::{apply_mica, apply_vibrancy, NSVisualEffectMaterial};

#[tauri::command]
fn ibps_to_py_tauri(code: &str) -> String {
    ibps_to_py(code)
}

#[tauri::command]
fn ibpscomp_rs_version_tauri() -> String {
    ibpscomp_rs_version()
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            #[allow(dead_code)]
            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[allow(dead_code)]
            #[cfg(target_os = "windows")]
            apply_mica(&window, None)
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            Ok(())
        })
        .on_window_event(|e| {
            if let WindowEvent::Resized(_) = e.event() {
                std::thread::sleep(std::time::Duration::from_millis(4));
            }
        })
        .invoke_handler(tauri::generate_handler![
            ibps_to_py_tauri,
            ibpscomp_rs_version_tauri
        ])
        .run(tauri::generate_context!())
        .expect("error while running IBPS IDE");
}
