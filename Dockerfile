FROM node:20
WORKDIR /opt/signup_form
COPY . .
EXPOSE 3000
CMD [ "sleep", "infinity" ]