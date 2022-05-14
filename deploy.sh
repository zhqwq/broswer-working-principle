# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入静态文件的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# git push origin 本地分支:远端希望创建的分支
git push -f git@github.com:zhqwq/broswer-working-principle.git master:gh-pages