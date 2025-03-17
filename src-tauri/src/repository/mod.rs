pub(crate) mod structs;
mod utils;
pub(crate) mod zip;

use std::string::ToString;
use once_cell::sync::Lazy;
use crate::{
    config::{get_config},
};
use crate::repository::structs::{Entry, EntryType, Language, Repository};
use crate::repository::utils::get_language_from_extension;
use crate::repository::zip::{Zip};

const LANGUAGES_JSON: &str = include_str!("languages.json");
pub static LANGUAGES: Lazy<Vec<Language>> = Lazy::new(|| serde_json::from_str::<Vec<Language>>(LANGUAGES_JSON).unwrap());

/*
Commands
 */

#[tauri::command]
pub fn get_dir(path: &str) -> Option<Repository> {
    let config = get_config();

    let real_path = std::path::Path::new(path);
    if !real_path.exists() { return None; }

    let paths = std::fs::read_dir(real_path).unwrap().map(|entry| {
        let entry = entry.unwrap();
        let path = entry.path();

        let name = &entry.file_name().into_string().unwrap();
        let extension = path.extension().as_ref().map(|ext| ext.to_str().unwrap().to_string());
        let entry_type = if path.is_dir() { EntryType::Directory } else { EntryType::File };

        Entry {
            name: name.to_string(),
            extension: extension.clone(),
            entry_type,
            path: path.to_str().unwrap().to_string(),
            language: get_language_from_extension(&extension),
            blacklisted: if path.is_dir() {
                config.blacklisted_folder_names.contains(&name.to_string())
            } else {
                config.blacklisted_file_names.contains(&name.to_string()) || config.blacklisted_file_extensions.contains(&extension.unwrap_or("".to_string()))
            },
        }
    }).collect();
    Some(Repository {
        path: path.to_string(),
        exists: true,
        paths,
    })
}

#[tauri::command]
pub fn zip_dir(path: &str) -> Option<Zip> {
    let real_path = std::path::Path::new(path);
    if !real_path.exists() { return None; }

    let zip = Zip::new(path, get_config()).unwrap();
    Some(zip)
}

#[tauri::command]
pub fn open_in_ide(path: &str, ide: &str) {
    let response = std::process::Command::new(ide)
        .arg(path)
        .spawn();
    if response.is_err() {
        println!("Failed to open in IDE: {}", response.err().unwrap().to_string());
    }
}