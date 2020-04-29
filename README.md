# ADMap_API
ADMap is an Active Directory enumeration tool built on top of SecureAuths Impacket Library and Ropnops Windapsearch LDap Enumeration tool that aims to make basic Active Directory enumeration easy and user friendly for beginners. 


## Requirements
The following must be installed prior to running this program
Impacket: https://github.com/SecureAuthCorp/impacket 
Windapsearch (Python 2 version): https://github.com/TheRealNeel42/windapsearch

Yarn
Flask
Flask_cors
Python LDAP Module

Update config.json to point to the 2 locations. An example is given.

## Usage
In the main directory run run.sh to start ADMap!

## Future Work
In the future, I plan on adding a group membership enumeration function to show all users in a specific group.
I also plan on making an Appimage of this tool so it can be more easily downloaded, as downloading the requirments for Impacket can be a pain
