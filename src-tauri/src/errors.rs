use thiserror::Error;

#[derive(Error, Debug)]
pub enum MiaError {
    #[error("unknown mia error")]
    Unknown,
}