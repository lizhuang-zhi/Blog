# 确保脚本抛出遇到的错误
set -e

# 进入生成的文件夹
cd /Users/mrkleo/Program/project/FrontEnd/Web/vue-press

git add .
git commit -m 'update master'
git push git@github.com:lizhuang-zhi/blog.git --all

cd -
