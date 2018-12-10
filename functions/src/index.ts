import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { DocumentData } from '@google-cloud/firestore';

var serviceAccount = require("../eduworld-1542466980636-firebase-adminsdk-jiqlp-9b0ccc5598.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eduworld-1542466980636.firebaseio.com"
})


// Get the profile of a user
export const getProfile = functions.https.onRequest((request, response) => {
  admin.firestore().doc("users/" + request.query.user_id).get()
  .then(snapshot => {
    const data: DocumentData = snapshot.data()
    const profile = {
      name: data.firstname + " " + data.lastname,
      nickname: data.nickname,
      about: data.about,
      teacher: data.teacher,
      skills: data.skills,
      language: data.language,
      portrait: data.portrait
    }
    response.send(profile)
  })
  .catch(error => {
    console.log(error)
    response.status(500).send(error)
  })
})

// Post a message to another user
export const postMessage = functions.https.onCall((data, context) => {
  return data
})