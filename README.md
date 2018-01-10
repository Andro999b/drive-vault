# Drive Vault

Drive Vault is secure password keeper that use google drive to store credentials.
Credentials in file encrypted by AES + PBKDF2(256 bit) it also use you google id as password salt.
So for decrypting file hacker must know you master password and have acces to you google account.

## TODO

* firefox addon
* sorting
* support github private gists
* multiple device sync?

## 1.5.3
* pin code for mobile devices

## 1.5.2
* copy and create similar

## 1.5.1
* backward navigation

## 1.5
* db code refactoring
* dropbox integration

## 1.4
* import/export db feature
* search ui improvment
* refactoring

## 1.3
* multiple groups
* complex credentials
* improve mobile experience
* fix google auth

## 1.2

* Now application can work with multiple files

## 1.1

* Side effects action moved to redux saga from redux trunk
