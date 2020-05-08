// Registering Service Worker
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js');
};

function calculs( debut, col ) {
	var total = 0;
	//var haut = document.querySelectorAll("[id^='inpt"+col+"']");
	//for (const score of haut) {
	for (let l = debut+1; l <= debut+6; l++) {
 		//if(score.value.length != 0) total = total + parseInt(score.value);
		if(document.querySelector("#inptCol"+col+"Lig"+l).value.length != 0) total = total + parseInt( document.querySelector("#inptCol"+col+"Lig"+l).value );
	}
	if ( total > 0 ) {
		//if ( col.substr(4) == "Pts" ) {
		if ( debut == 0 ) {
			// En haut
			document.querySelector("#ouptCol"+col+"TotalH").value = total;
			if ( total >= 63 ) {
				document.querySelector("#ouptCol"+col+"Prime").value = 35;
				total += 35;
			}
			document.querySelector("#ouptCol"+col+"Total1").value = total;
			document.querySelector("#ouptCol"+col+"Total1again").value = total;
			total2 = parseInt(document.querySelector("#ouptCol"+col+"Total2").value);
			if (!isNaN(total2)) {
				document.querySelector("#ouptCol"+col+"Total").value = total + total2;
			} else {
				document.querySelector("#ouptCol"+col+"Total").value = total;
			}
			grandTotal();
		} else {
			// En bas
			document.querySelector("#ouptCol"+col+"Total2").value = total;			
			total2 = parseInt(document.querySelector("#ouptCol"+col+"Total1").value);
			if (!isNaN(total2)) {
				document.querySelector("#ouptCol"+col+"Total").value = total + total2;
			} else {
				document.querySelector("#ouptCol"+col+"Total").value = total;
			}
			grandTotal();
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
	calculs(0,c);
	calculs(6,c);
}
var inputs = document.querySelectorAll("input")
for (const elt of inputs) {
	elt.addEventListener('change', (event) => {
		lig = parseInt(event.target.id.substring(11));
		col = event.target.id.substring(7,8);
		calculs( (lig<7)?0:6 , col );
 		switch (col) {
 			case "1":
 				if (lig<12) document.querySelector("#inptCol"+col+"Lig"+(lig+1)).disabled = false;
 				break;
  			case "2":
 				if (lig>1) document.querySelector("#inptCol"+col+"Lig"+(lig-1)).disabled = false;
 				break;
		}
	});
}

document.querySelector("#btnImpr").addEventListener('click', (event) => {
	window.print();
});
