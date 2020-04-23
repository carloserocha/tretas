package main

import (
	"os"

	log "github.com/sirupsen/logrus"
)

func main() {
	log.Print("starting...")

	file, err := os.OpenFile("log/info.log", os.O_CREATE|os.O_APPEND, 0644)

	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	log.SetOutput(file)
	log.SetFormatter(&log.JSONFormatter{})
	log.SetLevel(log.InfoLevel)

	log.Info("Iniciando processo...")

	log.WithFields(log.Fields{
		"pokemon": "Bulbasaur",
		"codeId":  1,
	}).Info("Foi o quarto pokémon capturado por Ash.")

	log.WithFields(log.Fields{
		"pokemon": "Charizard",
		"codeId":  6,
	}).Warn("Obtido por Ash em Kanto. Tem problemas de desobedecimento")

	log.WithFields(log.Fields{
		"pokemon": "Mewtwo",
		"codeId":  150,
	}).Fatal("Corra ou morra! hahahaha")

}
