<?php
/**
 * Created by PhpStorm.
 * User: Akshay
 * Date: 30-03-2016
 * Time: 07:45 PM
 */
if (isset($_GET["lookup"])) {
    $symbol = (isset($_GET["lookup"]) ? $_GET["lookup"] : null);
    $url = "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=" . urlencode($symbol);
    $json = file_get_contents($url);
    $data = json_decode($json,true);
    $companies = [];
    foreach ($data as $company) {
        $companies[] = $company['Symbol'] ." - ". $company["Name"] . " (" . $company["Exchange"] . ")";
    }
    echo json_encode($companies);
}

if (isset($_GET["quote"])) {
    $symbol1 = (isset($_GET["quote"]) ? $_GET["quote"] : null);
    $url1 = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" . urlencode($symbol1);
    $json1 = file_get_contents($url1);
    $data1 = json_decode($json1,true);
    $quotes = [];
    if ($data1['Status'] == "SUCCESS") {
        $data1['Name'] = $data1['Name'];
        $data1["Symbol"] = $data1["Symbol"];
        $data1["LastPrice"] = "$ ". round($data1["LastPrice"],2);
      /*  if($data1["ChangePercent"] > 0){
            $quotes[] = "1";}
        elseif($data1["ChangePercent"] < 0){
            $quotes[] = "-1";}
        else {
            $quotes  = "0";}*/
        $data1["Change"] = round($data1["Change"],2) ." (". round($data1["ChangePercent"],2) . " %)";
        $data1["ChangePercent"] = round($data1["ChangePercent"],2);
        date_default_timezone_set('America/Los_Angeles');
        $date1 = new DateTime($data1["Timestamp"]);
        $date1->setTimezone(new DateTimeZone('America/Los_Angeles'));
        $data1["Timestamp"] = $date1->format(("d F Y, h:i:s a"));

        $var2 = $data1["MarketCap"];
        if ($var2 > 1000000000) {
            $var2 = round($var2/1000000000,2);
            $data1["MarketCap"] = (string)$var2 . " Billion";
        }
        else if($var2 > 1000000 ) {
            $var2 = round($var2/1000000,2);
            $data1["MarketCap"]= (string)$var2 . " Million";

        }
        else {
            $data1["MarketCap"] = round($var2,2);
        }
        $data1["Volume"] = $data1["Volume"];
/*        if($data1["ChangePercentYTD"] > 0){
            $quotes[] = "1";}
        elseif($data1["ChangePercentYTD"] < 0){
            $quotes[] = "-1";}
        else {
            $quotes  = "0";}*/
        $data1["ChangeYTD"] = round($data1["ChangeYTD"],2) ." (". round($data1["ChangePercentYTD"],2) . " %)";
        $data1["ChangePercentYTD"] = round($data1["ChangePercentYTD"],2);
        $data1["High"] = "$ ". round($data1["High"],2);
        $data1["Low"] = "$ ". round($data1["Low"],2);
        $data1["Open"] = "$ ". round($data1["Open"],2);
        echo json_encode($data1);
    }
	else{
		$data1['Name'] = "Data Not Found";
		echo json_encode($data1);
	}
}

if (isset($_GET['news'])){
//    https://api.datamarket.azure.com/Bing/Search/v1/News?Query=%27AAPL%27&$format=json
    $symbol2 = (isset($_GET["news"]) ? $_GET["news"] : null);
    $url2 = "https://api.datamarket.azure.com/Bing/Search/v1/News?Query=%27" .urlencode($symbol2). '%27&$format=json' ;
    $accountKey = "e/rkI4kmnN4HRWu8q0j5e5juRvRn166B/Yd2lAkHhOM";
    $context = stream_context_create(array(
        'http' => array(
            'request_fulluri' => true,
            'header'  => "Authorization: Basic " . base64_encode(($accountKey) . ":" . ($accountKey))
        )
    ));

    $response = file_get_contents($url2, 0, $context);

    $jsonobj = json_decode($response,true);

    $newsfeed=[];
    foreach ($jsonobj['d']['results']  as $feed){
        $feed1['Title']=$feed['Title'];
        $feed1['Url']=$feed['Url'];
        $feed1['Source']=$feed['Source'];
        $feed1['Description']=$feed['Description'];
        $date2 = new DateTime($feed["Date"]);
        $date2->setTimezone(new DateTimeZone('America/Los_Angeles'));
        $feed1["Date"] = $date2->format(("d M Y H:i:s"));

        $newsfeed[] = $feed1;
    }
    echo json_encode($newsfeed);

}

if (isset($_GET['chart'])) {
    $symbol3 = (isset($_GET["chart"]) ? $_GET["chart"] : null);
    $url3 = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7b%22Normalized%22:false,%22NumberOfDays%22:1095,%22DataPeriod%22:%22Day%22,%22Elements%22:%5b%7b%22Symbol%22:%22". $symbol3 ."%22,%22Type%22:%22price%22,%22Params%22:%5b%22ohlc%22%5d%7d%5d%7d";
    $json3 = file_get_contents($url3);
    $data3 = json_decode($json3,true);
    echo json_encode($data3);
}

if (isset($_GET["quote1"])) {
	$symbol4 = (isset($_GET["quote1"]) ? $_GET["quote1"] : null);
	$url4 = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" . urlencode($symbol4);
	$json4 = file_get_contents($url4);
	$data4 = json_decode($json4,true);
	$flags = [];
	if(array_key_exists("Message",$data4)) {
		$flags[] = 0;
	}
	else {
		$flags[] = 1;
	}
	echo json_encode($flags);
}
?>



