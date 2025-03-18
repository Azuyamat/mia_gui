use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Language {
    pub name: String,
    pub extensions: Vec<String>
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Directory {
    pub entry: Entry,
    pub children: Vec<Entry>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Entry {
    pub name: String,
    pub extension: Option<String>,
    pub path: String,
    pub entry_type: EntryType,
    pub meta: EntryMeta,
    pub mia_meta: Option<MiaMeta>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct EntryMeta {
    pub size: u64,
    pub created: u64,
    pub modified: u64,
    pub is_hidden: bool,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MiaMeta {
    pub language: Option<Language>,
    pub is_blacklisted: bool,
    pub is_favorite: bool,
    pub tags: Vec<u8>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Tag {
    pub id: u8,
    pub name: String,
    pub color: u8,
}

#[derive(Serialize)]
pub enum EntryType {
    File,
    Directory
}

#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct IDE {
    pub name: String,
    pub command: String,

    pub icon: Option<String>,
    pub color: Option<String>,
    pub default: bool,
}