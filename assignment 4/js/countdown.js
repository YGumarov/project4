const countdownDate = new Date("2023-12-05T23:59:59").getTime();

 const countdownInterval = setInterval(function() {
	 const currentDate = new Date().getTime();
	 const timeRemaining = countdownDate - currentDate;

	 const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
	 const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	 const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
	 const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

	 document.getElementById("days").textContent = days.toString().padStart(2, '0');
	 document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
	 document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
	 document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

	 if (timeRemaining < 0) {
		 clearInterval(countdownInterval);
		 document.getElementById("countdown").innerHTML = "Discount end:(";
	 }
	
	}, 1000);