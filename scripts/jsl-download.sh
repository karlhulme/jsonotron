# Prepare jsl folder
mkdir -p download
rm -rf ./download/*

# Download a specific version of the Jsonotron types and schemas
curl -L \
  https://api.github.com/repos/karlhulme/jsonotron/tarball/v13.1.2 \
  --compressed \
  -o download/jsonotron.tar.gz

# Extract the types and schemas
gtar -x -f download/jsonotron.tar.gz --strip-components=1 -C download --wildcards "**/enumTypes/*.yaml"
gtar -x -f download/jsonotron.tar.gz --strip-components=1 -C download --wildcards "**/schemaTypes/*.yaml"
