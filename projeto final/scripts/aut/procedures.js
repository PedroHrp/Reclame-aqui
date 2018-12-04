firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user-nav").style.display = "none";
    document.getElementById("login-nav").style.display = "block";

  } else {
    // No user is signed in.
    document.getElementById("user-nav").style.display = "block";
    document.getElementById("login-nav").style.display = "none";
  }
});

function createUser(){
	password = document.getElementById("pwd-cadastro").value;
	confpassword = document.getElementById("conf-pwd-cadastro").value;
	if(password != confpassword){
		alert("Senhas diferentes!");
	}else{

	event.preventDefault();
	// nome= document.getElementById("nome-cadastro").value;
	email = document.getElementById("email-cadastro").value;
	
	firebase.auth().createUserWithEmailAndPassword(email,password)
	.then(function(){
		let message = "Usuário criado com sucesso";
		console.log(message);
		alert(message);

		let nome = document.getElementById("nome-cadastro").value;
		let email = document.getElementById("email-cadastro").value;
		let profissao = document.getElementById("profissao-cadastro").value;
		let telefone = document.getElementById("telefone-cadastro").value;
		db.collection("usuarios").add({
			nome: nome,
			email: email,
			profissao: profissao,
			telefone: telefone,
			tipo: "cidadao"
		}).then(function(docRef) {
			console.log("Usuario cadastrado com sucesso");
			alert("Salvo com sucesso");
			console.log("ID: ", docRef.id);
		})
		.catch(function(error) {
			console.error("Erro ao incluir o usuarios: ", error);
		});
	})
	.catch(function(error){
		alert(error.message);
		let errorCode = error.code;
		let errorMessage =  error.message;
		
	});

	}
}

function createPP(){
	password = document.getElementById("pwd-pp").value;
	confpassword = document.getElementById("pwd-conf-pp").value;
	if(password != confpassword){
		alert("Senhas diferentes!");
	}else{

	event.preventDefault();
	email = document.getElementById("email-pp").value;
	alert(email);
	alert(password);
	firebase.auth().createUserWithEmailAndPassword(email,password)
	.then(function(){
		let message = "Usuário criado com sucesso";
		console.log(message);
		alert(message);

		let nome = document.getElementById("nome-pp").value;
		let email = document.getElementById("email-pp").value;
		db.collection("usuarios").add({
			nome: nome,
			email: email,
			tipo: "Poder Publico"
		}).then(function(docRef) {
			console.log("Usuario cadastrado com sucesso");
			alert("Salvo com sucesso");
			console.log("ID: ", docRef.id);
		})
		.catch(function(error) {
			console.error("Erro ao incluir o usuarios: ", error);
		});
	})
	.catch(function(error){
		alert(error.message);
		let errorCode = error.code;
		let errorMessage =  error.message;
		
	});
	}
}

function authenticatetUse(){

	event.preventDefault();
	email = document.getElementById("email-login").value;
	password = document.getElementById("pwd-login").value;
	firebase.auth().signInWithEmailAndPassword(email,password)
	.then(function(){

		let message = "Usuário logado com sucesso";
		console.log(message);
		alert(message);
		// window.location.reload();

	})
	.catch(function(error){

		let errorCode = error.code;
		let errorMessage = error.message;
		if(errorMessage === "There is no user record corresponding to this identifier. The user may have been deleted."){
			alert("Não há registro de usuário correspondente a esse email. O usuário pode ter sido excluído.");
		}
		
	});
}

function logoffUser(){
	let user = firebase.auth().currentUser.uid;
	console.log(user);
	firebase.auth().signOut().then(function() {
		console.log("Usuário desconectado com sucesso!");
	}).catch(function(error) {
		console.log(error);
	});
}

function resetPassword(){

	event.preventDefault();
	let auth = firebase.auth();
	email =  document.getElementById("email-login").value;
	auth.sendPasswordResetEmail(email)
	.then(function(){
		let message = "Enviado para email com sucesso";
		console.log(message);
		alert( message);
	})
	.catch(function(error){
		let errorCode = error.code;
		if(errorMessage === "The email address is badly formatted."){
			alert("O endereço de email não foi está correto");
		}
		let errorMessage = error.message;
		alert(errorMessage);
	});
}

function cadastrarProblema(){
	let userUID = firebase.auth().currentUser.uid;
	if(userUID != null){
		let descricao = document.getElementById("descricao-problema").value;
		let endereço = document.getElementById("end-problema").value;
		db.collection("problemas").add({
			descricao: descricao,
			endereço: endereço,
			status: "cadastrado",
			usuário: userUID
		}).then(function(docRef) {
			console.log("Problama cadastrado com sucesso");
			alert("Problama cadastrado com sucesso");
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
			console.error("Erro ao incluir o problema: ", error);
		});
	}else{
		console.log("Usuário não está logado");
	}
}


function listarProblemasUsuario(){

	let userUID = firebase.auth().currentUser.uid;
	console.log(userUID);

	let tabela = document.getElementsByTagName("table")[0];
	db.collection("problemas").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			// console.log(`${doc.id} => ${doc.data()}`);
			let linha = tabela.insertRow(-1);
			let col0 = linha.insertCell(0);
			let col1 = linha.insertCell(1);
			let col2 = linha.insertCell(2);
			if(userUID == doc.data().usuário){
				col0.appendChild(document.createTextNode(doc.data().descricao));
				col1.appendChild(document.createTextNode(doc.data().endereço));
				col2.appendChild(document.createTextNode(doc.data().status));
			}
		});
	});
}

function listarTodosProblemas(){

	let tabela = document.getElementsByTagName("table")[0];
	db.collection("problemas").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			let problemaID = doc.id;
			let linha = tabela.insertRow(-1);
			let col0 = linha.insertCell(0);
			let col1 = linha.insertCell(1);
			let col2 = linha.insertCell(2);
			let col3 = linha.insertCell(3);
			let col4 = linha.insertCell(4);

			col0.appendChild(document.createTextNode(doc.data().descricao));
			col1.appendChild(document.createTextNode(doc.data().endereço));
			col2.appendChild(document.createTextNode(doc.data().status));
			col3.appendChild(document.createTextNode(problemaID));
		});
	});
}


function burcarProblema(){

	let problemaID = document.getElementById("id-busca").value;

	db.collection("problemas").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            if(problemaID == doc.id){
            	document.getElementById("problema-id").innerHTML = doc.id;
            	document.getElementById("problema-descricao").innerHTML = doc.data().descricao;
            	document.getElementById("problema-endereco").innerHTML = doc.data().endereço;
            	document.getElementById("problema-status").innerHTML = doc.data().status;
            }
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        alert("Erro ao carregar problema!");
    });
}

function alterarStatus(){

	let user = firebase.auth().currentUser;

	if(user != null){
		if(user.tipo == 'cidadao'){
			alert("Infelizmente você não tem permissão para alterar!");
		}else{
			var washingtonRef = db.collection("problemas").doc(id);

			// Set the "capital" field of the city 'DC'
			return washingtonRef.update({
			    satus: 'em andamento'
			    
			})
			.then(function() {
			    console.log("Document successfully updated!");
			})
			.catch(function(error) {
			    // The document probably doesn't exist.
			    console.error("Error updating document: ", error);
			});

		}
	}else{
		console.log("Usuário não está logado");
	}
	
}

