(function() {
	// Getting elements
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');

	// Add login event
	btnLogin.addEventListener('click', e => {
		// get values
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		// sign in
		const promise = auth.signInWithEmailAndPassword(email,pass);
		promise.catch(e => console.log(e.message));
	});

	// add signup event
	btnSignUp.addEventListener('click', e=> {
		// get values
		// validate email input
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		// create user
		const promise = auth.createUserWithEmailAndPassword(email,pass);
		promise.catch(e => console.log(e.message));

	});

	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
	});

	// add realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {

		if(firebaseUser){
			console.log(firebaseUser);
			btnLogout.classList.remove('hide');
		}else{
			console.log("NOPE");
			btnLogout.classList.add('hide');
		}
	});
}());


