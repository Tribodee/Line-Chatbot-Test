# Line-Chatbot-Test
Testing chatbot in line app

# This app require .env to create variable ACCESS_TOEKN, SECRET_TOKEN, RAPID_KEY, RAPID_URL

# ref from :
https://www.youtube.com/watch?v=PY5KlS-c03Y
https://developers.line.biz/en/docs/messaging-api/nodejs-sample/#create-package-json

# troubleshooting
# module & package usage 
# [npm init -y]
# npm install express @line/bot-sdk axios dotenv

# Then you're done first thing you should do is
# add .gitignore and write .env to it and then use this command
# [git rm -r cache .env]

# and then add commit push but it's not done your secret is gone but you can find them in history commit, So what should we do
# run this command
# [git filter-branch --index-filter "git rm -rf --cache --ignore-unmatch .env" HEAD]