// Initialize Firebase
var config = {
	apiKey: "AIzaSyCaA80Lj1HSrbnxhx5WrJNBwB_njsQ8eFY",
	authDomain: "reclameaqui-178d1.firebaseapp.com",
	databaseURL: "https://reclameaqui-178d1.firebaseio.com",
	projectId: "reclameaqui-178d1",
	storageBucket: "reclameaqui-178d1.appspot.com",
	messagingSenderId: "788557420043"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});
