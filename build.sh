rm -Rf .vercel/output

mkdir -p .vercel
mkdir -p .vercel/output
mkdir -p .vercel/output/static

cp -r anims .vercel/output/static/anims
cp -r phaser-first-test .vercel/output/static/phaser-first-test
cp -r states .vercel/output/static/states
cp -r landing/* .vercel/output/static
