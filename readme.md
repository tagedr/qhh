# Requirements
## node & pnpm
Versions: `node >= 12.18.2`, `pnpm >= 5.4.0`

Install pnpm to global scope: `npm install -g pnpm`

## docker & nodejs
Google how to install them on your system

# Deploy and run
## Run db, back and front at once
### Configuration
1. Create `.env` from `env.example` and set your exposed ports, IP, auth type ... at:
- `./front/.env`
- `./back/.env`
IP (or url) for back and front must be the same (otherwise auth will not work).

Available auth types is "ldap" (`LDAP_USAGE=true`) and "internal" (`LDAP_USAGE=false`).

Using ldap or not - user must be in put db.

Tags without color, priority and candidates automatically will be erased.

All CVs are uploading to `back\build\public\uploads`

2. Run `pnpm run all`
3. Go to http://127.0.0.1:31011 `user` `123`

Default ports:
- 31011 - front
- 31012 - back
- 31013 - db
- 31014 - db_adminer