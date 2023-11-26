use thiserror::Error;

#[derive(Error, Debug)]
pub enum MiaError {
    #[error("io error")]
    IO(#[from] std::io::Error),
    #[error("path not found")]
    PathNotFound,
    #[error("unknown mia error")]
    Unknown,
}