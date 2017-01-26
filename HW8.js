/**
 * Created by Akshay on 30-03-2016.
 */
var flag = 0;
var table1;
var symbol;
//refreshinit();
var res = [];
if (localStorage && localStorage.getItem("favrs")){
    var obj2 = [];
    obj2 = JSON.parse(localStorage.getItem("favrs"));

    //console.log(obj2);
    for (i=0;i<obj2.length;i++){
        $.ajax({
            url: "index.php?quote=" + obj2[i],
            type: "GET",
            success: function (data) {
                var table3 = JSON.parse(data);
                var temp12 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/up.png\" alt=\"c\" width=\"20\" height=\"22\">";
                var temp22 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/down.png\" alt=\"d\" width=\"20\" height=\"22\">";
                var tempr ="";
                var newtable = "<tr id=\""+table3['Symbol']+"\"><td>";
                newtable += "<a onclick='getcarousel(" + table3['Symbol'] + ")'>" + table3['Symbol'] + "</a></td>";
                newtable += "<td id='"+table3['Symbol']+"_nm'>" + table3['Name'] + "</td>";
                newtable += "<td id='"+table3['Symbol']+"_lp'>" + table3['LastPrice'] + "</td>";
                if (table3["ChangePercent"] > 0){
                    newtable += "<td id='"+table3['Symbol']+"_cp' style=\"color: green\">";
                    tempr = temp12;
                }
                else if(table3["ChangePercent"] < 0){
                    newtable += "<td id='"+table3['Symbol']+"_cp' style=\"color: red\">";
                    tempr = temp22;
                }
                newtable += table3['Change'] +tempr+"</td>";
                newtable += "<td id='"+table3['Symbol']+"_mc'>" + table3['MarketCap'] + "</td>";
                newtable += "<td><button class=\"btn btn-default\" onclick=\"deleter("+table3['Symbol']+")\"><span class=\"glyphicon glyphicon-trash\" ></span></button></td></tr>";
                $("#table2").append(newtable);
            }
        });
    }
//    refresh();
}
//alert("Refresh");
$(document).ready(function () {
    $("#sym1").val("");
    $("#next1").prop("disabled",true);
    $(function () {
        function log(message) {

            $("<div>").text(message).prependTo("#log");
            $("#log").scrollTop(0);
        }

        $("#sym1").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "index.php?lookup=" + request.term,
                    type: "GET",
                    success: function (data) {
                        response(JSON.parse(data));
                    }
                });
            },
            minLength: 1,
            select: function (event, ui) {
                var str1 = ui.item.label;
                ui.item.value = str1.substring(0, str1.indexOf(' '));
                log(ui.item ?
                    "" : "Select a valid entry ");
                flag = 1;
                $("#log").text("");
            },
            open: function () {
                $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            },
            close: function () {
                $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            }
        });
    });

    $("#fb1").click(function () {
        FB.ui({
            method: 'feed',
            link: 'http://dev.markitondemand.com/',
            picture: "http://chart.finance.yahoo.com/t?s=" + symbol + "&lang=en-US&width=160&height=160" ,
            name: "Current Stock Price of " + table1['Name'] + " is " + table1['LastPrice'] ,
            caption: "LAST TRADE PRICE: " + table1['LastPrice'] + ". CHANGE: " + table1['Change'],
            description: "Stock Information of " + table1['Name'] + " (" + table1['Symbol'] + ")"
        },
            function(response){
                //console.log(response);
                if(response){
                    if (response['post_id']) {
                        alert("Posted Successfully");
                    }
                    else {
                        alert("Not Posted");
                    }
                }
                else {
                    alert("Not Posted");
                }

            }
        );

    });

    $("#star1").click(function () {
        var obj1=[];
        if ($("#star2").hasClass("white")) {
            $("#star2").removeClass("white");
            $("#star2").addClass("yellow");
            if (localStorage && localStorage.getItem("favrs")){
                //console.log(localStorage.getItem("favrs"));
                obj1 = JSON.parse(localStorage.getItem("favrs"));
                var l = obj1.indexOf($("#sym1").val())
                if(l == -1){
                    obj1.push($("#sym1").val());
                    localStorage.setItem("favrs",JSON.stringify(obj1));
                }
                else{
                    return
                }
            }
            else {
                obj1.push($("#sym1").val());
                localStorage.setItem("favrs",JSON.stringify(obj1));
            }
            //console.log(localStorage.getItem("favrs"));
            $.ajax({
                url: "index.php?quote=" + $("#sym1").val(),
                type: "GET",
                success: function (data) {
                    var table2 = JSON.parse(data);
                    var temp1 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/up.png\" alt=\"c\" width=\"20\" height=\"22\">";
                    var temp2 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/down.png\" alt=\"d\" width=\"20\" height=\"22\">";
                    var temp ="";
                    var newtable = "<tr id=\""+table2['Symbol']+"\"><td>";
                    newtable += "<a onclick='getcarousel(" + table2['Symbol'] + ")'>" + table2['Symbol'] + "</a></td>";
                    newtable += "<td id='"+table2['Symbol']+"_nm'>" + table2['Name'] + "</td>";
                    newtable += "<td id='"+table2['Symbol']+"_lp'>" + table2['LastPrice'] + "</td>";
                    if (table2["ChangePercent"] > 0){
                        newtable += "<td id='"+table2['Symbol']+"_cp' style=\"color:green\">";
                        temp = temp1;
                    }
                    else if(table2["ChangePercent"] < 0){
                        newtable += "<td id='"+table2['Symbol']+"_cp' style=\"color:red\">";
                        temp = temp2;
                    }
                    newtable += table2['Change'] +temp+"</td>";
                    newtable += "<td id='"+table2['Symbol']+"_mc'>" + table2['MarketCap'] + "</td>";
                    newtable += "<td><button class=\"btn btn-default\" onclick=\"deleter("+table2['Symbol']+")\"><span class=\"glyphicon glyphicon-trash\" ></span></button></td></tr>";
                    $("#table2").append(newtable);
                    //console.log();
                }
            });
  //      refresh();
        }
        else {
            if ($("#star2").hasClass("yellow")) {
                $("#star2").removeClass("yellow");
                $("#star2").addClass("white");
                var obj3 = [];
                $("#"+symbol).remove();
                if (localStorage && localStorage.getItem("favrs")) {
                    //console.log(localStorage.getItem("favrs"));
                    obj3 = JSON.parse(localStorage.getItem("favrs"));
                    var l = obj3.indexOf(symbol);
                    obj3.splice(l, 1);
                    localStorage.setItem("favrs", JSON.stringify(obj3));
                }
            }
        }
    });

    $("#form1").submit(function(e) {
        e.preventDefault();
    })

