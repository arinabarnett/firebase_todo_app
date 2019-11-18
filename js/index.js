const taskList = document.querySelector('.tasks');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
   if (user) {
      // Toggle UI elements when the user logged in 
      loggedInLinks.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
   } else {
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

