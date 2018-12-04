$(window).ready(function(){
	$('#minha-conta').show();
	$('#cadastro-problema').hide();
	$('#lita-problemas-minha-conta').hide();
	$('#ajuda').hide();

	// console.log(firebase.auth().currentUser.uid);

	// db.collection("usuarios").get().then((querySnapshot) => {
	// 	querySnapshot.forEach((doc) => {

	// 		if(usuarioUID == doc.id){
	// 			let nome = doc.data().nome;
	// 			let email = doc.data().email;
	// 			alert(nome);

	// 			document.getElementById("nome-usuario").innerHTML = nome;
	// 		}
	// 	});
	// });
});

function ocultarElementoPorId(id){
	$('#' +id).hide();
}
function exibirElementoPorId(id){
	$('#' +id).show();
}

function exibirElementoNovoProblema(){
	$('#minha-conta').hide();
	$('#cadastro-problema').show();
	$('#lita-problemas-minha-conta').hide();
	$('#ajuda').hide();
}

function exibirElementoMinhaConta(){
	$('#minha-conta').show();
	$('#cadastro-problema').hide();
	$('#lita-problemas-minha-conta').hide();
	$('#ajuda').hide();
}
function exibirElementoTodosProblemas(){
	$('#lita-problemas-minha-conta').show();
	$('#minha-conta').hide();
	$('#cadastro-problema').hide();
	$('#ajuda').hide();
}
function exibirElementoAjuda(){
	$('#ajuda').show();
	$('#minha-conta').hide();
	$('#lita-problemas-minha-conta').hide();
	$('#cadastro-problema').hide();
}

function iniciaDetalhes(detalheID){
	alert("dknfgklsdnf");
	const detalhe = document.getElementById(detalheID);
	detalhe.classList.add('mostrar');
}

function exibirDetalhes(){
	$('#detalhes').show();
}
function ocultarDetalhes(){
	$('#detalhes').hide();
}