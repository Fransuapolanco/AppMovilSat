
// Inicializar Firebase con tu configuración
const firebaseConfig = {
    apiKey: "AIzaSyAqQ59WQN0Srzk0EAUrdp0qeKiNfHHNCKs",
    authDomain: "appmoviltickets.firebaseapp.com",
    databaseURL: "https://appmoviltickets.firebaseio.com",
    projectId: "appmoviltickets",
    storageBucket: "appmoviltickets.appspot.com",
    messagingSenderId: "549655236347",
    appId: "1:549655236347:web:098a5e5ff59ca51d806a5e"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firebase Firestore
const db = firebase.firestore();



// Función para crear usuario
function createUser() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  // Crear usuario en Firebase Authentication
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.updateProfile({
        displayName: role
      })
      .then(() => {
        // Rol asignado exitosamente
        console.log("Rol asignado: ", role);
        // Agregar usuario a Firestore con el rol asignado
        addUserToFirestore(email, role);
      })
      .catch((error) => {
        console.error("Error al asignar rol al usuario: ", error);
      });
    })
    .catch((error) => {
      console.error("Error al crear usuario: ", error);
    });
      // Usuario creado exitosamente
      console.log("Usuario creado exitosamente");

      // Agregar usuario a Firestore con el rol asignado
      addUserToFirestore(email, role);
}

  // Función para cargar usuarios
  function loadUsers() {
    const userListElement = document.getElementById('userList');

    // Limpiar la lista antes de cargar los usuarios
    userListElement.innerHTML = '';

    // Obtener los usuarios desde Firestore
    db.collection('usuarios').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          const listItem = document.createElement('li');
          listItem.textContent = `Email: ${user.email}, Rol: ${user.role}`;
          userListElement.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error('Error al cargar usuarios: ', error);
      });
  }

// Función para agregar usuario a Firestore
function addUserToFirestore(email, role) {
  // Aquí puedes agregar el usuario a Firestore con su rol
  // Por ejemplo, podrías tener una colección de usuarios y almacenar el email y el rol
  db.collection('usuarios').add({
    email: email,
    role: role
  })
  .then((docRef) => {
    console.log('Usuario añadido a Firestore con ID: ', docRef.id);
  })
  .catch((error) => {
    console.error('Error al añadir usuario a Firestore: ', error);
  });
}

<button onclick="loadUsers()">Cargar Usuarios</button>


  
