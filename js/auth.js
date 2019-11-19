

// Authentication status changes

auth.onAuthStateChanged(user => {
  if(user) {
    db.collection('tasks').onSnapshot(snapshot => {
      setupTasks(snapshot.docs);
      setupUI(user);
    }, err => {
      console.log(err.message)
    });
  } else {
    setupUI();
    setupTasks([]);
  }
});

// Create new task

const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('tasks').add({
    title: createForm['title'].value,
    description: createForm['description'].value
  }).then(() => {
    // Close modal and reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  });
});

// Sign up

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get user info 
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // Sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value
    });
  }).then(() => {
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// Logout

const logout = document.querySelector("#logout");
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut()
})

// Login

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get user's info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // Close the login modal and reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  })
})