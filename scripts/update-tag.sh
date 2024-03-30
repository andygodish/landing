#!/bin/bash

NEW_TAG=$1

# The file path to the deployment.yaml
DEPLOYMENT_FILE="./manifests/staging/deployment.yaml" 

# Check if the image tag argument is supplied
if [ -z "$NEW_TAG" ]; then
    echo "Error: No image tag specified."
    exit 1
fi

# Read the current image line from the deployment file
CURRENT_IMAGE_LINE=$(grep 'image:' $DEPLOYMENT_FILE)
echo "Current image line: $CURRENT_IMAGE_LINE"

# Use `sed` to replace the image tag in the deployment file
sed -i "s|andygodish/landing:v[0-9]*\.[0-9]*\.[0-9]*|andygodish/landing:$NEW_TAG|g" $DEPLOYMENT_FILE

# Check if `sed` command succeeded
if [ $? -eq 0 ]; then
    # Read the new image line to verify
    NEW_IMAGE_LINE=$(grep 'image:' $DEPLOYMENT_FILE)
    echo "Updated image line: $NEW_IMAGE_LINE"
    if [ "$CURRENT_IMAGE_LINE" != "$NEW_IMAGE_LINE" ]; then
        echo "Image tag updated to $NEW_TAG in $DEPLOYMENT_FILE"
    else
        echo "No changes were made. The image tag is the same or the pattern did not match."
    fi
else
    echo "Failed to update image tag in $DEPLOYMENT_FILE"
    exit 1
fi
