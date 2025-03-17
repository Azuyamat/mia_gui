use serde::{Deserialize, Serialize};
use crate::repository::structs::IDE;

#[tauri::command]
pub fn get_config() -> Config {
    let config: Config = confy::load("mia", None).unwrap();
    config
}

#[tauri::command]
pub fn save_config(config: Config) {
    let action = confy::store("mia", None, config);
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
    pub favorite_dirs: Vec<String>,

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
            favorite_dirs: Vec::new(),
        }
    }
}