// Registering Service Worker
if('serviceWorker' in navigator) {
	//navigator.serviceWorker.register('/sw.js');
};

function calculs(col) {
	var total = 0;
	var haut = document.querySelectorAll("[id^='inpt"+col+"']");
	for (const score of haut) {
 		if(score.value.length != 0) total = total + parseInt(score.value);
	}
	if ( total > 0 ) {
		if ( col.substr(4) == "Pts" ) {
			// En haut
			document.querySelector("#oupt"+col).value = total;
			if ( total >= 63 ) {
				document.querySelector("#oupt"+col+"Prime").value = 35;
				total += 35;
			}
			document.querySelector("#oupt"+col+"Total").value = total;
			document.querySelector("#oupt"+col+"TotalRep").value = total;
			total2 = parseInt(document.querySelector("#oupt"+col.replace("Pts","Lig")+"Total").value);
			if (!isNaN(total2)) {
				document.querySelector("#oupt"+col.replace("Pts","Total")).value = total + total2;
				grandTotal()
			}
		} else {
			// En bas
			document.querySelector("#oupt"+col+"Total").value = total;			
			total2 = parseInt(document.querySelector("#oupt"+col.replace("Lig","Pts")+"Total").value);
			if (!isNaN(total2)) {
				document.querySelector("#oupt"+col.replace("Lig","Total")).value = total + total2;
				grandTotal()
			}
		}
	}
};

function grandTotal() {
	total = 0;
	for (let c = 1; c <= 4; c++) {
		total12 = parseInt(document.querySelector("#ouptCol" + c + "Total").value);
		if (!isNaN(total12)) {
			total += total12;
		}			
	}
	document.querySelector("#inptGrandtotal").value = total;
};

// Init
for (let c = 1; c <= 4; c++) {
	calculs("Col"+c+"Pts");
	calculs("Col"+c+"Lig");
}
var inputs = document.querySelectorAll("input")
for (const elt of inputs) {
	elt.addEventListener('blur', (event) => {
 		calculs( event.target.id.substring(4,11) );
	});
}
