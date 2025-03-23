use crate::config::Config;
use crate::repository::structs::{Entry, EntryMeta, EntryType, MiaMeta};
use crate::repository::utils::get_language_from_extension;
use std::path::Path;

impl Entry {
    pub fn new(path: &Path) -> Result<Self, std::io::Error> {
        Ok(
            Self {
                name: match path.file_name() {
                    Some(name) => name.to_string_lossy().to_string(),
                    None => return Err(std::io::Error::new(std::io::ErrorKind::InvalidInput, "Invalid path")),
                },
                extension: match path.extension() {
                    Some(ext) => Some(ext.to_string_lossy().to_string()),
                    None => None,
                },
                path: path.to_string_lossy().to_string(),
                entry_type: if path.is_dir() { EntryType::Directory } else { EntryType::File },
                meta: EntryMeta::new(path)?,
                mia_meta: None,
            }
        )
    }

    pub fn mia_meta(&mut self, config: &Config) -> &mut Self {
        self.mia_meta = Some(
            MiaMeta {
                language: get_language_from_extension(&self.extension),
                is_blacklisted: config.is_blacklisted(self),
                is_favorite: config.is_favorite(self), // TODO : impl
                tags: Vec::new(), // TODO : impl
            }
        );
        self
    }
}

impl EntryMeta {
    pub fn new(path: &Path) -> Result<Self, std::io::Error> {
        Ok(
            Self {
                size: path.metadata()?.len(),
                created: match path.metadata()?.created()?.elapsed() {
                    Ok(elapsed) => elapsed.as_secs(),
                    Err(_) => 0,
                },
                modified: match path.metadata()?.modified()?.elapsed() {
                    Ok(elapsed) => elapsed.as_secs(),
                    Err(_) => 0,
                },
                is_hidden: path.file_name().map_or(false, |name| name.to_string_lossy().starts_with('.')),
            }
        )
    }
}