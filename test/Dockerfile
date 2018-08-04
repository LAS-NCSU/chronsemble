FROM node:10.7.0-jessie
#RUN useradd --user-group --create-home --shell /bin/false app &&\
RUN apt-get update &&\
apt-get install -y ruby-full
RUN useradd -ms /bin/false app
ENV HOME=/home/app
RUN chown -R app:app $HOME
USER app
WORKDIR $HOME
#RUN git clone https://github.com/patternfly/patternfly.git
RUN git clone https://github.com/johnnyNcsu/patternfly.git 
WORKDIR $HOME/patternfly
RUN npm install
USER root
RUN npm install -g grunt-cli &&\
gem install bundle &&\
bundle install
USER app
RUN npm run build &&\
npm test
