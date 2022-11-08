var parameters = {};
var asortWart;

var paramPermision = {};
var permision = {};

function load(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var gzId = url.searchParams.get("gzId");
    var dietId = url.searchParams.get("dietId");
    var dietName = url.searchParams.get("dietName");
    var forDay = url.searchParams.get("forDay");
    var asortWart = url.searchParams.get("asortWart");
    var kkId = url.searchParams.get("kkId");
    var wersjaRaportu = url.searchParams.get("wersjaRaportu");
    //console.log(gzId + " " + dietId  + " " + forDay);

    parameters.dietId = dietId;
    parameters.dietName = dietName;
    parameters.forDay = forDay;

    document.getElementById("labInfo").innerHTML = "Jadlospis dla: "

        + "Dieta: <b>" + url.searchParams.get("dietName") + "</b>, "
        + "Data: <b>" +  forDay
        + "<p><small>[*Druk: prawy przycisk myszy > Drukuj, lub Ctr+P]</small></b>";

    if( wersjaRaportu === "ksiegaReceptur" || wersjaRaportu === undefined) {

        console.log("wersja raportu - ksiegaReceptur");

        paramPermision.kkId = kkId;
        paramPermision.permName = "wariantyWKsiegaReceptur";

        permision.wariant = "-";

        getParameterForPermission(paramPermision, function(error, lParam){
            //console.log(lParam);

            permision.wariant = lParam;

        });
        generateDisabilityForWorkersOnSk(parameters);

    }
    else if(wersjaRaportu === "jadlospisDlaDiety") {
        console.log("wersja raportu - jadlospisDlaDiety");



        getJadlospisDlaDietyNaDzien(parameters, function(error, listJadlospis) {
            console.log("tttesst");


            var myTableDiv = document.getElementById("divJadlospisTable");
            myTableDiv.innerHTML = ""; //clear table


            //table head
            var table = document.createElement('TABLE');
            table.border = '0';

            var tableThead = document.createElement('thead');
            table.appendChild(tableThead);

            var trHead = document.createElement('TR');
            tableThead.appendChild(trHead);


            var tdHead = document.createElement('TH');
            tdHead.width = '30';
            tdHead.setAttribute("style", "font-weight:bold;vertical-align:middle;text-align:center");
            tdHead.setAttribute("rowspan", "2");
            tdHead.appendChild(document.createTextNode("LP"));
            trHead.appendChild(tdHead);


            var tdHead = document.createElement('TH');
            tdHead.width = '100';
            tdHead.setAttribute("style", "font-weight:bold;vertical-align:middle;text-align:center");
            tdHead.setAttribute("rowspan", "2");
            tdHead.appendChild(document.createTextNode("Posilek"));
            trHead.appendChild(tdHead);


            var tdHead = document.createElement('TH');
            tdHead.width = '150';
            tdHead.setAttribute("style", "font-weight:bold;vertical-align:middle;text-align:center");
            tdHead.setAttribute("rowspan", "2");
            tdHead.appendChild(document.createTextNode("Danie / Asortyment"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TH');
            tdHead.width = '200';
            tdHead.setAttribute("style", "font-weight:bold;text-align:center");
            tdHead.setAttribute("colspan", "2");
            tdHead.appendChild(document.createTextNode("Gramatura dania"));
            trHead.appendChild(tdHead);


            var tdHead = document.createElement('TH');
            tdHead.width = '300';
            tdHead.setAttribute("style", "font-weight:bold;text-align:center");
            tdHead.setAttribute("colspan", "4");
            tdHead.appendChild(document.createTextNode("Składniki odżywcze"));
            trHead.appendChild(tdHead);

            var trHead = document.createElement('TR');
            tableThead.appendChild(trHead);


            var tdHead = document.createElement('TH');
            tdHead.width = '50';
            tdHead.setAttribute("style", "font-weight:bold;");
            tdHead.appendChild(document.createTextNode("Gramatura"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TH');
            tdHead.width = '20';
            tdHead.setAttribute("style", "font-weight:bold;");
            tdHead.appendChild(document.createTextNode("Jm"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TH');
            tdHead.width = '80';
            tdHead.setAttribute("style", "font-weight:bold;");
            tdHead.appendChild(document.createTextNode("Wartość energetyczna wg rozp. 1169/2011[kcal]"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TH');
            tdHead.width = '80';
            tdHead.setAttribute("style", "font-weight:bold;");
            tdHead.appendChild(document.createTextNode("Białko ogółem wg rozp. 1169/2011 [g]"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TH');
            tdHead.width = '80';
            tdHead.setAttribute("style", "font-weight:bold;");
            tdHead.appendChild(document.createTextNode("Tłuszcz [g]"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TH');
            tdHead.width = '80';
            tdHead.setAttribute("style", "font-weight:bold;");
            tdHead.appendChild(document.createTextNode("Węglowodany ogółem [g]"));
            trHead.appendChild(tdHead);

            var trHead = document.createElement('TR');
            tableThead.appendChild(trHead);


            var tdHead = document.createElement('TH');
            tdHead.width = '100';
            tdHead.setAttribute("style", "font-weight:bold;text-align:center");
            tdHead.setAttribute("colspan", "9");



            var tableBody = document.createElement('TBODY');
            table.appendChild(tableBody);


            var tr = document.createElement('TR');

            var td = document.createElement('TD');

            var iGramatura =0;
            var iW1 = 0;
            var iW2 = 0;
            var iW3 = 0;
            var iW4 = 0;

            for (i in listJadlospis) {


                var tr = document.createElement('TR');

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].lp));
                tr.appendChild(td);

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].posilek));
                tr.appendChild(td);

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].danieAsortyment));
                tr.appendChild(td);

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].gramatura));
                tr.appendChild(td);
                iGramatura +=listJadlospis[i].gramatura;

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].jm));
                tr.appendChild(td);


                var td = document.createElement('TD');
                td.appendChild(document.createTextNode( listJadlospis[i].w1.toFixed(1)));
                tr.appendChild(td);
                iW1 += listJadlospis[i].w1;

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].w2.toFixed(1)));
                tr.appendChild(td);
                iW2 += listJadlospis[i].w2;

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].w3.toFixed(1)));
                tr.appendChild(td);
                iW3 += listJadlospis[i].w3;

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].w4.toFixed(1)));
                tr.appendChild(td);
                iW4 += listJadlospis[i].w4;

                tableBody.appendChild(tr);


            }

            //RAZEM PODSUMOWANIE
            var tr = document.createElement('TR');

            var td = document.createElement('TD');
            td.setAttribute("colSpan", "3");
            td.setAttribute("style", "font-weight:bold");
            td.appendChild(document.createTextNode("Razem: "));
            tr.appendChild(td);

            var td = document.createElement('TD');
            td.setAttribute("colSpan", "2");
            td.setAttribute("style", "font-weight:bold");
            td.appendChild(document.createTextNode(iGramatura));
            tr.appendChild(td);

            var td = document.createElement('TD');
            td.setAttribute("style", "font-weight:bold");
            td.appendChild(document.createTextNode(iW1.toFixed(1)));
            tr.appendChild(td);

            var td = document.createElement('TD');
            td.setAttribute("style", "font-weight:bold");
            td.appendChild(document.createTextNode(iW2.toFixed(1)));
            tr.appendChild(td);

            var td = document.createElement('TD');
            td.setAttribute("style", "font-weight:bold");
            td.appendChild(document.createTextNode(iW3.toFixed(1)));
            tr.appendChild(td);

            var td = document.createElement('TD');
            td.setAttribute("style", "font-weight:bold");
            td.appendChild(document.createTextNode(iW4.toFixed(1)));
            tr.appendChild(td);


            tableBody.appendChild(tr);

            myTableDiv.appendChild(table);
        });

    }

}

