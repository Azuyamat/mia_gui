// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod config;
mod errors;
mod repository;

use config::{get_config, save_config};
use repository::{get_dir, zip_dir};

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            get_dir,
            get_config,
            save_config,
            zip_dir
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
