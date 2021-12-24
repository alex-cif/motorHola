//Carreguem el modul per importar firebase al projecte
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";

//Configuració del nostre firebase
const firebaseConfig = {
    apiKey: "AIzaSyAVebfaQjYkxNttK8-mhskTMEn_U218opk",
    authDomain: "motorhola-2d41f.firebaseapp.com",
    databaseURL: "https://motorhola-2d41f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "motorhola-2d41f",
    storageBucket: "motorhola-2d41f.appspot.com",
    messagingSenderId: "489752831114",
    appId: "1:489752831114:web:39845f0456d8ec733e3973"
};

//Inicialitzem el firebase
const app = initializeApp(firebaseConfig);

//Importem la base de dades del firebase
import { getDatabase, ref, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
const db = getDatabase(app);
const dbref = ref(db);

//Funcio per carregar la llista de cotxes
function carregaCotxes(propietari) {
    var i = 0;
    var vehicles = "";
    get(child(dbref, `vehicles`)).then((snapshot) => {
            snapshot.forEach(element => {
                i++;
                if (element.exists()) {
                    var estat = element.val().estat;
                    if (propietari == "") {
                        if (estat == "disponible") {
                            var nom = element.val().model;
                            var preu = element.val().preu;
                            var id = element.val().id;
                            var kms = element.val().kms;
                            var imgUrl = element.val().imatges[0];

                            document.getElementById("content").innerHTML = '<div class="container px-4 px-lg-5 mt-5"><div id="vehicles" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div></div>';
                            vehicles += '<div class="col mb-5"><div class="card h-100"><img class="card-img-top" src=' + imgUrl + ' id="myimg" /><div class="card-body p-4"><div class="text-center"><h5 class="fw-bolder">' + nom + '</h5>' + kms + 'Km<br>' + preu + '€</div></div><div class="card-footer p-4 pt-0 border-top-0 bg-transparent"><div class="text-center"><a class="btn btn-outline-dark mt-auto botoVeureMes" href="#" id="' + id + '">Veure més</a></div></div></div></div>';
                            document.getElementById("vehicles").innerHTML = vehicles;
                        }
                    } else {
                        var nomPropietari = element.val().nomPropietari;
                        if (estat == "disponible" && nomPropietari == propietari) {
                            var nom = element.val().model;
                            var preu = element.val().preu;
                            var id = element.val().id;
                            var kms = element.val().kms;
                            var imgUrl = element.val().imatges[0];

                            document.getElementById("content").innerHTML = '<div class="container px-4 px-lg-5 mt-5"><div class="mb-5"><button class="btn btn-primary inici" style="background-color: #212529; border-color:#212529;"><i class="bi bi-arrow-left-circle"> Retorna al inici</i></button></div><div id="vehicles" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div></div>';
                            vehicles += '<div class="col mb-5"><div class="card h-100"><img class="card-img-top" src=' + imgUrl + ' id="myimg" /><div class="card-body p-4"><div class="text-center"><h5 class="fw-bolder">' + nom + '</h5>' + kms + 'Km<br>' + preu + '€</div></div><div class="card-footer p-4 pt-0 border-top-0 bg-transparent"><div class="text-center"><a class="btn btn-outline-dark mt-auto botoVeureMes" href="#" id="' + id + '">Veure més</a></div></div></div></div>';
                            document.getElementById("vehicles").innerHTML = vehicles;
                        }
                    }

                } else console.log("No data available");
            });
        })
        .catch((error) => {
            console.error(error);
        });

    document.getElementById("titol").innerHTML = "Compra aqui el teu nou cotxe!";
    document.getElementById("subtitol").innerHTML = "Tria, contacta i compra";
};



$(document).ready(function() {
    carregaCotxes("");

    //Al fer click a veure mes d'un cotxe
    $(document).on("click", ".botoVeureMes", function() {
        var id = this.id;
        get(child(dbref, `vehicles/` + id)).then((snapshot) => {
                if (snapshot.exists()) {
                    var nom = snapshot.val().model;
                    var preu = snapshot.val().preu;
                    var marca = snapshot.val().marca;
                    var model = snapshot.val().model;
                    var combustible = snapshot.val().combustible;
                    var kms = snapshot.val().kms;
                    var canvi = snapshot.val().canvi;
                    var descripcio = snapshot.val().descripcio;
                    var color = snapshot.val().color;
                    var nomPropietari = snapshot.val().nomPropietari;
                    var telefonPropietari = snapshot.val().telefonPropietari;

                    var fotos = "";

                    var imatges = snapshot.val().imatges;

                    for (var i = 0; i < imatges.length; i++) {
                        fotos += '<img class="card-img-top" src=' + imatges[i] + ' id="myimg" />';
                    }

                    document.getElementById("titol").innerHTML = nom;
                    document.getElementById("subtitol").innerHTML = "A partir de " + preu + "€";
                    document.getElementById("content").innerHTML = '<div class="p-5"><button class="btn btn-primary inici" style="background-color: #212529; border-color:#212529;"><i class="bi bi-arrow-left-circle"> Retorna al inici</i></button></div><div class="container-fluid"><div class="row"><div class="col-md-1"></div><div class="col-md-5"><div id="info"><h4>Info:</h4>Marca: ' + marca + ' <br> Model: ' + model + ' <br> Combustible: ' + combustible + ' <br>Kms: ' + kms + ' <br>Canvi: ' + canvi + ' <br>Descripció: ' + descripcio + ' <br>Color: ' + color + ' <br>Propietari: <a id="' + nomPropietari + '" style="cursor: pointer;" class="propietari"><u> ' + nomPropietari + '</u></a> <br>Telefon contacte: ' + telefonPropietari + ' <br> <div class="p-5"><button id="' + id + '" class="btn btn-primary vendre" style="background-color: red; border-color: red;"><i> Vendre vehicle</i></button></div></div></div><div class="col-md-6"><h4>Fotos:</h4><section class="py-5"><div class="container px-4 px-lg-5 mt-5"><div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-left">' + fotos + '</div></div></section></div></div></div>';
                } else {
                    console.log("No data available");
                }

            })
            .catch((error) => {
                console.error(error);
            });
    });

    //Al fer click al boto inici o tornar a inici
    $(document).on("click", ".inici", function() {
        carregaCotxes("");
    });

    //Al fer click al nom d'un propietari
    $(document).on("click", ".propietari", function() {
        var prop = this.id;
        carregaCotxes(prop);
    });

    $(document).on("click", ".vendre", function() {
        var id = this.id;
        update(ref(db, `vehicles/` + id), {
            estat: "venut",
        });
    });

});