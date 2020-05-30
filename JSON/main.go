package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	Name     string `json:name`
	YearsOld int    `json:years_old`
}

func main() {
	user := &User{Name: "Carlinhos", YearsOld: 18}
	jsonUser, err := json.Marshal(user) // transforma struct em JSON

	if err != nil {
		fmt.Printf("Error: %s", err)
	}

	fmt.Println(string(jsonUser))

	if string(jsonUser) != "" {
		userByte := []byte(string(jsonUser)) // transforma o JSON em um array de Bytes
		var userStruct User
		err := json.Unmarshal(userByte, &userStruct) // transforma JSON em struct
		if err != nil {
			fmt.Printf("Error: %s", err)
		}

		fmt.Println(userStruct.Name)
	}
}