function getParameterForPermission(parameters, callback){
    var url = mainUrl + '/webresources/mapiServiceRest/getParameterForPermission';

    var xhr = createCORSRequest('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json");
    //xhr.setRequestHeader("Authorization", "Basic a2xhdWRpdXN6LnNrb3dyb25za2k6Y0BtZWxocDEx");
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        var data = JSON.parse(text);
        callback(null, data);
    };


    xhr.onerror = function() {
        alert('Woops, cant get data.');
    };
    //console.log(parameters);

    xhr.send(JSON.stringify(parameters));

}

function getAlergeny(parameters, callback){
    var url = mainUrl + '/webresources/mapiServiceRest/getAlergeny';

    var xhr = createCORSRequest('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json");
    //xhr.setRequestHeader("Authorization", "Basic a2xhdWRpdXN6LnNrb3dyb25za2k6Y0BtZWxocDEx");
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        var data = JSON.parse(text);
        //console.log(data);
        callback(null, data);
    };

    xhr.onerror = function() {
        alert('Woops, cant get data.');
    };
    //console.log(parameters);
    xhr.send(JSON.stringify(parameters));
}

// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

function getJadlospisDlaDietyNaDzien(parameters, callback){
    var url = mainUrl + '/webresources/mapiServiceRest/getJadlospisDlaDietyNaDzien';

    var xhr = createCORSRequest('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json");
    //xhr.setRequestHeader("Authorization", "Basic a2xhdWRpdXN6LnNrb3dyb25za2k6Y0BtZWxocDEx");
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        //$("#").fadeOut();
        var text = xhr.responseText;
        var data = JSON.parse(text);
        callback(null, data);
    }

    xhr.onerror = function() {
        //$("#").fadeOut();
        alert('Woops, cant get limit Holiday days for works.');
    };
    //console.log(parameters);
    xhr.send(JSON.stringify(parameters));

}


