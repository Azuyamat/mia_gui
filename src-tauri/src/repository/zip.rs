use std::fs;
use std::fs::File;
use std::path::PathBuf;
use zip::ZipWriter;
use crate::config::Config;
use crate::errors::MiaError;

pub struct Zip {
    pub name: String,
    pub base_path: PathBuf,
    pub config: Config,
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
        if !output_path.exists() { output_path = path.to_owned().as_path();}

        // Create zip file
        let zip_path = &output_path.join(&name).join(".zip");
        let zip_file = File::create(zip_path)?;
        let zip = ZipWriter::new(zip_file);

        // Return zip struct
        Ok(
            Zip {
                name,
                base_path: path.to_path_buf(),
                config,
                zip
            }
        )
    }

    pub fn zip(&mut self, path: PathBuf) -> Result<(), MiaError> {
        let local_path = self.remove_base_name(&path);
        let paths = fs::read_dir(&local_path)?;
    }

    pub fn remove_base_name(&mut self, path: &PathBuf) -> Result<String, MiaError> {
        let stripped_path = path
            .strip_prefix(&self.base_path)?
            .to_path_buf()
            .into_os_string()
            .into_string()?;
        Ok(stripped_path)
    }
}