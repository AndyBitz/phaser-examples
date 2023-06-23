rm -Rf .vercel/output

mkdir -p .vercel
mkdir -p .vercel/output
mkdir -p .vercel/output/static

cp -r landing/config.json .vercel/output/
cp -r landing/static/* .vercel/output/static
cp -r landing/functions .vercel/output/functions

cp -r anims .vercel/output/static/anims
cp -r phaser-first-test .vercel/output/static/phaser-first-test
cp -r states .vercel/output/static/states
