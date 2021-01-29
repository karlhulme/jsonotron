# Prepare download folder
mkdir -p download
rm -rf ./download/*

# Download a specific version of the Jsonotron repo
curl -L \
  https://api.github.com/repos/karlhulme/jsonotron/tarball/v15.0.0 \
  --compressed \
  -o download/jsonotron.tar.gz

# Extract all the enum and schema types
gtar -x -f download/jsonotron.tar.gz --strip-components=1 -C download --wildcards "**/enumTypes/*.yaml"
gtar -x -f download/jsonotron.tar.gz --strip-components=1 -C download --wildcards "**/schemaTypes/*.yaml"
