jQuery-PowerNewsTicker
======================

The current iteration of this plugin is very simple and straight forward. 

The purpose of this plugin is to animate a new row your prepending to your table. You can set a max number of rows
to show. If your table exceeds this number of rows, then the last row will slide up and fade out of view. 

<h2>HOW TO USE</h2>
You need to have a table with the following table format: 

<pre>

&lt;id="myTable">
  &lt;thead>
  &lt;/thead>
  &lt;tbody>
  &lt;/tbody>
&lt;/table>

</pre>

Then in your javascript write:
<pre>
$('#myTable').PowerNewsTicker();
</pre>

To insert a new row that animates in, use the "insert row" method of PowerNewsTicker:

<pre>
var newRow = "&lt;tr> &lt;td>Hello!&lt;/td> &lt;td>World!&lt;/td> &lt;/tr>";
$('#myTable').PowerNewsTicker("insert row", newRow);
</pre>
That will animate the row in and push the other rows downward

<hr/>
This plugin comes only with one option for now (As of February 24, 2013). Add the options when you first instatiate
the plugin:
<pre>
$('#myTable').PowerNewsTicker({
  maxNumRows: 10 //the default is 10, change this to what you want
});
</pre>

And thats it!
