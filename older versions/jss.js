const form = document.getElementById("myForm");
const fill = document.getElementById("autofill");

fill.addEventListener("click", (event) => {
    event.preventDefault(); // prevent form from submitting and reloading the page
    document.getElementById("land").value = 2400;
    document.getElementById("homes").value = 0.2;
    document.getElementById("military").value = 12500;
    document.getElementById("peons").value = 50000;
    document.getElementById("dr_sci").value = 1.12;
    document.getElementById("rit_eff").value = 95;
    document.getElementById("ticks1").value = 35;
    document.getElementById("guilds").value = 180;
});


form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent form from submitting and reloading the page

    let input_length = document.getElementsByClassName("input_field");
        
    for (let i = 0; i < input_length.length; i++){
        
        let input = input_length[i].value;
        if (input.length > 8) {
            input_length[i].nextElementSibling.textContent = 'Must be 8 digits or less';
            event.preventDefault();
            return false; // Stop script execution
        } else {
            input_length[i].nextElementSibling.textContent = '';
        }
    }

    let input_length_s = document.getElementsByClassName("input_field_s");
        
    for (let i = 0; i < input_length_s.length; i++){
        
        let input_s = input_length_s[i].value;
        if (input_s.length > 4) {
            input_length_s[i].nextElementSibling.textContent = 'Must be 3 digits or less.';
            event.preventDefault();
            return false; // Stop script execution
        } else {
            input_length_s[i].nextElementSibling.textContent = '';
        }
    }


    
    const land = parseFloat(document.getElementById("land").value);
    // land = land.replace(/<[^>]*>?/gm, '');
    const homes = parseFloat(document.getElementById("homes").value);
    
    const military = parseFloat(document.getElementById("military").value);
    const peons = parseFloat(document.getElementById("peons").value);
    let initial_peons = peons;
    let home_peons = Math.floor(land*homes*10);
    

    const sci = parseFloat(document.getElementById("dr_sci").value);
    const rit = 1+((((parseFloat(document.getElementById("rit_eff").value))/100)*20)/100);
    const t1 = parseFloat(document.getElementById("ticks1").value);
    // const t2 = document.getElementById("ticks2").value;
    const guilds = parseFloat(document.getElementById("guilds").value);
    let wiz_prod = Math.floor(guilds*0.02);
    let total_peons = Math.floor(peons + home_peons);

    console.log("Land: " + land);
    console.log("Peons: " + peons);

    

    let pat = 1;
    let dr = 0;

    const selectElement1 = document.getElementById("pat");
    const selectElement2 = document.getElementById("dr");

    const selectedOptions1 = selectElement1.selectedOptions;
    const selectedValues1 = [];

    for (let i = 0; i < selectedOptions1.length; i++) {
    selectedValues1.push(selectedOptions1[i].value);
    }
    let spell = selectedValues1[0];
    
    if (spell == 'yes') {
        pat = 1.3;
    }

    const selectedOptions2 = selectElement2.selectedOptions;
    const selectedValues2 = [];

    for (let i = 0; i < selectedOptions2.length; i++) {
    selectedValues2.push(selectedOptions2[i].value);
    }

    let draft = selectedValues2[0];
    if (draft == 'res') {
        dr = 0.003
    } else if (draft == 'nor') {
        dr = 0.006
    } else if (draft == 'agg') {
        dr = 0.01
    } else if (draft == 'eme') {
        dr = 0.015
    }
    console.log(dr);

    let solds_drafted = 0;
    console.log(solds_drafted);
    let total_solds = solds_drafted;
    let total_military = military;
    let mpa = total_military/land;
    let ppa = total_peons/land;

    let table = document.getElementById("tab1");
    table.innerHTML = "";

    for (let hrs = 0; hrs<t1; hrs++) {

        let row = table.insertRow(hrs);
        let tickCell = row.insertCell(0);
        let peonCell = row.insertCell(1);
        let ppaCell = row.insertCell(2);
        let draftedCell = row.insertCell(3);
        let totalSoldsCell = row.insertCell(4);
        let militaryCell = row.insertCell(5);
        let mpaCell = row.insertCell(6);

        // row = table.insertRow(hrs+1);
        tickCell.innerHTML = hrs+1;
        solds_drafted = Math.floor(total_peons*dr*pat*rit*sci);
        total_peons = total_peons - solds_drafted - wiz_prod;
        peonCell.innerHTML = total_peons;
        ppa = (total_peons/land).toFixed(2);
        ppaCell.innerHTML = ppa;
        
        draftedCell.innerHTML = solds_drafted;
        total_solds += solds_drafted;
        totalSoldsCell.innerHTML = total_solds;
        
        total_military += solds_drafted;
        militaryCell.innerHTML = total_military;
        mpa = (total_military/land).toFixed(2);
        mpaCell.innerHTML = mpa;
    }
    // let final_tick = tickCell.innerHTML;
    // let final_peons = peonCell.innerHTML;
    // let final_ppa = ppaCell.innerHTML;
    // let final_total_solds = totalSoldsCell.innerHTML;
    // let final_military = militaryCell.innerHTML;
    // let final_mpa = mpaCell.innerHTML;

    let card_container = document.getElementById("results");
    // card_container.classList.add("grid-container", "results");
    // document.body.appendChild(card_container);
    let card = document.createElement("div");
    card.classList.add("grid-item","result-card");
    card_container.appendChild(card);


    let cardTop = document.createElement("div");
    cardTop.classList.add("card-part", "card-top", "parameter");
    card.appendChild(cardTop);
    let p0 = document.createElement("p");
    p0.innerHTML = "<h4>Starting values</h4>";
    cardTop.appendChild(p0);
    let p1 = document.createElement("p");
    p1.innerHTML = "Peons: <span style=color:green>" + initial_peons + "</span>" + " || " + "Future homes: <span style=color:green>" + homes*100 + "%</span>";
    cardTop.appendChild(p1);
    let p2 = document.createElement("p");
    p2.innerHTML = "Pat active: <span style=color:red>" + selectedValues1[0] + "</span>" + " || " + "Draft rate: <span style=color:red>" + selectedValues2[0] + "</span>";
    cardTop.appendChild(p2);
    let p3 = document.createElement("p");
    p3.innerHTML = "Ritual strength: <span style=color:yellow>" + document.getElementById("rit_eff").value + "</span>";
    cardTop.appendChild(p3);



    let cardBottom = document.createElement("div");
    cardBottom.classList.add("card-part", "card-bottom", "end-list");
    card.appendChild(cardBottom);
    let p20 = document.createElement("p");
    p20.innerHTML = "<h4>Resulting values</h4>";
    cardBottom.appendChild(p20);
    let p21 = document.createElement("p");
    p21.innerHTML =  "Total soldiers drafted: <span style=color:green>" + total_solds + "</span>" + " || " + "Ticks: <span style=color:green>" + t1 + "</span>";
    
    cardBottom.appendChild(p21);
    let p22 = document.createElement("p");
    p22.innerHTML = "Result total peons: <span style=color:green>" + total_peons + "</span>" + " || " + "Ppa: <span style=color:green>" + ppa + "</span>";
    cardBottom.appendChild(p22);
    let p23 = document.createElement("p");
    p23.innerHTML = "Result total military: <span style=color:green>" + total_military + "</span>" + " || " + "Mpa: <span style=color:green>" + mpa + "</span>";
    cardBottom.appendChild(p23);

});

