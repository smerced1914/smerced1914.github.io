//Therapy outcome ranges
/*
<= 21 -- RoomAir
< 21 <= 24 -- 1L/min
< 24 <= 28 -- 2L/min
< 28 <= 32 -- 3L/min
< 32 <= 36 -- 4L/min
< 36 <= 40 -- 5L/min or Venturi Mask
< 40 <= 75 -- non rebreath mask
*/

const ROOM_AIR_MAX = 21;
const L1_MAX = 24;
const L2_MAX = 28;
const L3_MAX = 32;
const L4_MAX = 36;
const L5_MAX = 40;
const NON_REBREATHING = 75;
const OX_LIMIT = 100;




function checkInputs() {
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;
    const input3 = document.getElementById('input3').value;
    const input4 = document.getElementById('input4').value;

    if (input1 && input2 && input3 && input4) {
        document.getElementById('calculateBtn').style.display = 'block';
    } else {
        document.getElementById('calculateBtn').style.display = 'none';
    }
}

function determineOutcome(reqO2){
    let outcome;
    switch(true){

        case (reqO2 < ROOM_AIR_MAX):
            outcome = "Room Air";
            break;
        case (ROOM_AIR_MAX < reqO2 && reqO2 <= L1_MAX):
            outcome = "1L/min";
            break;
        case (L1_MAX < reqO2 && reqO2 <= L2_MAX):
            outcome = "2L/min";
            break;
        case (L2_MAX < reqO2 && reqO2 <= L3_MAX):
            outcome = "3L/min";
            break;
        case (L3_MAX < reqO2 && reqO2 <= L4_MAX):
            outcome = "4L/min";
            break;
        case (L4_MAX < reqO2 && reqO2 <= L5_MAX):
            outcome = "5L/min or Venturi Mask";
            break;
        case (L5_MAX < reqO2 && reqO2 <= NON_REBREATHING):
            outcome = "Non Rebreathing Mask";
            break;
        case (reqO2 > OX_LIMIT):
            outcome = "Oxygen Requirement can not be greater than 100%";
            break;
    }
    return outcome;
}

function allFieldsFilled() {
    const fiO2 = parseFloat(document.getElementById('input1').value);
    const age = parseFloat(document.getElementById('input2').value);
    const pO2 = parseFloat(document.getElementById('input3').value);
    const pCO2 = parseFloat(document.getElementById('input4').value);

    var idealO2 = Math.abs(((age * 0.4) - 104));
    var realO2 = (pO2 + pCO2) - 40;


    const reqO2 = Math.round((idealO2 / realO2) * fiO2);
    
    var outcome = determineOutcome(reqO2);
    console.log(outcome);

    document.getElementById('result').innerText = 'O2 requirement: ' + reqO2 + '%';
    document.getElementById('outcome').innerText = 'Therapy outcome: ' + outcome;
}

