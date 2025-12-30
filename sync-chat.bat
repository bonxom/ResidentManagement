@echo off
echo 🔄 Starting chat sync process...

echo 🔐 Logging in as admin...
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@res.com\",\"password\":\"123456\"}" ^
  -o login_response.json

echo.
echo ✅ Login completed, checking response...
type login_response.json

echo.
echo 🔄 Extracting token and syncing users...
for /f "tokens=2 delims=:," %%a in ('findstr "token" login_response.json') do set TOKEN=%%a
set TOKEN=%TOKEN:"=%
set TOKEN=%TOKEN: =%

echo Token extracted: %TOKEN%

echo.
echo 🔄 Syncing all users to chat...
curl -X POST http://localhost:3000/api/chat/sync-all ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -o sync_response.json

echo.
echo ✅ Sync completed, checking response...
type sync_response.json

echo.
echo 🔍 Getting participants list...
curl -X GET http://localhost:3000/api/chat/participants ^
  -H "Authorization: Bearer %TOKEN%" ^
  -o participants_response.json

echo.
echo 👥 Current participants:
type participants_response.json

echo.
echo 🎉 Chat sync process completed!
del login_response.json sync_response.json participants_response.json

pause