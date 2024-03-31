# Commands

## Running on local without docker

- Clone the repo
- Open Terminal from the project folder/Go to project folder from terminal
- Install Node 20+
- To install all the dependencies packages `npm i`
- To run the project locally `npm start`
- To create build `npm run build`
- To preview build `npm run preview`

## Running on local with docker

- Install docker latest version
- Go to the project folder on terminal and run `sudo docker build -f Dockerfile -t frontend:local .`
- Once the Docker image is built, run the docker image with `sudo docker run -it --rm frontend:local`
- This will run the docker image and you will get a link on your terminal to access the project
