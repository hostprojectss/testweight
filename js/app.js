// For Previous Results

let previousData = [];

// Calculations for Beams

function getData() {

  // Data Collecting

  let data = $("#spanArea").serializeArray();
  let span = Number(document.querySelector("#span_v").value);
  // let span = Number(data[0].value)
  let height = Number(data[1].value)
  let width = Number(data[2].value)
  let sidePlate = Number(data[3].value)
  let topPlate = Number(data[4].value)
  let bottomPlate = Number(data[5].value)
  let squareSize = Number(data[6].value)
  let noOfBeams = Number(data[7].value)


  // Mass Calculations For Beams

  // Side Plate Mass
  var sidePlateMass = sidePlate * (span / 1000) * (height / 1000) * 7.85 * 2

  // Top Plate Mass
  var topPlateMass = topPlate * (span / 1000) * (width / 1000) * 7.85
  // Bottom Plate Mass
  var bottomPlateMass = bottomPlate * (span / 1000) * (width / 1000) * 7.85

  // Ribs Mass
  var noOfRibs = Math.floor(span / 1000 * 1.5)
  var ribsMass = sidePlate * (height / 1000) * (width / 1000) * 7.85 * noOfRibs

  // Square ribsMass
  var squareMass = squareSize * squareSize * span * 7.85 / 1000000

  // Total Mass

  var totalMass = parseFloat(((sidePlateMass + topPlateMass + bottomPlateMass + ribsMass + squareMass) * noOfBeams).toFixed(3));

  document.getElementById('resultSpan').innerHTML = "Total Weight of Beam = " + totalMass + " kg";

  return totalMass;

}

// Calculations for End Carriages

function getDataEC() {

  // Data Collecting

  let dataEC = $("#ECArea").serializeArray();
  let spanEC = Number(dataEC[0].value)
  let heightEC = Number(dataEC[1].value)
  let widthEC = Number(dataEC[2].value)
  let sidePlateEC = Number(dataEC[3].value)
  let topPlateEC = Number(dataEC[4].value)
  let bottomPlateEC = Number(dataEC[5].value)
  let noOfEC = Number(dataEC[6].value)

  // Mass Calculations For End Carriages

  // Side Plate Mass
  var sidePlateMassEC = sidePlateEC * (spanEC / 1000) * (heightEC / 1000) * 7.85 * 2

  // Top Plate Mass
  var topPlateMassEC = topPlateEC * (spanEC / 1000) * (widthEC / 1000) * 7.85
  // Bottom Plate Mass
  var bottomPlateMassEC = bottomPlateEC * (spanEC / 1000) * (widthEC / 1000) * 7.85

  // Ribs Mass
  var noOfRibsEC = Math.floor(spanEC / 1000 * 2)
  var ribsMassEC = sidePlateEC * (heightEC / 1000) * (widthEC / 1000) * 7.85 * noOfRibsEC

  // Total Mass

  var totalMassEC = parseFloat(((sidePlateMassEC + topPlateMassEC + bottomPlateMassEC + ribsMassEC) * noOfEC).toFixed(3));

  document.getElementById('resultEC').innerHTML = "Total Weight of End Carriages = " + totalMassEC + " kg";

  return totalMassEC;
}

// Calculations for Trolley

function getDataTrolley() {

  // Data Collecting

  let dataTrolley = $("#trolleyArea").serializeArray();
  let lengthTrolley = Number(dataTrolley[0].value)
  let widthTrolley = Number(dataTrolley[1].value)
  let channelTrolley = Number(dataTrolley[2].value)
  let chqPlate = Number(dataTrolley[3].value)

  var iBeamMassPerMtr = 0;

  switch (channelTrolley) {
    case 200:
      iBeamMassPerMtr = 24.2
      break;
    case 250:
      iBeamMassPerMtr = 37.3
      break;
    case 300:
      iBeamMassPerMtr = 46
      break;
    case 350:
      iBeamMassPerMtr = 52.4
      break;
    case 400:
      iBeamMassPerMtr = 61.5
      break;
    case 450:
      iBeamMassPerMtr = 72.4
      break;
    case 500:
      iBeamMassPerMtr = 86.9
      break;
    default:
  }

  // Mass Of I beams
  //  4 Pieces of length + 3 Pieces of (Width - 150)

  var iBeamMass = ((lengthTrolley / 1000 * 4) + ((widthTrolley - 150) / 1000 * 3)) * iBeamMassPerMtr

  // ChequereD Plate Mass

  var chqPlateMass = chqPlate * lengthTrolley / 1000 * widthTrolley / 1000 * 8.0833

  // Foundation + Support Mass

  var restTrolleyMass = (lengthTrolley + widthTrolley) / 20

  // Total Mass

  var totalMassTrolley = parseFloat((iBeamMass + chqPlateMass + restTrolleyMass).toFixed(3));

  document.getElementById('resultTrolley').innerHTML = "Total Weight of Trolley = " + totalMassTrolley + " kg";

  return totalMassTrolley;

}

function finalWeight(x) {

  // For Previous Results

  if (x == 1) {
    previousData.unshift(getData())
  }
  if (x == 2) {
    previousData.unshift(getDataEC())
  }
  if (x == 3) {
    previousData.unshift(getDataTrolley())
  }


  let finalWeight = parseFloat((getData() + getDataEC() + getDataTrolley()).toFixed(3));

  document.getElementById('resultTotal').innerHTML = "Total Weight  = " + finalWeight + " kg";

  if (previousData.lenggth != 0) {
    document.getElementById('previousDataLine').innerHTML = "Previous Results Below -";
  }

  for (var i = 0; i < previousData.length && i<5; i++) {
    document.getElementById(i+1).innerHTML = i+1 + ") " + previousData[i] + "Kg";
    // var p = document.createElement("P"); // Create a <p> element
    // p.innerHTML = previousData[i] "Kg"; // Insert text
    // document.body.appendChild(p); // Append <p> to <body>
  }


}
