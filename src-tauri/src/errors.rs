use thiserror::Error;

#[derive(Error, Debug)]
pub enum MiaError {
    #[error("strip prefix error {0}")]
    Error(#[from] std::path::StripPrefixError),
    #[error("zip error")]
    Zip(#[from] zip::result::ZipError),
    #[error("io error")]
    IO(#[from] std::io::Error),
    #[error("path not found")]
    PathNotFound,
    #[error("unknown mia error")]
    Unknown,
}