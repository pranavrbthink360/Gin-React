package main

import (
	// "fmt"

	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// PersonalDetails STRUCT
type PersonalDetails struct {
	Username  string `json:"username"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
}

// GovtIdDetails STRUCT
type GovtIdDetails struct {
	Username     string `json:"username"`
	AadharNumber string `json:"aadharNumber"`
	PanNumber    string `json:"panNumber"`
}

// AddressDetails STRUCT
type AddressDetails struct {
	Username     string `json:"username"`
	FlatNumber   string `json:"flatNumber"`
	BuildingName string `json:"buildingName"`
	City         string `json:"city"`
	State        string `json:"state"`
}

// CONNECTING TO DB
func Connect() *pg.DB {
	opts := &pg.Options{
		User:     "postgres",
		Password: "Prasad@33",
		Addr:     "localhost:5432",
		Database: "GoLang",
	}
	var db *pg.DB = pg.Connect(opts)
	if db == nil {
		log.Printf("Failed to connect to DB")
		os.Exit(100)
	}
	log.Printf("Connected to DB")
	CreatePersonalDetailsTable(db)
	CreateGovtIdDetailsTable(db)
	CreateAddressDetailsTable(db)
	InitiateDB(db)
	return db
}

func Routes(router *gin.Engine) {
	router.GET("/api/v1/welcome", Welcome)
	router.GET("api/v1/getPersonalDetails", GetPersonalDetails)
	router.POST("/api/v1/addPersonalDetails", AddPersonalDetails)
	router.OPTIONS("/api/v1/addPersonalDetails", AddPersonalDetails)
	router.PUT("/api/v1/updatePersonalDetails", UpdatePersonalDetails)
	router.DELETE("/api/v1/deletePersonalDetails", DeletePersonalDetails)
	router.POST("/api/v1/addGovtIdDetails", AddGovtIdDetails)
	router.OPTIONS("/api/v1/addGovtIdDetails", AddGovtIdDetails)
	router.POST("/api/v1/addAddressDetails", AddAddressDetails)
	router.OPTIONS("/api/v1/addAddressDetails", AddAddressDetails)
	router.NoRoute(notFound)
}

func Welcome(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"msg": "Success",
	})
}

func GetPersonalDetails(c *gin.Context) {

}

func AddPersonalDetails(c *gin.Context) {

	// ------------------for_option_request-----------
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

	if c.Request.Method == "OPTIONS" {
		c.AbortWithStatus(204)
		return
	}
	// -------------------for_option_request----------------
	var personalDetails PersonalDetails
	err := c.ShouldBindJSON(&personalDetails)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"msg": "Bad request",
		})
		return
	}
	username := personalDetails.Username
	firstName := personalDetails.FirstName
	lastName := personalDetails.LastName
	email := personalDetails.Email
	phone := personalDetails.Phone

	insertError := dbConnect.Insert(&PersonalDetails{
		Username:  username,
		FirstName: firstName,
		LastName:  lastName,
		Email:     email,
		Phone:     phone,
	})
	if insertError != nil {
		log.Printf("Error while inserting new personal details into db, Reason: %v\n", insertError)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  http.StatusInternalServerError,
			"message": "Something went wrong",
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"status":  http.StatusCreated,
		"message": "Personal Details created Successfully",
	})
}

func UpdatePersonalDetails(c *gin.Context) {

}

func DeletePersonalDetails(c *gin.Context) {

}

func AddGovtIdDetails(c *gin.Context) {
	// ------------------for_option_request-----------
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

	if c.Request.Method == "OPTIONS" {
		c.AbortWithStatus(204)
		return
	}
	// -------------------for_option_request----------------
	var govtIdDetails GovtIdDetails
	err := c.ShouldBindJSON(&govtIdDetails)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"msg": "Bad request",
		})
		return
	}
	username := govtIdDetails.Username
	aadharNumber := govtIdDetails.AadharNumber
	panNumber := govtIdDetails.PanNumber

	insertError := dbConnect.Insert(&GovtIdDetails{
		Username:     username,
		AadharNumber: aadharNumber,
		PanNumber:    panNumber,
	})
	if insertError != nil {
		log.Printf("Error while inserting new address details into db, Reason: %v\n", insertError)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  http.StatusInternalServerError,
			"message": "Something went wrong",
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"status":  http.StatusCreated,
		"message": "Address Details created Successfully",
	})
}

func AddAddressDetails(c *gin.Context) {
	// ------------------for_option_request-----------
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

	if c.Request.Method == "OPTIONS" {
		c.AbortWithStatus(204)
		return
	}
	// -------------------for_option_request----------------
	var addressDetails AddressDetails
	err := c.ShouldBindJSON(&addressDetails)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"msg": "Bad request",
		})
		return
	}
	username := addressDetails.Username
	flatNumber := addressDetails.FlatNumber
	buildingName := addressDetails.BuildingName
	city := addressDetails.City
	state := addressDetails.State

	insertError := dbConnect.Insert(&AddressDetails{
		Username:     username,
		FlatNumber:   flatNumber,
		BuildingName: buildingName,
		City:         city,
		State:        state,
	})
	if insertError != nil {
		log.Printf("Error while inserting new address details into db, Reason: %v\n", insertError)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  http.StatusInternalServerError,
			"message": "Something went wrong",
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"status":  http.StatusCreated,
		"message": "Address Details created Successfully",
	})
}

func notFound(c *gin.Context) {
	c.JSON(http.StatusNotFound, gin.H{
		"status":  404,
		"message": "Route Not Found",
	})
}

// CREATE DATABASE INSTANCE
var dbConnect *pg.DB

func InitiateDB(db *pg.DB) {
	dbConnect = db
}

// CREATE PersonalDetails TABLE
func CreatePersonalDetailsTable(db *pg.DB) error {
	opts := &orm.CreateTableOptions{
		IfNotExists: true,
	}
	createError := db.CreateTable(&PersonalDetails{}, opts)
	if createError != nil {
		log.Printf("Error while creating todo table, Reason: %v\n", createError)
		return createError
	}
	log.Printf("Personal Details table created")
	return nil
}

// CREATE GovtIdDetails TABLE
func CreateGovtIdDetailsTable(db *pg.DB) error {
	opts := &orm.CreateTableOptions{
		IfNotExists: true,
	}
	createError := db.CreateTable(&GovtIdDetails{}, opts)
	if createError != nil {
		log.Printf("Error while creating todo table, Reason: %v\n", createError)
		return createError
	}
	log.Printf("Government Id Details table created")
	return nil
}

// CREATE GovtIdDetails TABLE
func CreateAddressDetailsTable(db *pg.DB) error {
	opts := &orm.CreateTableOptions{
		IfNotExists: true,
	}
	createError := db.CreateTable(&AddressDetails{}, opts)
	if createError != nil {
		log.Printf("Error while creating todo table, Reason: %v\n", createError)
		return createError
	}
	log.Printf("Address Id Details table created")
	return nil
}

func main() {
	// fmt.Println("Working")
	Connect()
	router := gin.Default()
	Routes(router)
	log.Fatal(router.Run(":8080"))
}
