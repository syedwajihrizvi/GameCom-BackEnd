const axios = require('axios')
const config = require('config')
const express = require('express')
const router = express.Router()

const api = "https://bipn930cal.execute-api.us-west-2.amazonaws.com/production/v4"
const awsKey = config.get("awsKey")

const apiClient = axios.create({baseURL: api, headers: {'x-api-key': awsKey}})

router.post('/games', async (req, res) => {
    const {query} = req.body
    if (!query)
        return res.status(400).send("Invalid Request: No query found for games")
    // Send the request to the IDGB Server
    try {
        const result = await apiClient.post('/games', query)
        if (!result)
            return res.status(400).send("Invalid game response received")
        return res.send(result.data)       
    } catch (error) {
        return res.status(501).send("An Internal server error occured")
    }
})

router.post('/gameModes', async (req, res) => {
    const {query} = req.body
    if (!query)
        return res.status(400).send("Invalid Request: No query found for gameModes")
    try {
        const result = await apiClient.post('/game_modes', query)
        if (!result)
            return res.status(400).send("Invalid game response received")
        return res.send(result.data)       
    } catch (error) {
        return res.status(501).send("An Internal server error occured")
    }
})

router.post('/involved_companies', async (req, res) => {
    const {query} = req.body
    if (!query)
        return res.status(400).send("Invalid Request: No query found for companies")
    try {
        const result = await apiClient.post('/involved_companies', query)
        if (!result)
            return res.status(400).send("Invalid company response received")
        return res.send(result.data)       
    } catch (error) {
        return res.status(501).send("An Internal server error occured")
    }
})

router.post('/genres', async (req, res) => {
    const {query} = req.body
    if (!query)
        return res.status(400).send("Invalid Reuest: No query found for genres")
    try {
        const result = await apiClient.post('/genres', query)
        if (!result)
            return res.status(400).send("Invalid genre response received")
        return res.send(result.data)       
    } catch (error) {
        return res.status(501).send("An Internal server error occured")
    }
})

router.post('/themes', async (req, res) => {
    const {query} = req.body
    if (!query)
        return res.status(400).send("Invalid Request: No query found for themes")
    try {
        const result = await apiClient.post('/themes', query)
        if (!result)
            return res.status(400).send("Invalid themes response received")
        return res.send(result.data)         
    } catch (error) {
        return res.status(501).send("An Internal server error occured")
    }   
})

router.post('/platforms', async (req, res) => {
    const {query} = req.body
    if (!query)
        return res.status(400).send("Invalid Request: No query found for platforms")
    try {
        const result = await apiClient.post('/platforms', query)
        if (!result)
            return res.status(400).send("Invalid platforms response received")
        return res.send(result.data)        
    } catch (error) {
        return res.status(501).send("An Internal server error occured")
    }   
})
module.exports = router