function getInfAboutJadlospisForDiet(parameters, callback){
    var url = mainUrl + '/webresources/mapiServiceRest/getInfAboutJadlospisForDiet'; //TODO

    var xhr = createCORSRequest('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json");
    //xhr.setRequestHeader("Authorization", "Basic a2xhdWRpdXN6LnNrb3dyb25za2k6Y0BtZWxocDEx");
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        //$("#").fadeOut();
        var text = xhr.responseText;
        var data = JSON.parse(text);
        callback(null, data);
    }

    xhr.onerror = function() {
        //$("#").fadeOut();
        alert('Woops, cant get limit Holiday days for works.');
    };
    //console.log(parameters);
    xhr.send(JSON.stringify(parameters));
}



function generateDisabilityForWorkersOnSk(parameters){

    console.log(permision.wariant);
    getInfAboutJadlospisForDiet(parameters, function(error, listJadlospis){
        console.log(listJadlospis);

        var myTableDiv = document.getElementById("divJadlospisTable");
        myTableDiv.innerHTML = ""; //clear table

        //table head
        var table = document.createElement('TABLE');
        table.border = '0';

        var tableThead = document.createElement('thead');
        table.appendChild(tableThead);

        if(permision.wariant == "idWar01"){
            //console.log("if");
            //HEAD
            var trHead = document.createElement('TR');
            tableThead.appendChild(trHead);

            //00 lp
            var tdHead01 = document.createElement('TD');
            tdHead01.width = '80';
            tdHead01.setAttribute("style", "font-weight:bold");
            tdHead01.appendChild(document.createTextNode("LP"));
            trHead.appendChild(tdHead01);

            //02 cell
            var tdHead02 = document.createElement('TD');
            tdHead02.width = '100';
            tdHead02.setAttribute("style", "font-weight:bold");
            tdHead02.appendChild(document.createTextNode("Posilek Kod"));
            trHead.appendChild(tdHead02);

            //01 cell
            var tdHead01 = document.createElement('TD');
            tdHead01.width = '200';
            tdHead01.setAttribute("style", "font-weight:bold");
            tdHead01.appendChild(document.createTextNode("Danie / Alergeny"));
            trHead.appendChild(tdHead01);

            //03 cell
//            var tdHead = document.createElement('TD');
//                    tdHead.width = '175';
//                    tdHead.setAttribute("style", "font-weight:bold");
//                    tdHead.appendChild(document.createTextNode("Rodzaj"));
//                    trHead.appendChild(tdHead);

            //04 cell
//            var tdHead = document.createElement('TD');
//                    tdHead.width = '175';
//                    tdHead.setAttribute("style", "font-weight:bold");
//                    tdHead.appendChild(document.createTextNode("Ilość"));
//                    trHead.appendChild(tdHead);

            var tdHead = document.createElement('TD');
            tdHead.width = '80';
            tdHead.setAttribute("style", "font-weight:bold");
            tdHead.appendChild(document.createTextNode("Gramatura"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TD');
            tdHead.width = '150';
            tdHead.setAttribute("style", "font-weight:bold");
            tdHead.appendChild(document.createTextNode("jm Gramatura Dania"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TD');
            tdHead.width = '175';
            tdHead.setAttribute("style", "font-weight:bold");
            tdHead.appendChild(document.createTextNode("Składniki"));
            trHead.appendChild(tdHead);

//            var tdHead = document.createElement('TD');
//                    tdHead.width = '175';
//                    tdHead.setAttribute("style", "font-weight:bold");
//                    tdHead.appendChild(document.createTextNode("jm Kod"));
//                    trHead.appendChild(tdHead);

            var tableBody = document.createElement('TBODY');
            table.appendChild(tableBody);
            for (var i in listJadlospis) {

                listJadlospis.sort(function(a, b){
                    if(a.lp < b.lp) { return -1; }
                    if(a.lp > b.lp) { return 1; }
                    return 0;
                })


                var tr = document.createElement('TR');

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].lp));
                tr.appendChild(td);

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].posilekKod));
                tr.appendChild(td);

                var td = document.createElement('TD');
                if( listJadlospis[i].alergenyPozycjiJadlospisu != " "){
                    td.innerHTML = "<b>" + listJadlospis[i].nazwaSkladnik + "</b>" + " " + listJadlospis[i].alergenyPozycjiJadlospisu;
                }else{
                    td.innerHTML = listJadlospis[i].nazwaSkladnik + " " + listJadlospis[i].alergenyPozycjiJadlospisu;
                }
                if ( listJadlospis[i].listAsortymentyDania.length > 1 ){
                    var a = document.createElement('A');
                    a.setAttribute("id","Amore" + i);
                    a.setAttribute("onclick","more(this)");
                    a.setAttribute("href","#");
                    a.appendChild(document.createTextNode("Pokaż skład"));
                    td.appendChild(a);
                }
                tr.appendChild(td);



                //          var td = document.createElement('TD');
                //              td.appendChild(document.createTextNode(listJadlospis[i].rodzaj));
                //          tr.appendChild(td);

                //          var td = document.createElement('TD');
                //              td.appendChild(document.createTextNode(listJadlospis[i].ilosc));
                //          tr.appendChild(td);

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].gramatura));
                tr.appendChild(td);

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].jmGramaturaDania));
                tr.appendChild(td);

                var td = document.createElement('TD');
                var asortyment = '';
                var skladnik = '';
                var ilosc = '';
                var jmKod = '';
                var sklad = '';
                var alergeny = '';
                for(var j in listJadlospis[i].listAsortymentyDaniaSkladniki){

                    if(asortyment != listJadlospis[i].listAsortymentyDaniaSkladniki[j].asortyment ){
                        asortyment = listJadlospis[i].listAsortymentyDaniaSkladniki[j].asortyment;

                        skladnik = listJadlospis[i].listAsortymentyDaniaSkladniki[j].skladnik;
                        ilosc = listJadlospis[i].listAsortymentyDaniaSkladniki[j].ilosc;
                        jmKod = listJadlospis[i].listAsortymentyDaniaSkladniki[j].jmKod;

                        if (ilosc == 0){
                            ilosc = '';
                            jmKod = '';
                        }

                        if (listJadlospis[i].listAsortymentyDaniaSkladniki[j].alergeny != " "){
                            alergeny = listJadlospis[i].listAsortymentyDaniaSkladniki[j].alergeny;
                            sklad += "<b>" + skladnik + "</b> " + ilosc + " " + jmKod + " " + alergeny +", ";
                        }else{
                            sklad += skladnik + " " + ilosc + " " + jmKod + ", ";
                        }
                    }else{
                        skladnik = listJadlospis[i].listAsortymentyDaniaSkladniki[j].skladnik;
                        ilosc = listJadlospis[i].listAsortymentyDaniaSkladniki[j].ilosc;
                        jmKod = listJadlospis[i].listAsortymentyDaniaSkladniki[j].jmKod;

                        if (ilosc == 0){
                            ilosc = '';
                            jmKod = '';
                        }

                        if (listJadlospis[i].listAsortymentyDaniaSkladniki[j].alergeny != " "){
                            alergeny = listJadlospis[i].listAsortymentyDaniaSkladniki[j].alergeny;
                            sklad += "<b>" + skladnik + "</b> " + ilosc + " " + jmKod + " " + alergeny +", ";
                        }else{
                            sklad += skladnik + " " + ilosc + " " + jmKod + ", ";
                        }
                    }
                }
                td.innerHTML = sklad;
                tr.appendChild(td);

