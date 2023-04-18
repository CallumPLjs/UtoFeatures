let land = 1527;
let homes = 0.13;
let home_peons = Math.floor(land*homes*10);
// let max_pop = 44251;
let existing_military = 13655;
// let target_mpa = 22;



let sci = 1.1;
let rit = 1.2;
let war = 1;
let pat = 1.25;
let hrs = 1;

let peons = home_peons + 30713;
let dr = 0.015;
let soldsDrafted = Math.floor(peons*dr*pat*war*rit*sci);
let totalSolds = soldsDrafted;
let military = existing_military + soldsDrafted;
let mpa = military/land;
let ppa = peons/land;

console.log(mpa.toFixed(2),ppa.toFixed(2))

function soldsdraft() {
    console.log(`Tick: ${hrs}`);
    console.log(`Start tick with ${peons} peons, Ppa: ${ppa.toFixed(2)}`);
    console.log(`Drafted from ${peons} peons: ${soldsDrafted} soldiers`);
    console.log(`Total solds drafted so far: ${totalSolds} soldiers`);
    console.log(`Total military: ${military} troops, Mpa: ${mpa.toFixed(2)}`);
    // console.log(mpa.toFixed(2),ppa.toFixed(2))
    console.log('--------------------------');

    for (let hrs = 2; hrs<=30; hrs++) {
        peons = peons - soldsDrafted - 12;
        soldsDrafted = Math.floor(peons*dr*pat*war*rit*sci);
        totalSolds += soldsDrafted;
        military += soldsDrafted;
        mpa = military/land;
        ppa = peons/land;

        console.log(`Tick: ${hrs}`);
        console.log(`Start tick with ${peons} peons, Ppa: ${ppa.toFixed(2)}`);
        console.log(`Drafted from ${peons} peons: ${soldsDrafted} soldiers`);
        console.log(`Total solds drafted so far: ${totalSolds} soldiers`);
        console.log(`Total military: ${military} troops, Mpa: ${mpa.toFixed(2)}`);
        // console.log(mpa.toFixed(2),ppa.toFixed(2))
        console.log('--------------------------');
    }
    
}

soldsdraft();

// let in_size = 300;
// let in_explore = 300;
// let expl_time = 12;
// console.log(`Start exploring at ${in_size} acres`);
// console.log('--------------------------');
// // let expl_tick = 1;
// let tick_acre = in_explore/expl_time;
// console.log(`Tick: ${expl_tick}`);
// console.log(`Start tick with ${new_size} acres`);
// console.log('--------------------------');
// for (let hrs = 1; hrs<=20; hrs++) {
    
//     in_explore -= tick_acre;
//     let new_size = in_size + tick_acre;
//     let new_pool = tick_acre*2;
//     in_explore += new_pool;

//     console.log(`Tick: ${hrs}`);
//     console.log(`Start tick with ${peons} peons, Ppa: ${ppa.toFixed(2)}`);
//     console.log(`Drafted from ${peons} peons: ${soldsDrafted} soldiers`);
//     console.log(`Total solds drafted so far: ${totalSolds} soldiers`);
//     console.log(`Total military: ${military} troops, Mpa: ${mpa.toFixed(2)}`);
//     // console.log(mpa.toFixed(2),ppa.toFixed(2))
//     console.log('--------------------------');
// }