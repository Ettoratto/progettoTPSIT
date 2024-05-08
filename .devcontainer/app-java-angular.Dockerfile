FROM maven:3.8.3-openjdk-17

# Install basic development tools
RUN microdnf install yum
RUN yum update -y
RUN dnf module enable nodejs:20 -y
RUN dnf install nodejs -y
RUN npm install -g @angular/cli
#ARG USERNAME=developer
#RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
#    && chmod 0440 /etc/sudoers.d/$USERNAME
