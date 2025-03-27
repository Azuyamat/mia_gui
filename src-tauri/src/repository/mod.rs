mod directory;
mod entry;
pub(crate) mod structs;
mod utils;
pub(crate) mod zip;

use crate::config::get_config;
use crate::repository::structs::{Directory, Language};
use crate::repository::zip::Zip;
use once_cell::sync::Lazy;
use serde::Deserialize;
use tauri::AppHandle;

const LANGUAGES_JSON: &str = include_str!("languages.json");
pub static LANGUAGES: Lazy<Vec<Language>> =
    Lazy::new(|| serde_json::from_str::<Vec<Language>>(LANGUAGES_JSON).unwrap());

#[derive(Deserialize)]
pub struct GetDirOptions {
    pub show_hidden: bool,
    pub show_blacklisted: bool,
    pub fuzzy: bool, // Search w/ parent directory
}

#[tauri::command]
pub fn get_dir(app_handle: AppHandle, path: &str, options: GetDirOptions) -> Option<Directory> {
    let config = get_config(app_handle);
    let mut real_path = std::path::Path::new(path);
    if !real_path.exists() && options.fuzzy {
        real_path = match real_path.parent() {
            Some(parent) => parent,
            None => return None,
        };
        if !real_path.exists() {
            return None;
        }
    }

    let mut directory = match Directory::new(real_path) {
        Ok(directory) => directory,
        Err(_) => return None,
    };

    directory.mia_meta(&config);
    directory.retain_hidden(options.show_hidden);
    directory.retain_blacklisted(options.show_blacklisted);

    Some(directory)
}

#[tauri::command]
pub fn zip_dir(app_handle: AppHandle, path: &str) -> Option<Zip> {
    let real_path = std::path::Path::new(path);
    if !real_path.exists() {
        return None;
    }

    match Zip::new(path, get_config(app_handle)) {
        Ok(zip) => Some(zip),
        Err(e) => {
            println!("Error: {:?}", e);
            None
        }
    }
}
