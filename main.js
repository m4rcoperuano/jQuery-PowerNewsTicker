$(document).ready(function() {
	var options = {
		maxNumRows: 4,
		theme: "daraka"
	};
	$('#records').PowerNewsTicker(options);

	for (var i=0; i<=3;i++) {
		$('body').delay(3000).queue(function() {
			var $row = $("<tr>");
			var $td = $("<td>").html("Hello world");
			var row = "<tr><td>Test</td><td>12/2/2009</td><td>Stuff</td></tr>";
			//$row.append(row);
			$('#records').PowerNewsTicker('insert row', row);

			$(this).dequeue();
		});
	}
});