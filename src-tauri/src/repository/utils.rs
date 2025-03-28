use crate::repository::structs::Language;
use crate::repository::LANGUAGES;

pub fn get_language_from_extension(extension: &Option<String>) -> Option<Language> {
    if extension.is_none() {
        return None;
    }
    let extension = match extension.as_ref() {
        Some(ext) => ext,
        None => return None,
    };
    let language = LANGUAGES
        .iter()
        .find(|lang| lang.extensions.contains(&extension.to_string()));
    language.cloned()
}
