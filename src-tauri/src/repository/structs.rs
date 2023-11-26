use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Language {
    pub(crate) name: String,
    pub(crate) extensions: Vec<String>
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