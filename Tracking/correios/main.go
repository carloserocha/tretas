package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"regexp"
	"strings"

	"golang.org/x/text/encoding/charmap"

	"github.com/PuerkitoBio/goquery"
	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
)

const uri = "https://www2.correios.com.br/sistemas/rastreamento/resultado_semcontent.cfm"

func getTracking(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	result := getTrackingDetails(params["id"])

	TrackingData := map[string]interface{}{
		"results": result,
	}

	encoding, err := json.Marshal(TrackingData)
	if err != nil {
		log.Fatal(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(encoding)
}

func getTrackingDetails(code string) []map[string]string {
	params := url.Values{}
	params.Add("objetos", code)

	req, err := http.NewRequest("POST", uri, strings.NewReader(params.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
	req.Header.Set("Accept-Charset", "utf-8")
	//req.Header.Add("Accept-Charset", "ISO-8859-1;utf-8;q0.7,*;q=0.7")
	// req.Header.Add("Content-Type", "text/html;")
	response, err := http.DefaultClient.Do(req)
	//response, err := http.PostForm(uri, params)

	if err != nil {
		log.WithFields(log.Fields{
			"statusCode": response.StatusCode,
			"url":        uri,
			"tracking":   code,
		}).Fatal("Impossível carregar a página do item " + code)
	}

	defer response.Body.Close()

	body, _ := ioutil.ReadAll(response.Body)
	dec := charmap.Windows1250.NewDecoder()
	output, _ := dec.Bytes(body)

	doc, _ := goquery.NewDocumentFromReader(
		bytes.NewReader(output),
	)

	r, _ := regexp.Compile("[\n\r\t]")
	splitWhiteSpace := regexp.MustCompile(`\s\s+`)

	var details = []map[string]string{}
	doc.Find("table tr").Each(func(_ int, tr *goquery.Selection) {
		var detail = make(map[string]string) // cria o hashMap
		tr.Find("td").Each(func(ix int, td *goquery.Selection) {
			txt := r.ReplaceAllString(strings.TrimSpace(td.Text()), "")
			split := splitWhiteSpace.Split(txt, -1)

			if ix == 0 {
				detail["date"] = split[0]
				detail["hour"] = split[1]
				detail["local"] = split[2]
			}

			if ix == 1 {
				detail["notice"] = strings.Join(split, " ")
			}
		})
		details = append(details, detail)
	})

	if len(details) > 0 {
		log.WithFields(log.Fields{
			"statusCode": response.StatusCode,
			"url":        uri,
			"tracking":   code,
		}).Info("Dados de rastreamento do item " + code + " recebido com sucesso")
	} else {
		log.WithFields(log.Fields{
			"statusCode": response.StatusCode,
			"url":        uri,
			"tracking":   code,
		}).Warn("Dados de rastreamento do item " + code + " inexistentes")
	}

	return details
}

func main() {
	log.SetFormatter(&log.JSONFormatter{})
	log.SetLevel(log.InfoLevel)

	router := mux.NewRouter()
	router.HandleFunc("/rastreio/correios/{id}", getTracking).Methods("GET")

	log.Fatal(http.ListenAndServe(":8000", router))
}
