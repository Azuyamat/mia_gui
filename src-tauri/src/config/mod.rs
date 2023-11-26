use serde::{Deserialize, Serialize};

#[tauri::command]
pub fn get_config() -> Config {
    let config: Config = confy::load("mia", None).unwrap();
    config
}

#[tauri::command]
pub fn save_config(config: Config) {
    println!("{:?}", config);
    confy::store("mia", None, config).expect("Failed to save config");
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Config {
    pub naming: String,
    pub output_dir: Option<String>,
    pub blacklisted_file_names: Vec<String>,
    pub blacklisted_folder_names: Vec<String>,
    pub blacklisted_file_extensions: Vec<String>,
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
        }
    }
}