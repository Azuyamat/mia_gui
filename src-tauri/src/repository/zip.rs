use crate::config::Config;
use crate::errors::MiaError;
use serde::Serialize;
use std::fs;
use std::fs::File;
use std::io::Write;
use std::path::{Path, PathBuf};
use zip::ZipWriter;

#[derive(Serialize)]
pub struct Zip {
    pub name: String,
    pub base_path: PathBuf,
    pub config: Config,
    pub output_path: PathBuf,

    #[serde(skip)]
    pub zip: ZipWriter<File>,
}

impl Zip {
    pub fn new(base_path: &str, config: Config) -> Result<Zip, MiaError> {
        println!("Zipping directory: {:?}", base_path);
        let path = Path::new(base_path);
        if !path.exists() {
            return Err(MiaError::PathNotFound);
        }

        // Naming configuration
        let repository_name = match path.file_name() {
            Some(name) => name.to_str().unwrap(),
            None => "repository",
        };
        let mut name = config.naming.clone();
        name = name.replace(":name", &repository_name);
        name = name.replace(
            ":date",
            &chrono::Local::now().format("%Y-%m-%d").to_string(),
        );

        let binding = config.output_dir.clone();
        let output_path = match binding {
            Some(dir) => {
                if dir.is_empty() {
                    PathBuf::from(path)
                } else {
                    PathBuf::from(dir)
                }
            }
            None => PathBuf::from(path),
        };
        fs::create_dir_all(&output_path)?;
        println!("Created directory: {:?}", output_path);

        // Create zip file
        let zip_path = &output_path.join(&name).with_extension("zip");
        let zip_file = File::create(zip_path)?;
        println!("Zip file created: {:?}", zip_file);
        let zip = ZipWriter::new(zip_file);

        // Start zip
        let mut zip = Zip {
            name,
            base_path: path.to_path_buf(),
            config,
            output_path: zip_path.clone(),
            zip,
        };
        let path = path.to_path_buf();
        zip.zip(&path)?;
        zip.zip.finish()?;

        // Return zip struct
        Ok(zip)
    }

    pub fn zip(&mut self, path: &PathBuf) -> Result<(), MiaError> {
        let local_path = self.remove_base_name(&path)?;
        if path.is_file() {
            // Check if config excludes file
            let extension = path
                .extension()
                .as_ref()
                .map(|ext| ext.to_str().unwrap().to_string());
            if self
                .config
                .blacklisted_file_extensions
                .contains(&extension.unwrap_or("".to_string()))
            {
                return Ok(());
            }
            if self
                .config
                .blacklisted_file_names
                .contains(&path.file_name().unwrap().to_str().unwrap().to_string())
            {
                return Ok(());
            }

            let file_content = fs::read(&path)?;
            self.zip
                .start_file(local_path, zip::write::FileOptions::default())?;
            self.zip.write_all(&file_content)?;
            return Ok(());
        }

        if self
            .config
            .blacklisted_folder_names
            .contains(&path.file_name().unwrap().to_str().unwrap().to_string())
        {
            return Ok(());
        }

        // Zip folder
        let paths = fs::read_dir(&path)?;
        for path in paths.flatten() {
            let path = &path.path();
            self.zip(path)?;
        }
        Ok(())
    }

    pub fn remove_base_name(&mut self, path: &PathBuf) -> Result<String, MiaError> {
        let base_path = self.base_path.clone();
        if !path.starts_with(&base_path) {
            return Ok(path.to_str().unwrap().to_string());
        }
        let stripped_path = path
            .strip_prefix(base_path)?
            .to_path_buf()
            .into_os_string()
            .into_string()
            .unwrap();
        Ok(stripped_path)
    }
}