//                var td = document.createElement('TD');
//                    td.appendChild(document.createTextNode(listJadlospis[i].jmKod));
//                tr.appendChild(td);

                tableBody.appendChild(tr);

                if ( listJadlospis[i].listAsortymentyDania.length > 1 ){
//                    var tableBody = document.createElement('TBODY');
//                    table.appendChild(tableBody);
                    var tr1 = document.createElement('TR');
                    tr1.setAttribute("id","more" + i);
                    tr1.setAttribute("style", "font-size: 12px; border-style:hidden; display: none");

                    var td1 = document.createElement('TD');
                    tr1.appendChild(td1);
                    var td1 = document.createElement('TD');
                    tr1.appendChild(td1);

                    var td1 = document.createElement('TD');

                    for (var j in listJadlospis[i].listAsortymentyDania) {

                        var tr = document.createElement('TR');

                        var td = document.createElement('TD');

                        if ( listJadlospis[i].listAsortymentyDania[j].alergeny != undefined )
                            td.innerHTML = " <b>" + listJadlospis[i].listAsortymentyDania[j].asortyment + listJadlospis[i].listAsortymentyDania[j].alergeny + "</b>";
                        else
                            td.innerHTML = listJadlospis[i].listAsortymentyDania[j].asortyment;
                        tr.appendChild(td);;

                        var td = document.createElement('TD');
                        if ( asortWart != 'N')
                            td.innerHTML = listJadlospis[i].listAsortymentyDania[j].iloscBrutto;
                        else
                            td.innerHTML = "";
                        tr.appendChild(td);

                        var td = document.createElement('TD');
                        if ( asortWart != 'N')
                            td.innerHTML = listJadlospis[i].listAsortymentyDania[j].jmKod;
                        else
                            td.innerHTML = "";
                        tr.appendChild(td);
                        td1.appendChild(tr)
                        tr1.appendChild(td1);
                    }
                    tableBody.appendChild(tr1);
                }
            }
            myTableDiv.appendChild(table);

        }else if(permision.wariant == "idWar02" || permision.wariant == "-"){
            //console.log("else if");
            var trHead = document.createElement('TR');
            tableThead.appendChild(trHead);

            //00 lp
            var tdHead01 = document.createElement('TD');
            tdHead01.width = '80';
            tdHead01.setAttribute("style", "font-weight:bold");
            tdHead01.appendChild(document.createTextNode("LP"));
            trHead.appendChild(tdHead01);

            //02 cell
            var tdHead02 = document.createElement('TD');
            tdHead02.width = '100';
            tdHead02.setAttribute("style", "font-weight:bold");
            tdHead02.appendChild(document.createTextNode("Posilek Kod"));
            trHead.appendChild(tdHead02);

            //01 cell
            var tdHead01 = document.createElement('TD');
            tdHead01.width = '200';
            tdHead01.setAttribute("style", "font-weight:bold");
            tdHead01.appendChild(document.createTextNode("Danie / Alergeny"));
            trHead.appendChild(tdHead01);

            var tdHead = document.createElement('TD');
            tdHead.width = '80';
            tdHead.setAttribute("style", "font-weight:bold");
            tdHead.appendChild(document.createTextNode("Gramatura"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TD');
            tdHead.width = '150';
            tdHead.setAttribute("style", "font-weight:bold");
            tdHead.appendChild(document.createTextNode("jm Gramatura Dania"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TD');
            tdHead.width = '175';
            tdHead.setAttribute("style", "font-weight:bold");
            tdHead.appendChild(document.createTextNode("Składniki"));
            trHead.appendChild(tdHead);

            //	 //03 cell
//            var tdHead = document.createElement('TD');
//                tdHead.width = '175';
//                tdHead.setAttribute("style", "font-weight:bold");
//                tdHead.appendChild(document.createTextNode("Rodzaj"));
//                trHead.appendChild(tdHead);

            var tableBody = document.createElement('TBODY');
            table.appendChild(tableBody);
            for (var i in listJadlospis) {

                listJadlospis.sort(function(a, b){
                    if(a.lp < b.lp) { return -1; }
                    if(a.lp > b.lp) { return 1; }
                    return 0;
                })


                var tr = document.createElement('TR');

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].lp));
                tr.appendChild(td);

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].posilekKod));
                tr.appendChild(td);

                var td = document.createElement('TD');
                if( listJadlospis[i].alergenyPozycjiJadlospisu != " "){
                    td.innerHTML = "<b>" + listJadlospis[i].nazwaSkladnik + "</b>" + " " + listJadlospis[i].alergenyPozycjiJadlospisu;
                }else{
                    td.innerHTML = listJadlospis[i].nazwaSkladnik + " " + listJadlospis[i].alergenyPozycjiJadlospisu;
                }
                if ( listJadlospis[i].listAsortymentyDania.length > 1 ){
                    var a = document.createElement('A');
                    a.setAttribute("id","Amore" + i);
                    a.setAttribute("onclick","more(this)");
                    a.setAttribute("href","#");
                    a.appendChild(document.createTextNode("Pokaż skład"));
                    td.appendChild(a);
                }
                tr.appendChild(td);

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].gramatura));
                tr.appendChild(td);

                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(listJadlospis[i].jmGramaturaDania));
                tr.appendChild(td);

                var td = document.createElement('TD');
                var asortyment = '';
                var skladnik = '';
                var ilosc = '';
                var jmKod = '';
                var sklad = '';
                var alergeny = '';
                for(var j in listJadlospis[i].listAsortymentyDaniaSkladniki){

                    if(asortyment != listJadlospis[i].listAsortymentyDaniaSkladniki[j].asortyment ){
                        asortyment = listJadlospis[i].listAsortymentyDaniaSkladniki[j].asortyment;

                        skladnik = listJadlospis[i].listAsortymentyDaniaSkladniki[j].skladnik;
                        ilosc = listJadlospis[i].listAsortymentyDaniaSkladniki[j].ilosc;
                        jmKod = listJadlospis[i].listAsortymentyDaniaSkladniki[j].jmKod;

                        if (ilosc == 0){
                            ilosc = '';
                            jmKod = '';
                        }

                        if (listJadlospis[i].listAsortymentyDaniaSkladniki[j].alergeny != " "){
                            alergeny = listJadlospis[i].listAsortymentyDaniaSkladniki[j].alergeny;
                            sklad += "<b>" + skladnik + "</b> " + ilosc + " " + jmKod + " " + alergeny +", ";
                        }else{
                            sklad += skladnik + " " + ilosc + " " + jmKod + ", ";
                        }

                    }else{
                        skladnik = listJadlospis[i].listAsortymentyDaniaSkladniki[j].skladnik;
                        ilosc = listJadlospis[i].listAsortymentyDaniaSkladniki[j].ilosc;
                        jmKod = listJadlospis[i].listAsortymentyDaniaSkladniki[j].jmKod;

                        if (ilosc == 0){
                            ilosc = '';
                            jmKod = '';
                        }

                        if (listJadlospis[i].listAsortymentyDaniaSkladniki[j].alergeny != " "){
                            alergeny = listJadlospis[i].listAsortymentyDaniaSkladniki[j].alergeny;
                            sklad += "<b>" + skladnik + "</b> " + ilosc + " " + jmKod + " " + alergeny +", ";
                        }else{
                            sklad += skladnik + " " + ilosc + " " + jmKod + ", ";
                        }
                    }
                }
                td.innerHTML = sklad;
                tr.appendChild(td);

                tableBody.appendChild(tr);

                if ( listJadlospis[i].listAsortymentyDania.length > 1 ){
//                    var tableBody = document.createElement('TBODY');
//                    table.appendChild(tableBody);
                    var tr1 = document.createElement('TR');
                    tr1.setAttribute("id","more" + i);
                    tr1.setAttribute("style", "font-size: 12px; border-style:hidden; display: none");

                    var td1 = document.createElement('TD');
                    tr1.appendChild(td1);
                    var td1 = document.createElement('TD');
                    tr1.appendChild(td1);

                    var td1 = document.createElement('TD');
                    for (var j in listJadlospis[i].listAsortymentyDania) {
                        var trWiersz = document.createElement('TR');

                        var tdDanie = document.createElement('TD');
                        tdHead.setAttribute("colspan", "4");
                        if ( listJadlospis[i].listAsortymentyDania[j].alergeny != undefined )
                            tdDanie.innerHTML = " <b>" + listJadlospis[i].listAsortymentyDania[j].asortyment + listJadlospis[i].listAsortymentyDania[j].alergeny + "</b>";
                        else
                            tdDanie.innerHTML = listJadlospis[i].listAsortymentyDania[j].asortyment;

                        trWiersz.appendChild(tdDanie);

                        var tdGramatura = document.createElement('TD');
                        tdGramatura.appendChild(document.createTextNode(''));
                        trWiersz.appendChild(tdGramatura);

                        var tdJmGramatura = document.createElement('TD');
                        tdJmGramatura.appendChild(document.createTextNode(''));
                        trWiersz.appendChild(tdJmGramatura);



                        td1.appendChild(trWiersz);
                    }
                    tr1.appendChild(td1);

                    tableBody.appendChild(tr1);
                }
            }
            myTableDiv.appendChild(table);
        }
    });

    getAlergeny(parameters, function(error, lAlergen){
        console.log(lAlergen);

        var alergeny = '';

        for(var i in lAlergen){
            alergeny += "<br>" + lAlergen[i].alergenKod + ": " + "<b>" + lAlergen[i].symbol + "</b>" + "\n";
        }

        var listaAlergeny = "<p><small><b>Alergeny:</b>" + alergeny + "</p>";

        document.getElementById("descAlergen").innerHTML = listaAlergeny;

    });




}

function more(items){

    var moreText = document.getElementById(items.id.substr(1));
    var a = document.getElementById(items.id);

    var zmienna = a.innerHTML;

    if (zmienna === "Ukryj") {
        console.log("if");
        a.innerHTML = "Pokaż skład";
        moreText.style.display = "none";
    } else {
        console.log("else");
        a.innerHTML = "Ukryj";
        moreText.style.display = "contents";
    }
}