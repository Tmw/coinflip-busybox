package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"
)

const (
	DEFUALT_APP_URL string = "http://server:3000/flip"
)

func getAppUrl() string {
	appUrl := os.Getenv("APP_URL")
	if appUrl != "" {
		return appUrl
	}

	return DEFUALT_APP_URL
}

type ResponseBody struct {
	Result string `json:"result"`
}

func main() {
	rand.NewSource(time.Now().UnixNano())

	for {
		resp, err := makeCall()
		if err != nil {
			log.Print(err)
		}

		if resp != nil {
			fmt.Printf("Got result: %s\n", resp.Result)
		}

		intervalSeconds := rand.Intn(5) * int(time.Second)
		time.Sleep(time.Duration(intervalSeconds))
	}
}

func makeCall() (*ResponseBody, error) {
	res, err := http.Get(getAppUrl())
	if err != nil {
		return nil, fmt.Errorf("Error making HTTP call: %w", err)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("Error reading response body: %w", err)
	}

	var rb ResponseBody
	err = json.Unmarshal(body, &rb)
	if err != nil {
		return nil, fmt.Errorf("Error decoding response: %w", err)
	}
	return &rb, nil
}
