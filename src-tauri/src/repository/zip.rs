use std::fs;
use std::fs::File;
use std::io::Write;
use std::path::PathBuf;
use serde::Serialize;
use zip::ZipWriter;
use crate::config::Config;
use crate::errors::MiaError;

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
    pub fn new (base_path: &str, config: Config) -> Result<Zip, MiaError> {
        let path = std::path::Path::new(base_path);
        if !path.exists() { return Err(MiaError::PathNotFound); }

        // Naming configuration
        let repository_name = path.file_name().unwrap().to_str().unwrap().to_string();
        let mut name = config.naming.clone();
        name = name.replace(":name", &repository_name);
        name = name.replace(":date", &chrono::Local::now().format("%Y-%m-%d").to_string());

        // Check if output directory exists (else default to current directory)
        let output_dir = config.output_dir.clone().unwrap_or("".to_string());
        let mut output_path = std::path::Path::new(&output_dir);
        fs::create_dir_all(&output_path)?;
        if !output_path.exists() { output_path = path.clone();}

        // Create zip file
        let zip_path = &output_path.join(&name).with_extension("zip");
        let zip_file = File::create(zip_path)?;
        let zip = ZipWriter::new(zip_file);

        // Start zip
        let mut zip = Zip {
            name,
            base_path: path.clone().to_path_buf(),
            config,
            output_path: zip_path.clone(),
            zip
        };
        zip.zip(&path.to_path_buf())?;
        zip.zip.finish()?;

        // Return zip struct
        Ok(zip)
    }

    pub fn zip(&mut self, path: &PathBuf) -> Result<(), MiaError> {
        let local_path = self.remove_base_name(&path)?;
        if path.is_file() {
            // Check if config excludes file
            let extension = path.extension().as_ref().map(|ext| ext.to_str().unwrap().to_string());
            if self.config.blacklisted_file_extensions.contains(&extension.unwrap_or("".to_string())) { return Ok(()); }
            if self.config.blacklisted_file_names.contains(&path.file_name().unwrap().to_str().unwrap().to_string()) { return Ok(()); }

            // Zip file
            self.zip.start_file(local_path, zip::write::FileOptions::default())?;
            self.zip.write_all(fs::read(path)?.as_slice())?;
            return Ok(());
        }
        // Check if config excludes folder
        if self.config.blacklisted_folder_names.contains(&path.file_name().unwrap().to_str().unwrap().to_string()) { return Ok(()); }

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