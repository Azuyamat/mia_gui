use serde::Serialize;
use crate::config::get_config;

#[tauri::command]
pub fn get_dir(path: &str) -> Option<Repository> {
    let config = get_config();

    let real_path = std::path::Path::new(path);
    if !real_path.exists() { return None; }

    let paths = std::fs::read_dir(real_path).unwrap().map(|entry| {
        let entry = entry.unwrap();
        let path = entry.path();

        let name = &entry.file_name().into_string().unwrap();
        let extension = match &path.extension() {
            Some(ext) => Some(ext.to_str().unwrap().to_string()),
            None => None
        };
        let entry_type = if path.is_dir() { EntryType::Directory } else { EntryType::File };

        Entry {
            name: name.to_string(),
            extension: extension.clone(),
            entry_type: entry_type,
            path: path.to_str().unwrap().to_string(),
            language: if path.is_dir() { None } else { get_language_from_extension(&extension) },
            blacklisted: if path.is_dir() {
                config.blacklisted_folder_names.contains(&name.to_string())
            } else {
                config.blacklisted_file_names.contains(&name.to_string()) || config.blacklisted_file_extensions.contains(&extension.unwrap_or("".to_string()))
            }
        }
    }).collect();
    Some(Repository {
        path: path.to_string(),
        exists: true,
        paths
    })
}

#[derive(Serialize)]
pub struct Repository {
    pub path: String,
    pub exists: bool,
    pub paths: Vec<Entry>,
}

#[derive(Serialize)]
pub struct Entry {
    pub name: String,
    pub extension: Option<String>,
    pub entry_type: EntryType,
    pub path: String,
    pub language: Option<Language>,
    pub blacklisted: bool
}

#[derive(Serialize)]
pub enum EntryType {
    File,
    Directory
}

#[derive(Serialize)]
pub enum Language {
    Rust,
    Java,
    JavaScript,
    TypeScript,
    Python,
    C,
    Cpp,
    CSharp,
    Go,
    Kotlin,
    Swift,
    PHP,
    Ruby,
    Scala,
    Dart,
    Lua,
    Perl,
    R,
    CSS,
    Zip,
}

pub fn get_language_from_extension(ext: &Option<String>) -> Option<Language> {
    match ext {
        Some(ext) => {
            match ext.as_str() {
                "rs" => Some(Language::Rust),
                "java" => Some(Language::Java),
                "js" => Some(Language::JavaScript),
                "ts" => Some(Language::TypeScript),
                "py" => Some(Language::Python),
                "c" => Some(Language::C),
                "cpp" => Some(Language::Cpp),
                "cs" => Some(Language::CSharp),
                "go" => Some(Language::Go),
                "kt" => Some(Language::Kotlin),
                "swift" => Some(Language::Swift),
                "php" => Some(Language::PHP),
                "rb" => Some(Language::Ruby),
                "scala" => Some(Language::Scala),
                "dart" => Some(Language::Dart),
                "lua" => Some(Language::Lua),
                "pl" => Some(Language::Perl),
                "r" => Some(Language::R),
                "css" => Some(Language::CSS),
                "zip" => Some(Language::Zip),
                _ => None
            }
        }
        None => None
    }
}