// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBXiV4xkZ-fOiWtMfw9Ax_w98Vh180pQxY",
authDomain: "byu-i-hackathon.firebaseapp.com",
projectId: "byu-i-hackathon",
storageBucket: "byu-i-hackathon.appspot.com",
messagingSenderId: "572956547059",
appId: "1:572956547059:web:1db2a9ac26ccd37b9e6486"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

document.getElementById('uploadForm').addEventListener('submit', function(event){
    event.preventDefault();

    const fileInput = document.getElementById('fileId');
    const file = fileInput.files[0];

    if (file){
        const fileName = file.name;
        const storageRef = ref(storage, 'images/' + fileName);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a file!', snapshot);
            document.getElementById('uploadStatus').innerText = "Image uploaded successfully!";
            console.log(getDownloadURL(storageRef))
            return getDownloadURL(storageRef);
        }).then((url) => {

            display(url, fileName)
            console.log("File available at: " + url);
            console.log(JSON.stringify({ file_name: fileName}));

            return $.ajax({
                url: '/upload',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ file_name: fileName }),
            });
        }).then((response) => {

            $('#result').text(response);
        }).catch((error) => {
            console.error('Error:', error);
            document.getElementById('runningStatus').innerText = "Failed to upload image!";
            $('#result').text('Error: ' + error);
        });
    } else {
        document.getElementById('uploadStatus').innerText = "No image selected!";
    }
})

function display(url, fileName){
    var templeImg = `<img class="uploadImg" src="${url}" alt="${fileName}">`
    document.getElementById('imgContainer').insertAdjacentHTML('afterbegin', templeImg)
}
