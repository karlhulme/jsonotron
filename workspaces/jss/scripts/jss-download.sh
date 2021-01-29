# Prepare download folder
mkdir -p download
rm -rf ./download/*

# Download a specific version of the Jsonotron repo
curl -L \
  https://api.github.com/repos/karlhulme/jsonotron/tarball/v15.0.0 \
  --compressed \
  -o download/jsonotron.tar.gz

# Extract all the enum and schema types within a jss folder
gtar -x -f download/jsonotron.tar.gz --strip-components=1 -C download --wildcards "**/jss/enumTypes/*.yaml"
gtar -x -f download/jsonotron.tar.gz --strip-components=1 -C download --wildcards "**/jss/schemaTypes/*.yaml"
