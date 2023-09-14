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
            $('#message').text("You can't override a decision. Please click vacant area.");
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
        var points = mark == "X" ? 1 : 10;
        var pointArr = [];
        pointArr.push({ [boxId]: points });
        result.push(pointArr);

        totalWay2 = 0;
        totalWay4 = 0;
        for (var i = 0; i < 3; i++) {
            var totalWay1 = 0;
            var totalWay3 = 0;
            for (var j = 0; j < 3; j++) {
                result.forEach(element => {
                    if (element[0][i + "," + j]) {
                        totalWay1 += element[0][i + "," + j];
                    }
                    if (i == j && element[0][i + "," + j]) {
                        totalWay2 += element[0][i + "," + j];
                    }
                    if (element[0][j + "," + i]) {
                        totalWay3 += element[0][j + "," + i];
                    }
                    if ((i == 0 && j == 2) || (i == 1 && j == 1) || (i == 2 && j == 0) || element[0][i + "," + j]) {
                        totalWay3 += element[0][i + "," + j];
                    }
                });

                if (totalWay1 == 3 || totalWay2 == 3 || totalWay3 == 3 || totalWay4 == 3) {
                    $('#result').text("Yo! X ,You won! :) :) ");
                }
                if (totalWay1 == 30 || totalWay2 == 30 || totalWay3 == 30 || totalWay4 == 30) {
                    $('#result').text("Yo! O, You won! :) :)");
                }
            }
        }

    }

});