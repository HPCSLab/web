FROM httpd:2.4-bookworm

ARG UID=48
ARG GID=48

RUN groupadd -g $GID apache && \
    useradd -m -s /bin/bash -u $UID -g $GID apache

RUN apt-get update && apt-get install -y \
    php8.2 \
    libphp8.2-embed \
    php8.2-mbstring \
    php8.2-xml \
    libapache2-mod-php

RUN ln -s /usr/lib/apache2/modules/libphp8.2.so /usr/local/apache2/modules/libphp8.2.so

COPY apache2/conf /usr/local/apache2/conf
COPY apache2/conf.d /usr/local/apache2/conf.d
COPY apache2/conf.modules.d /usr/local/apache2/conf.modules.d
COPY php.ini /etc/php.ini
COPY php.d /etc/php.d

CMD httpd -D FOREGROUND
