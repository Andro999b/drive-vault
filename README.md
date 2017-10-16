# Drive Vault

Drive Vault is secure password keeper that use google drive to store credentials.
Credentials in file encrypted by AES + PBKDF2(256 bit) it also use you google id as password salt.
So for decrypting file hacker must know you master password and have acces to you google account.

## TODO

* support dropbox
* support web dav
* multi storage

## 1.1

* moved to redux saga
