FROM adoptopenjdk/openjdk11:ubuntu-jre

ARG GITHUB_RUN_NUMBER          
ARG DOCKER_IMAGE_TAGS

ENV MY_BUILD_NUMBER=${GITHUB_RUN_NUMBER:-snapshot}
ENV MY_BUILD_TAG=${DOCKER_IMAGE_TAGS:-ninja} 

COPY data .

RUN echo BUILD_NUMBER ${MY_BUILD_NUMBER} >> data
RUN echo BUILD_TAG ${MY_BUILD_TAG} >> data

CMD ["cat", "data"]

