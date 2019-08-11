pyftsubset "PublicSans-Black.ttf" --output-file="PublicSans-Black.woff2" --flavor=woff2 --layout-features="*" --desubroutinize --unicodes=U+0-10FFFF



# With required font features
pyftsubset "PublicSans-Black.ttf" --output-file="PublicSans-Black-first-stage.woff2" --flavor=woff2 --layout-features="ccmp,locl,mark,mkmk,kern" --desubroutinize --unicodes=U+0-10FFFF
