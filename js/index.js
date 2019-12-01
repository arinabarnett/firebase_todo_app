const taskList = document.querySelector('.tasks');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
   if (user) {
      if(user.admin){
         adminItems.forEach(item => item.style.display = 'block');
      }
      // Account info
      db.collection('users').doc(user.uid).get().then(doc => {
         const html = `
         <div>Logged in as ${user.email}</div>
         <div>${doc.data().bio}</div>
         <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html; 
      })    
      // Toggle UI elements when the user logged in 
      loggedInLinks.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
   } else {
      adminItems.forEach(item => item.style.display = 'none');
      // Hide account info 
      accountDetails.innerHTML = '';
      // Toggle UI elements when the user logged out
      loggedInLinks.forEach(item => item.style.display = 'none');
      loggedOutLinks.forEach(item => item.style.display = 'block');
   }
}

// Setup tasks 
const setupTasks = (data) => {

      if (data.length) { let html = '';
      data.forEach(doc => {
         const task = doc.data();
         const li = `
         <li>
         <div class="collapsible-header grey lighten-4">${task.title}</div>
         <div class="collapsible-body white">${task.description}</div>
         </li>
         `;
         html += li
      });

      taskList.innerHTML = html;
} else {
   taskList.innerHTML = '<h5 class="center-align">Login to view tasks</h5>'
}

}

// Setup Materialize components
document.addEventListener('DOMContentLoaded', function() {
   let modals = document.querySelectorAll('.modal');
   M.Modal.init(modals);

   let items = document.querySelectorAll('.collapsible');
   M.Collapsible.init(items); 
});

