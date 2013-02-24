/*!
* PowerNewsTicker.js
* A vertical news ticker that animates new entries
*
* Copyright 2012, Marco Ledesma (http://www.marcoledesma.com)
* License: MIT
*
*/

(function($) {
	$.fn.PowerNewsTicker = function (options, args) {
		//checks number of rows in table, if more than number of rows, it will remove
		var checkNumberOfRows = function(table) {
			var numOfRows = $(table).children('tbody').children('tr').length;
			var maxRows = parseInt($(table).attr('PowerNewsTicker_max_num_rows'));
			var rowAnimSpeed = parseInt($(table).attr('PowerNewsTicker_row_anim_speed'));

			if (numOfRows > maxRows)
			{
				//grab last row, convert it into a div, do cool animation!
				var $lastRow = $(table).find('tr:not([PowerNewsTicker_old])').last();
				var $newRow = $("<tr>");
				$lastRow.attr('PowerNewsTicker_old', 'true').children('td').each(function() {
					var $td = $(this);
					$td.html("<div>" + $td.html() + "</div>").addClass('PowerNewsTicker_old_row');
					
					$td.children('div').slideUp({duration:rowAnimSpeed + 300, queue:false });
					$td.slideUp({duration:rowAnimSpeed + 300, queue:false});
				});
			}
		};

		//this will animate a table by shifting rows downward when a new entry is added
		var insertNewRow = function(table, row) {
			var newRow;
			var rowAnimSpeed = parseInt($(table).attr('PowerNewsTicker_row_anim_speed'));
			//for flashing the row when it comes into view
			var flashNewRow = function(rowCell) {
				//the class that has the color animation
				var newRowCls = "PowerNewsTicker_new_row";
				//initially removes the class (need to have this seperate from the for loop below otherwise the animation
				//executes too fast)
				$(rowCell).delay(500).queue(function() {
					$(this).removeClass(newRowCls);
					$(this).dequeue();
				});
				//does the flashing
				for (var i=0; i<3; i++) {
					$(rowCell).delay(150).queue(function() {
						$(this).toggleClass(newRowCls);
						$(this).dequeue();
					});
				}
				//and finally removes the class after 2 seconds
				$(rowCell).delay(2000).queue(function() {
					$(this).removeClass(newRowCls);
					$(this).dequeue();
				});
			};

			//prepending the new row
			$(table).children('tbody').prepend(row);
			//getting the dom element for the new row
			$(table).children('tbody').children('tr:not([PowerNewsTicker_monitored])').each(function() {
				newRow = this;			
				$(newRow).attr('PowerNewsTicker_monitored', 'true').children('td').hide().each(function() {
					newCell = this;
					$(newCell).addClass('PowerNewsTicker_row');
					//getting text from the td tag and putting it into a div so it can be animated
					var text = $(newCell).html();
					//add bg color
					$(newCell).addClass('PowerNewsTicker_new_row');
					$(newCell).html("<div style='display:none'>" + text + "</div>");

					$(newCell).queue(function() {
						$(newCell).slideDown({ duration: rowAnimSpeed, queue: false });
						$(newCell).children('div').slideDown({ duration: rowAnimSpeed, queue: false  });
						$(newCell).dequeue();
						flashNewRow(newCell);
					});

				});
			});

			//if number of rows is more than the max, then remove that row
			checkNumberOfRows(table);
		};

		if (options == undefined || typeof(options) == "object") {
			options = $.extend({ 
				maxNumRows: 10,
				bootStrapStyle: true,
				theme: "default", //possible values: sky, lava, dark, light,
				rowAnimSpeed: 400
			}, options);
		} else {
			switch (options) {
				case "insert row":
					if (args != undefined) {
						insertNewRow(this, args); //this being the table, and args can be either an object row or a string
					}
				break;
			}
			return;
		}

		var styles = function() {
			var $style = $("<style type='text/css'>");
			var newRowBgColor = "";
			var newRowTextColor = "";
			var oldRowBgColor = "";
			var oldRowTextColor = "";
			switch (options.theme) {
				case "default": 
					newRowBgColor = "#006DAD";
					newRowTextColor = "#FFF";
					oldRowBgColor = "#E44848";
					oldRowTextColor = "#FFF";
				break;
				case "sky":
					newRowBgColor = "#007BB8";
					newRowTextColor = "#FFF";
					oldRowBgColor = "#3A4878";
					oldRowTextColor = "#FFF";
				break;
				case "lava":
					newRowBgColor = "#D68A28";
					newRowTextColor = "#FFF";
					oldRowBgColor = "#D64E28";
					oldRowTextColor = "#FFF";
				break;
				case "dark":
					newRowBgColor = "#222";
					newRowTextColor = "#FFF";
					oldRowBgColor = "#444";
					oldRowTextColor = "#FFF";
				break;
				case "light":
					newRowBgColor = "#E6E6E6";
					newRowTextColor = "#333";
					oldRowBgColor = "#CCC";
					oldRowTextColor = "#333";
				break;
				default:
					newRowBgColor = "#006DAD";
					newRowTextColor = "#FFF";
					oldRowBgColor = "#E44848";
					oldRowTextColor = "#FFF";
				break;
			}
			var properties = ".PowerNewsTicker_new_row {";
			properties += "background-color:"+newRowBgColor+"; color:"+newRowTextColor+";";
			properties += "}";
			properties += ".PowerNewsTicker_old_row {";
			properties += "background-color:"+oldRowBgColor+"; color:"+oldRowTextColor+";";
			properties += "}";
			properties += ".PowerNewsTicker_row {";
			properties += "-webkit-transition:color, background-color .5s;";
			properties += "-moz-transition:color, background-color .5s;";
			properties += "-ms-transition:color, background-color .5s;";
			properties += "}"

			//grabbed this table style from twitter bootstrap
			$style.html(properties);
			$('body').append($style);
		};


		this.each(function() {
			var $table = $(this);
			//check if a row is inserted every couple of miliseconds
			$table.children('tbody').children('tr').each(function() {
				$(this).attr('PowerNewsTicker_monitored', 'true');
				$(this).children('td').addClass('PowerNewsTicker_row');
			});

			//add options attributes to table
			$table.attr('PowerNewsTicker_max_num_rows', options.maxNumRows);
			$table.attr('PowerNewsTicker_row_anim_speed', options.rowAnimSpeed);
			//adding bootstrap styling
			if (options.bootStrapStyle) $table.addClass('table').addClass('table-bordered');

		});

		styles();
	}
})(jQuery);