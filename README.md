# Line-Chatbot-Test
Testing chatbot in line app

# This app require .env to create variable
ACCESS_TOEKN, <br />
SECRET_TOKEN, <br />
RAPID_KEY, <br />
RAPID_URL

# ref from :
https://www.youtube.com/watch?v=PY5KlS-c03Y <br />
https://developers.line.biz/en/docs/messaging-api/nodejs-sample/#create-package-json

# troubleshooting
module & package usage <br />
[npm init -y] <br />
npm install express @line/bot-sdk axios dotenv <br />

Then you're done first thing you should do is <br />
add .gitignore and write .env to it and then use this command <br />
[git rm -r cache .env] <br />

and then add commit push but it's not done your secret is gone but you can find them in history commit, So what should we do <br />
run this command <br />
[git filter-branch --index-filter "git rm -rf --cache --ignore-unmatch .env" HEAD]