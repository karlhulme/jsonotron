# Prepare jsl folder
mkdir -p download
rm -rf ./download/*

# Download a specific version of the Jsonotron types and schemas
curl -L \
  https://api.github.com/repos/karlhulme/jsonotron/tarball/v12.4.1 \
  --compressed \
  -o download/jsonotron.tar.gz

# Extract the types and schemas
gtar -x -f download/jsonotron.tar.gz --strip-components=1 -C download --wildcards "**/enumTypes/*.yaml"
gtar -x -f download/jsonotron.tar.gz --strip-components=1 -C download --wildcards "**/schemaTypes/*.yaml"
gtar -x -f download/jsonotron.tar.gz --strip-components=1 -C download --wildcards "**/schemas/*.yaml"

# Prepare auto-gen folder
mkdir -p src/autogen
rm -rf ./src/autogen/*
mkdir -p src/autogen/types/enumTypes
mkdir -p src/autogen/types/schemaTypes
mkdir -p src/autogen/schemas
