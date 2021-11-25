docker run -it --rm  -d \
-p 8091:3000 \
-v $(pwd):/code \
--workdir /code \
--name ${PWD##*/} \
yarnpkg/node-yarn 

docker exec -ti ${PWD##*/} bash