from cryptography.fernet import Fernet


def encrypt(key: str, data: bytes):
    fernet = Fernet(key)

    encrypted = fernet.encrypt(data)

    return encrypted