FROM golang:1.24.1

WORKDIR /app

COPY . .

RUN go mod tidy
RUN go build -o front

EXPOSE 9000

CMD ["./front"]