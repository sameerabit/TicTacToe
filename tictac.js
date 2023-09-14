$(function () {

    var clickCount = 0;

    const userX = "X";
    const userO = "O";

    var clickedHistory = [];

    var result = [];

    generateTable();


    $('#tictac_table tr td').click(function (event) {
        boxId = $(this).closest('td').attr('id');
        if (clickedHistory.includes(boxId)) {
            alert("You can't override a decision. Please click vacant area.");
            return;
        }
        var mark = defineUserOnClickCount();
        setMarkXorO(event, mark);
        clickedHistory.push(boxId);
        validateMove(boxId, mark);
    });

    function defineUserOnClickCount() {
        clickCount++;
        if (clickCount % 2 == 1) {
            return userX;
        } else {
            return userO;
        }
    }

    function setMarkXorO(event, mark) {
        $(event.delegateTarget).html("<h2>" + mark + "</h2>");
    }

    function generateTable() {
        var tableHtml = "";
        $counter = 1;
        for (var i = 0; i < 3; i++) {
            tableHtml += "<tr>";
            for (var j = 0; j < 3; j++) {
                var id = (i * i) + j;
                tableHtml += "<td id=" + i + "," + j + "></td>";
                $counter++;
            }
            tableHtml += "</tr>"
        }
        $('#tictac_table').html(tableHtml);
    }

    function validateMove(boxId, mark) {
        var points = mark == "X" ? 1 : 0;
        var pointArr = [];
        pointArr.push(boxId, points);
        result.push(pointArr);

        result.forEach(element => {
            if (element.length > 0) {
                console.log(element.split(","));
            }
        });
    }

});