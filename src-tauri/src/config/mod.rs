use crate::repository::structs::{Entry, EntryType, IDE};
use serde::{Deserialize, Serialize};
use std::cmp::PartialEq;
use tauri::AppHandle;

#[tauri::command]
pub fn get_config(app_handle: AppHandle) -> Config {
    let app_version = &app_handle.package_info().version.major;
    let app_name = format!("mia_v{}", app_version);
    let config: Config = confy::load(&app_name, None).unwrap();
    config
}

#[tauri::command]
pub fn save_config(app_handle: AppHandle, config: Config) {
    println!("Saving config: {:?}", config);
    let app_version = &app_handle.package_info().version.major;
    let app_name = format!("mia_v{}", app_version);
    let action = confy::store(&app_name, None, config);
    if action.is_err() {
        println!("Error while saving config: {:?}", action.err());
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Config {
    pub naming: String,
    pub output_dir: Option<String>,
    pub blacklisted_file_names: Vec<String>,
    pub blacklisted_folder_names: Vec<String>,
    pub blacklisted_file_extensions: Vec<String>,

    // Mostly for the UI
    pub default_dir: Option<String>,
    pub color: Option<String>,

    pub ides: Option<Vec<IDE>>,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            naming: ":name".to_string(),
            blacklisted_file_names: Vec::new(),
            blacklisted_folder_names: vec![
                ".git".to_string(),
                "bin".to_string(),
                "obj".to_string(),
                ".idea".to_string(),
                ".vs".to_string(),
            ],
            blacklisted_file_extensions: vec!["zip".to_string(), "pdf".to_string()],

            output_dir: None,
            color: None,
            default_dir: None,
            ides: None,
        }
    }
}

impl PartialEq for EntryType {
    fn eq(&self, other: &Self) -> bool {
        match (self, other) {
            (EntryType::File, EntryType::File) => true,
            (EntryType::Directory, EntryType::Directory) => true,
            _ => false,
        }
    }
}

impl Config {
    pub fn is_blacklisted(&self, entry: &Entry) -> bool {
        if entry.entry_type == EntryType::Directory {
            self.blacklisted_folder_names.contains(&entry.name)
        } else {
            self.blacklisted_file_names.contains(&entry.name)
                || self
                    .blacklisted_file_extensions
                    .contains(&entry.extension.as_ref().unwrap_or(&"".to_string()))
        }
    }

    pub fn is_favorite(&self, _entry: &Entry) -> bool {
        false
    }
}
