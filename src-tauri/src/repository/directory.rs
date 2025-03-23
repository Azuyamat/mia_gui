use crate::config::Config;
use crate::repository::structs::{Directory, Entry};
use std::path::Path;

impl Directory {
    pub fn new(path: &Path) -> Result<Self, std::io::Error> {
        Ok(Self {
            entry: Entry::new(path)?,
            children: if path.is_dir() {
                path.read_dir()?
                    .filter_map(|entry| match entry {
                        Ok(entry) => match Entry::new(&entry.path()) {
                            Ok(entry) => Some(entry),
                            Err(_) => None,
                        },
                        Err(_) => None,
                    })
                    .collect()
            } else {
                Vec::new()
            },
        })
    }

    pub fn retain_hidden(&mut self, show_hidden: bool) {
        self.children.retain(|entry| {
            if entry.meta.is_hidden {
                show_hidden
            } else {
                true
            }
        });
    }

    pub fn retain_blacklisted(&mut self, show_blacklisted: bool) {
        self.children.retain(|entry| {
            if entry.mia_meta.is_some() && entry.mia_meta.as_ref().unwrap().is_blacklisted {
                show_blacklisted
            } else {
                true
            }
        });
    }

    pub fn mia_meta(&mut self, config: &Config) -> &mut Self {
        self.children.iter_mut().for_each(|entry| {
            entry.mia_meta(config);
        });
        self
    }
}