/*    $('#check1').click(function(){
        if ($('#check1').attr('checked')) {
            /!* NOT SURE WHAT TO DO HERE *!/

        }
    })*/
});


function getQuote(){
    $("#submit_handler").click();
    if($("#sym1").val() == "") {
        return;
    }
    var temp1 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/up.png\" alt=\"c\" width=\"16\" height=\"20\">";
    var temp2 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/down.png\" alt=\"d\" width=\"16\" height=\"20\">";
    var temp ="";
    if (flag == 0) {
        $.ajax({
            url: "index.php?quote1=" + ($("#sym1").val()).toUpperCase(),
            type: "GET",
            success: function (data) {
                t4 = JSON.parse(data);
                if(t4[0] == 0){
                    $("#log").text("Select a valid entry");
                }
                else {
                    flag = 1;
                    getQuote();
                }
            }
        });
    }
    else {
        $("#next1").prop("disabled",false);
        symbol = $("#sym1").val();
        symbol = symbol.toUpperCase();
        checkstar();
        getnewsfeed();
        getchart();
        $("#star2").addClass("white");
        if ($("#star2").hasClass("yellow")){
            $("#star2").addClass("white");
            $("#star2").removeClass("yellow");
        }
        $("#log").text("");
        flag = 0;
        $("#carousel-example-generic").carousel("next");
        //$('#someTab').tab('')
        $.ajax({
            url: "index.php?quote=" + ($("#sym1").val()).toUpperCase(),
            type: "GET",
            success: function( data ) {
                table1 = JSON.parse(data);
                //console.log(table1);
                $("#t1").text(table1['Name']);
                $("#t2").text(table1['Symbol']);
                $("#t3").text(table1['LastPrice']);
                if (table1["ChangePercent"] > 0){
                    $("#t4").css('color','green');
                    temp = temp1;
                }
                else if(table1["ChangePercent"] < 0){
                    $("#t4").css('color','red');
                    temp = temp2;
                }
                $("#t4").html(table1['Change'] + " " + temp);
                $("#t5").text(table1['Timestamp']);
                $("#t6").text(table1['MarketCap']);
                $("#t7").text(table1['Volume']);
                if (table1["ChangePercentYTD"] > 0){
                    $("#t8").css('color','green');
                    temp = temp1;
                }
                else if(table1["ChangePercentYTD"] < 0){
                    $("#t8").css('color','red');
                    temp = temp2;
                }
                $("#t8").html(table1['ChangeYTD'] + " " + temp);
                $("#t9").text(table1['High']);
                $("#t10").text(table1['Low']);
                $("#t11").text(table1['Open']);
            }
        });
        var urlyahoo = "http://chart.finance.yahoo.com/t?s=";
        urlyahoo = urlyahoo + $("#sym1").val() + "&lang=en-US&width=500&height=400";
        $("#tp").attr("src",urlyahoo);
        $("#current").tab("show");

    }
}

