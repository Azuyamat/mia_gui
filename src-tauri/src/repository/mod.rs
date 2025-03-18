pub(crate) mod structs;
mod utils;
pub(crate) mod zip;
mod directory;
mod entry;

use once_cell::sync::Lazy;
use serde::Deserialize;
use crate::{
    config::{get_config},
};
use crate::repository::structs::{Directory, Language};
use crate::repository::zip::{Zip};

const LANGUAGES_JSON: &str = include_str!("languages.json");
pub static LANGUAGES: Lazy<Vec<Language>> = Lazy::new(|| serde_json::from_str::<Vec<Language>>(LANGUAGES_JSON).unwrap());

#[derive(Deserialize)]
pub struct GetDirOptions {
    pub show_hidden: bool,
    pub show_blacklisted: bool,
    pub fuzzy: bool, // Search w/ parent directory
}

#[tauri::command]
pub fn get_dir(path: &str, options: GetDirOptions) -> Option<Directory> {
    let config = get_config();
    let mut real_path = std::path::Path::new(path);
    if !real_path.exists() && options.fuzzy {
        real_path = match real_path.parent() {
            Some(parent) => parent,
            None => return None,
        };
        if !real_path.exists() { return None; }
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
pub fn zip_dir(path: &str) -> Option<Zip> {
    let real_path = std::path::Path::new(path);
    if !real_path.exists() { return None; }

    match Zip::new(path, get_config()) {
        Ok(zip) => Some(zip),
        Err(_) => None,
    }
}