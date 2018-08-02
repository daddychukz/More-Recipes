#!/bin/bash

dockerSetup(){
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt-get update
    apt-cache policy docker-ce
    sudo apt-get install -y docker-ce
}

gcloudSetup(){
  sudo curl -LO https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-209.0.0-linux-x86_64.tar.gz
  tar xvzf google-cloud-sdk-209.0.0-linux-x86_64.tar.gz
  ./google-cloud-sdk/install.sh <<< y
  gcloud config set project andela-learning
  gcloud config set compute/zone us-east1-b
  export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"
  echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
  curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
  sudo apt-get update && sudo apt-get install google-cloud-sdk
  sudo apt-get install kubectl
}

createCluster(){
  gcloud container clusters create chuks-recipes \
    --scopes "cloud-platform" \
    --num-nodes 2
}

main(){
    dockerSetup
    gcloudSetup
    createCluster
}

main "$@"
