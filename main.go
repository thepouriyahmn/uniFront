package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/loginPage", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/login.html")
	})
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/homePage.html")
	})
	http.HandleFunc("/home", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/index.html")
	})

	http.HandleFunc("/signUp", func(w http.ResponseWriter, r *http.Request) {

		http.ServeFile(w, r, "static/signUp.html")
	})
	http.HandleFunc("/daneshjo", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/daneshjo.html")
	})
	http.HandleFunc("/permission", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/permission.html")
	})
	http.HandleFunc("/professor", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/professor.html")
		fmt.Println("hEy")
	})
	http.HandleFunc("/unauthorized", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/unauthorized.html")
		fmt.Println("hEy")
	})
	http.HandleFunc("/forbidden", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/forbidden.html")
	})

	http.HandleFunc("/static/css/main.css", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/css/main.css")
	})
	http.HandleFunc("/static/css/login.css", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/css/login.css")
	})
	http.HandleFunc("/static/css/daneshjo.css", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/css/daneshjo.css")
	})
	http.HandleFunc("/static/css/signUp.css", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/css/signUp.css")
	})
	http.HandleFunc("/static/css/permission.css", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/css/permission.css")
	})
	fmt.Println("test")
	err := http.ListenAndServe(":9000", nil)
	if err != nil {
		panic(err)
	}
	fmt.Println("connected successfully")
}
