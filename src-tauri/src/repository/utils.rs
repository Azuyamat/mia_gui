use crate::repository::LANGUAGES;
use crate::repository::structs::Language;

pub fn get_language_from_extension(extension: &Option<String>) -> Option<Language> {
    if extension.is_none() { return None; }
    let extension = extension.as_ref().unwrap();
    let language = LANGUAGES.iter().find(|lang| lang.extensions.contains(&extension.to_string()));
    language.cloned()
}