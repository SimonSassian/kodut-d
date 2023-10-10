// Andmed nimede kohta
const nimed = [
    "mari maasikas", "jaan jõesaar", "kristiina kukk", "margus mustikas", "jaak järve", "kadi kask",
    "Toomas Tamm", "Kadi Meri", "Leena Laas", "Madis Mets", "Hannes Hõbe", "Anu Allikas",
    "Kristjan Käär", "Eva Esimene", "Jüri Jõgi", "Liis Lepik", "Kalle Kask", "Tiina Teder", "Kaidi Koppel", "tiina Toom"
];

// Andmed sünniaegade ja vanuste kohta
const inimesteAndmed = [
    { nimi: "Mari Maasikas", isikukood: "38705123568" },
    { nimi: "Jaan Jõesaar", isikukood: "49811234567" },
    { nimi: "Kristiina Kukk", isikukood: "39203029876" },
    { nimi: "Margus Mustikas", isikukood: "49807010346" },
    { nimi: "Jaak Järve", isikukood: "39504234985" },
    { nimi: "Kadi Kask", isikukood: "39811136789" },
];

// Andmed kaugushüppe tulemuste kohta
const opilased = [
{ nimi: "Anna", tulemused: [4.5, 4.8, 4.6] },
{ nimi: "Mart", tulemused: [5.2, 5.1, 5.4] },
{ nimi: "Kati", tulemused: [4.9, 5.0, 4.7] },
{ nimi: "Jaan", tulemused: [4.3, 4.6, 4.4] },
{ nimi: "Liis", tulemused: [5.0, 5.2, 5.1] },
{ nimi: "Peeter", tulemused: [5.5, 5.3, 5.4] },
{ nimi: "Eva", tulemused: [4.8, 4.9, 4.7] },
{ nimi: "Marten", tulemused: [4.7, 4.6, 4.8] },
{ nimi: "Kairi", tulemused: [5.1, 5.3, 5.0] },
{ nimi: "Rasmus", tulemused: [4.4, 4.5, 4.3] },
];
// Funktsioon nimede kuvamiseks ja otsimiseks
function kuvaNimed() {
    const nimedDiv = document.getElementById("nimed");
    nimedDiv.innerHTML = "<ul>";

    for (const nimi of nimed) {
        nimedDiv.innerHTML += `<li>${muudaNimiSuureksAlgustäheks(nimi)}</li>`;
    }

    nimedDiv.innerHTML += "</ul>";
}

function muudaNimiSuureksAlgustäheks(nimi) {
    const nimeOsad = nimi.split(" ");
    const uusNimiOsad = [];

    for (const osa of nimeOsad) {
        uusNimiOsad.push(osa.charAt(0).toUpperCase() + osa.slice(1).toLowerCase());
    }

    return uusNimiOsad.join(" ");
}

function otsiNime() {
    const nimiOtsing = document.getElementById("nimiOtsing").value.toLowerCase();
    const nimedDiv = document.getElementById("nimed");
    nimedDiv.innerHTML = "<ul>";

    for (const nimi of nimed) {
        if (nimi.toLowerCase().includes(nimiOtsing)) {
            nimedDiv.innerHTML += `<li>${muudaNimiSuureksAlgustäheks(nimi)}</li>`;
        }
    }

    nimedDiv.innerHTML += "</ul>";
}

// Funktsioon sünniaegade ja vanuste lisamiseks
function lisaSunniaegJaVanus() {
    for (const inimene of inimesteAndmed) {
        const isikukood = inimene.isikukood;
        const synniaeg = "19" + isikukood.substring(1, 3) + "-" + isikukood.substring(3, 5) + "-" + isikukood.substring(5, 7);
        const vanus = arvutaVanus(isikukood.substring(1, 3));

        inimene.synniaeg = synniaeg;
        inimene.vanus = vanus;
    }
}

function arvutaVanus(synniaasta) {
    const praeguneAasta = new Date().getFullYear();
    return praeguneAasta - parseInt(synniaasta, 10);
}

// Funktsioon kaugushüppe tulemuste kuvamiseks
function kuvaKaugushuppe() {
    const opilasedDiv = document.getElementById("opilased");
    opilasedDiv.innerHTML = "<ul>";

    for (const opilane of opilased) {
        const tulemused = opilane.tulemused.join(", ");
        const keskmineTulemus = arvutaKeskmineTulemus(opilane.tulemused);
        opilasedDiv.innerHTML += `<li>${opilane.nimi} - Tulemused: ${tulemused}, Parim: ${Math.max(...opilane.tulemused)}, Keskmine: ${keskmineTulemus.toFixed(2)}</li>`;
    }

    opilasedDiv.innerHTML += "</ul>";
}

function arvutaKeskmineTulemus(tulemused) {
    const summa = tulemused.reduce((acc, tulemus) => acc + tulemus, 0);
    return summa / tulemused.length;
}

// Initsialiseeri leht
kuvaNimed();
lisaSunniaegJaVanus();
kuvaKaugushuppe();

// Funktsioon uue tulemuse lisamiseks
function lisaTulemus() {
    const uusTulemus = parseFloat(document.getElementById("uusTulemus").value);
    const opilaneNimi = prompt("Sisesta õpilase nimi:");
    
    for (const opilane of opilased) {
        if (opilane.nimi === opilaneNimi) {
            opilane.tulemused.push(uusTulemus);
            kuvaKaugushuppe();
            return;
        }
    }

    alert("Õpilast nimega " + opilaneNimi + " ei leitud.");
}