function getcarousel(tid){
    var temp1 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/up.png\" alt=\"c\" width=\"16\" height=\"20\">";
    var temp2 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/down.png\" alt=\"d\" width=\"16\" height=\"20\">";
    var temp ="";
    symbol = tid.id;
    checkstar();
    getnewsfeed();
    getchart();
    $("#carousel-example-generic").carousel("next");
    $.ajax({
        url: "index.php?quote=" + symbol,
        type: "GET",
        success: function( data ) {
            table1 = JSON.parse(data);
            //console.log(table1);
            $("#t1").text(table1['Name']);
            $("#t2").text(table1['Symbol']);
            $("#t3").text(table1['LastPrice']);
            if (table1["ChangePercent"] > 0){
                $("#t4").css('color','green');
                temp = temp1;
            }
            else if(table1["ChangePercent"] < 0){
                $("#t4").css('color','red');
                temp = temp2;
            }
            $("#t4").html(table1['Change'] + " " + temp);
            $("#t5").text(table1['Timestamp']);
            $("#t6").text(table1['MarketCap']);
            $("#t7").text(table1['Volume']);
            if (table1["ChangePercentYTD"] > 0){
                $("#t8").css('color','green');
                temp = temp1;
            }
            else if(table1["ChangePercentYTD"] < 0){
                $("#t8").css('color','red');
                temp = temp2;
            }
            $("#t8").html(table1['ChangeYTD'] + " " + temp);
            $("#t9").text(table1['High']);
            $("#t10").text(table1['Low']);
            $("#t11").text(table1['Open']);
        }
    });
    var urlyahoo = "http://chart.finance.yahoo.com/t?s=";
    urlyahoo = urlyahoo + symbol + "&lang=en-US&width=500&height=400";
    $("#tp").attr("src",urlyahoo);
    $("#current").tab("show");

}

function deleter(tid) {
    var str1 = "#" + tid.id;
    var obj3 = [];
    $(str1).remove();
    if (localStorage && localStorage.getItem("favrs")) {
        //console.log(localStorage.getItem("favrs"));
        obj3 = JSON.parse(localStorage.getItem("favrs"));
        var l = obj3.indexOf(tid);
        obj3.splice(l, 1);
        localStorage.setItem("favrs", JSON.stringify(obj3));
    }
}

