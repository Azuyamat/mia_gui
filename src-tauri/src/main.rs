// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod repository;
mod config;
mod errors;

use repository::{
    get_dir,
    zip_dir
};
use config::{get_config, save_config};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_dir, get_config, save_config, zip_dir])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}