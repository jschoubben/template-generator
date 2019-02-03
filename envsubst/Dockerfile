FROM alpine:3.6
RUN apk --update add gettext-dev

ADD envsubst-file.sh /
RUN chmod +x /envsubst-file.sh

ENTRYPOINT ["/bin/sh", "/envsubst-file.sh"]