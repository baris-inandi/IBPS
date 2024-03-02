// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use ibpscomp::{compiler_version, ibps_to_py};
use tauri::{utils::config::AppUrl, window::WindowBuilder, Manager, WindowEvent, WindowUrl};

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
    let port = portpicker::pick_unused_port().expect("failed to find unused port");
    let url = format!("https://localhost:{}", port).parse().unwrap();
    let window_url = WindowUrl::External(url);
    let mut context = tauri::generate_context!();

    // rewrite the config so the IPC is enabled on this URL
    context.config_mut().build.dist_dir = AppUrl::Url(window_url.clone());

    tauri::Builder::default()
        /* .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            println!("{}, {argv:?}, {cwd}", app.package_info().name);
            app.emit_all("single-instance", Payload { args: argv, cwd })
                .unwrap();
        })) */
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .setup(|app| {
            let window = WindowBuilder::new(
                app,
                String::from("main"),
                if cfg!(dev) {
                    Default::default()
                } else {
                    window_url
                },
            )
            .transparent(true)
            .hidden_title(true)
            .title_bar_style(tauri::TitleBarStyle::Overlay)
            .resizable(true)
            .fullscreen(false)
            .title("IBPS IDE")
            .decorations(true)
            .accept_first_mouse(false)
            .inner_size(1260.0, 720.0)
            .min_inner_size(600.0, 400.0)
            .build()?;

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform.");

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
        .run(context)
        .expect("error while running IBPS IDE");
}