function getnewsfeed() {
    $.ajax({
        url: "index.php?news=" + symbol,
        type: "GET",
        success: function( data ) {
            table3 = JSON.parse(data);
            //console.log(table3[0]);
            //alert(table3[0]['Title']);
            var newwell ='';
            for (i = 0 ;i<table3.length;i++) {
                newwell += "<div class='well'><p><a href='"+ table3[i]['Url']+"' target='_blank'>"+table3[i]['Title']+"</a></p><p>"+table3[i]['Description']+"</p><p style='font-weight: bold'>Publisher: "+table3[i]['Source']+"</p><p style='font-weight: bold'>Date: "+table3[i]['Date']+"</p></div>";
            }
            $("#mynews").html(newwell);
        }
    });
}

function formatMODChartData(data) {
    var dates = data.Dates || [];
    var elements = data.Elements || [];
    var chartSeries = [];

    if (elements[0]){

        for (var i = 0, datLen = dates.length; i < datLen; i++) {
            var dat = formatMODChartDate( dates[i] );
            var pointData = [
                dat,
                elements[0].DataSeries['open'].values[i],
                elements[0].DataSeries['high'].values[i],
                elements[0].DataSeries['low'].values[i],
                elements[0].DataSeries['close'].values[i]
            ];
            chartSeries.push( pointData );
        };
    }
    return chartSeries;
}

function formatMODChartDate(dateIn) {
    var dat = new Date(dateIn);
    return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
}

function getchart(){
    $.getJSON('index.php?chart='+symbol, function (data) {
        var formattedData = formatMODChartData(data);
        // Create the chart
        $('#mychart').highcharts('StockChart', {
            rangeSelector : {
                selected : 0,
                //allButtonsEnabled: true,
                inputEnabled: false,
                buttons: [{
                    type: 'week',
                    count: 1,
                    text: '1w'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'ytd',
                    text: 'YTD'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }]
            },

            yAxis: {
                title: {
                    text: 'Stock Value'
                }
            },

            title : {
                text : symbol+ ' Stock Value'
            },

            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }
                }
            },

            series : [{
                name : symbol,
                data : formattedData,
                type : 'area',
                threshold : null,
                tooltip : {
                    valueDecimals : 2,
                    valuePrefix : '$'
                },
                fillColor : {
                    linearGradient : {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops : [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                }
            }]
        });
    });
}

function clearb() {
    $("#carousel-example-generic").carousel("prev");
    $("#sym1").val("");
    $("#next1").prop("disabled",true);
    $("#log").text("");
}

function slidenext() {
    getnewsfeed();
    getchart();
    $("#carousel-example-generic").carousel("next");
}


function refresh() {
    if (localStorage && localStorage.getItem("favrs")){
        var obj3 = [];
        obj3 = JSON.parse(localStorage.getItem("favrs"));
        console.log(obj3);
        //var newtable = "<tr><td>Symbol</td><td>Company Name</td><td>Stock Price</td><td>Change (Change Percent)</td><td>Market Cap</td><td>        </td> </tr>";
        var temp1 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/up.png\" alt=\"c\" width=\"20\" height=\"22\">";
        var temp2 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/down.png\" alt=\"d\" width=\"20\" height=\"22\">";
        var temp ="";
       /* for(j=0;j<obj3.length;j++) {
            t2 = obj3[j];
            //console.log(table2);
            newtable +=  "<tr id=\""+t2+"\"><td>";
            newtable += "<a onclick='getcarousel(" + t2 + ")'>" + t2 + "</a></td>";
            newtable += "<td id='"+t2+"_nm'></td>";
            newtable += "<td id='"+t2+"_lp'></td>";
            newtable += "<td id='"+t2+"_cp'></td>";
            newtable += "<td id='"+t2+"_mc'></td>";
            newtable += "<td><button class=\"btn btn-default\" onclick=\"deleter("+t2+")\"><span class=\"glyphicon glyphicon-trash\" ></span></button></td></tr>";
        }
        $("#table2").html(newtable);
        console.log(newtable);
*/
        for (i=0;i<obj3.length;i++) {
            $.ajax({
                url: "index.php?quote=" + obj3[i],
                type: "GET",
                success: function (data) {
                    var temp1 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/up.png\" alt=\"c\" width=\"20\" height=\"22\">";
                    var temp2 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/down.png\" alt=\"d\" width=\"20\" height=\"22\">";
                    var temp ="";
                    t3 = JSON.parse(data);
                    console.log(t3);
                    $("#"+t3['Symbol']+"_lp").html(t3['LastPrice']);
                    $("#"+t3['Symbol']+"_mc").html(t3['MarketCap']);
                    $("#"+t3['Symbol']+"_nm").html(t3['Name']);
                    if (t3["ChangePercent"] > 0){
                        $("#"+t3['Symbol']+"_cp").css("color",'green');
                        temp = temp1;
                    }
                    else if(t3["ChangePercent"] < 0){
                        $("#"+t3['Symbol']+"_cp").css("color",'red');
                        temp = temp2;
                    }
                    $("#"+t3['Symbol']+"_cp").html(t3['Change']+temp);
                }
            });
        }
    }

    }

