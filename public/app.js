const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

// Create element and render cafe
function renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let remove = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  remove.textContent = "X"

  li.appendChild(name)
  li.appendChild(city)
  li.appendChild(remove)

  cafeList.appendChild(li)

//   Deleting data
remove.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("cafes").doc(id).delete()
})
}

// Getting data
// db.collection("cafes")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderCafe(doc);
//     });
//   });


// Saving data
form.addEventListener("submit", (e) => {
    e.preventDefault()
    db.collection("cafes").add({
        name: form.name.value,
        city: form.city.value
    })
    form.name.value = ""
    form.city.value = ""
})

// Real Time Listener
db.collection("cafes").orderBy("city").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == "added") {
            renderCafe(change.doc)
        } else if (change.type == "removed") {
            let li = cafeList.querySelector("[data-id=" + change.doc.id + "]")
            cafeList.removeChild(li)
        }
    })
})