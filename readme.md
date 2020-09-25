# QuickHeadHunting
Service for quick sorting and tracking CV statuses.

Based on react + nodejs + mysql 5.7 

## Features:
- adding CVs (single or bulk) on any tag;
- links for tags (states+candidate groups) or specific candidate
- adding candidates to multiple tags;
- comments and change history;
- internal or ldap auth;
- changing status of selected candidate by status selector;
- add interview (by select "interview" tag) and tracking all planned interview;
- auto finding duplicates of selected candidate (by name and md5 of CV).

# Requirements
## node & pnpm
Versions: `node >= 12.18.2`, `pnpm >= 5.4.0`

Install pnpm to global scope: `npm install -g pnpm`

## docker & nodejs
Google how to install them on your system

# Deploy and run
## Run db, back and front at once
### Configuration
Create `.env` from `env.example` and set your exposed ports, IP, auth type ... at:
- `./front/.env`
- `./back/.env`
IP (or url) for back and front must be the same (otherwise auth will not work).

Available auth types is "ldap" (`LDAP_USAGE=true`) and "internal" (`LDAP_USAGE=false`).

Using ldap or not - user must be in put db.

Tags without color, priority and candidates automatically will be erased.

All CVs are uploading to `back\build\public\uploads`
### Run
1. Run `pnpm run all`
2. Go to http://127.0.0.1:31011 `user` `123`

### Notes
Default ports:
- 31011 - front
- 31012 - back
- 31013 - db
- 31014 - db_adminer