setInterval(function() {
    if ($('input#check1').is(':checked')) {
        refresh();
    }
}, 5000);

/*
function refreshinit() {
    if (localStorage && localStorage.getItem("favrs")){
        var obj3 = [];
        obj3 = JSON.parse(localStorage.getItem("favrs"));
        console.log(obj3);
        var newtable = "<tr><td>Symbol</td><td>Company Name</td><td>Stock Price</td><td>Change (Change Percent)</td><td>Market Cap</td><td>        </td> </tr>";
        var temp1 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/up.png\" alt=\"c\" width=\"20\" height=\"22\">";
        var temp2 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/down.png\" alt=\"d\" width=\"20\" height=\"22\">";
        var temp ="";
        for(j=0;j<obj3.length;j++) {
            t2 = obj3[j];
            //console.log(table2);
            newtable +=  "<tr id=\""+t2+"\"><td>";
            newtable += "<a onclick='getcarousel(" + t2 + ")'>" + t2 + "</a></td>";
            newtable += "<td id='"+t2+"_nm'></td>";
            newtable += "<td id='"+t2+"_lp'></td>";
            newtable += "<td id='"+t2+"_cp'></td>";
            newtable += "<td id='"+t2+"_mc'></td>";
            newtable += "<td><button class=\"btn btn-default\" onclick=\"deleter("+t2+")\"><span class=\"glyphicon glyphicon-trash\" ></span></button></td></tr>";
        }
        $("#table2").html(newtable);
        console.log(newtable);

        for (i=0;i<obj3.length;i++) {
            $.ajax({
                url: "index.php?quote=" + obj3[i],
                type: "GET",
                success: function (data) {
                    var temp1 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/up.png\" alt=\"c\" width=\"20\" height=\"22\">";
                    var temp2 = "<img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/down.png\" alt=\"d\" width=\"20\" height=\"22\">";
                    var temp ="";
                    t3 = JSON.parse(data);
                    console.log(t3);
                    $("#"+t3['Symbol']+"_lp").html(t3['LastPrice']);
                    $("#"+t3['Symbol']+"_mc").html(t3['MarketCap']);
                    $("#"+t3['Symbol']+"_nm").html(t3['Name']);
                    if (t3["ChangePercent"] > 0){
                        $("#"+t3['Symbol']+"_cp").css("color",'green');
                        temp = temp1;
                    }
                    else if(t3["ChangePercent"] < 0){
                        $("#"+t3['Symbol']+"_cp").css("color",'red');
                        temp = temp2;
                    }
                    $("#"+t3['Symbol']+"_cp").html(t3['Change']+temp);
                }
            });
        }
    }
}
*/

function checkstar() {
    if (localStorage && localStorage.getItem("favrs")) {
        var obj3 = [];
        obj3 = JSON.parse(localStorage.getItem("favrs"));
        for (i = 0; i<obj3.length; i++) {
            if(symbol == obj3[i]) {
                if($("#star2").hasClass("white")) {
                    $("#star2").addClass("yellow");
                    $("#star2").removeClass("white");
                    break;
                }
                else if($("#star2").hasClass("yellow")){
                    break;
                }
            }
            else {
                $("#star1").addClass("white");
            }
        }
    }
}