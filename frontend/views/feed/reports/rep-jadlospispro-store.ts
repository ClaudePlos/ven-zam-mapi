import {makeAutoObservable} from "mobx";
import JadlospisDlaDietyNaDzienDTO
    from "Frontend/generated/pl/kskowronski/data/entity/mapi/reports/JadlospisDlaDietyNaDzienDTO";
import {JadlospisEndpoint} from "Frontend/generated/endpoints";
import {feedViewStore} from "Frontend/views/feed/feed-view-store";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable, { RowInput } from 'jspdf-autotable';
import JadlospisSkladnikiViewVO
    from "Frontend/generated/pl/kskowronski/data/entity/mapi/reports/JadlospisSkladnikiViewVO";
import {Notification} from "@vaadin/notification";


class RepJadlospisproStore {

    public dialogRepJadlospisPro: boolean = false;

    private listJadlospis: JadlospisSkladnikiViewVO[] = [];


    constructor() {
        makeAutoObservable(this);
    }

    async dialogRepJadlospisProChange(value: boolean) {
        this.dialogRepJadlospisPro = value;

        const asortWart = 'N';

        if (this.dialogRepJadlospisPro === true) {

            if (feedViewStore.selectedItem?.idDieta === undefined) {
                const notification = Notification.show("Brak wybranej diety !!!", {position: 'middle', duration: 1000});
                notification.setAttribute('theme', 'error');
            }

            const listJadlospis = await JadlospisEndpoint.getInfAboutJadlospisForDiet(feedViewStore.selectedItem?.idDieta, feedViewStore.startDate);
            this.listJadlospis = listJadlospis;

            var myTableDiv: HTMLTableElement = <HTMLTableElement>document.getElementById("jadlospisTable");
            myTableDiv.innerHTML = ""; //clear table

            //table head
            var table = document.createElement('TABLE');
            // @ts-ignore
            table.border = '0';

            var tableThead = document.createElement('thead');
            table.appendChild(tableThead);

            //console.log("if");
            //HEAD
            var trHead = document.createElement('TR');
            tableThead.appendChild(trHead);

            //00 lp
            var tdHead01 = document.createElement('TD');
            // @ts-ignore
            tdHead01.width = '80';
            tdHead01.setAttribute("style", "font-weight:bold");
            tdHead01.appendChild(document.createTextNode("LP"));
            trHead.appendChild(tdHead01);

            //02 cell
            var tdHead02 = document.createElement('TD');
            // @ts-ignore
            tdHead02.width = '100';
            tdHead02.setAttribute("style", "font-weight:bold");
            tdHead02.appendChild(document.createTextNode("Posilek Kod"));
            trHead.appendChild(tdHead02);

            //01 cell
            var tdHead01 = document.createElement('TD');
            // @ts-ignore
            tdHead01.width = '200';
            tdHead01.setAttribute("style", "font-weight:bold");
            tdHead01.appendChild(document.createTextNode("Danie / Alergeny"));
            trHead.appendChild(tdHead01);


            var tdHead = document.createElement('TD');
            // @ts-ignore
            tdHead.width = '80';
            tdHead.setAttribute("style", "font-weight:bold");
            tdHead.appendChild(document.createTextNode("Gramatura"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TD');
            // @ts-ignore
            tdHead.width = '150';
            tdHead.setAttribute("style", "font-weight:bold");
            tdHead.appendChild(document.createTextNode("jm Gramatura Dania"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TD');
            // @ts-ignore
            tdHead.width = '575';
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

                listJadlospis.sort(function (a, b) {
                    // @ts-ignore
                    if (a.lp < b.lp) {
                        return -1;
                    }
                    // @ts-ignore
                    if (a.lp > b.lp) {
                        return 1;
                    }
                    return 0;
                })


                var tr = document.createElement('TR');

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].lp));
                tr.appendChild(td);

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].posilekKod));
                tr.appendChild(td);

                var td = document.createElement('TD');
                if (listJadlospis[i].alergenyPozycjiJadlospisu != " ") {
                    td.innerHTML = "<b>" + listJadlospis[i].nazwaSkladnik + "</b>" + " " + listJadlospis[i].alergenyPozycjiJadlospisu;
                } else {
                    td.innerHTML = listJadlospis[i].nazwaSkladnik + " " + listJadlospis[i].alergenyPozycjiJadlospisu;
                }

                // @ts-ignore
                if (listJadlospis[i].listAsortymentyDania.length > 1) {
                    var a = document.createElement('A');
                    a.setAttribute("id", "Amore" + i);
                    a.setAttribute("onclick", "more(this)");
                    a.setAttribute("href", "#");
                    a.appendChild(document.createTextNode("Pokaż skład"));
                    td.appendChild(a);
                }
                tr.appendChild(td);


                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].gramatura));
                tr.appendChild(td);

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].jmGramaturaDania));
                tr.appendChild(td);

                var td = document.createElement('TD');
                var asortyment = '';
                var skladnik = '';
                var ilosc = '';
                var jmKod = '';
                var sklad = '';
                var alergeny = '';
                for (var j in listJadlospis[i].listAsortymentyDaniaSkladniki) {

                    // @ts-ignore
                    if (asortyment != listJadlospis[i].listAsortymentyDaniaSkladniki[j].asortyment) {
                        // @ts-ignore
                        asortyment = listJadlospis[i].listAsortymentyDaniaSkladniki[j].asortyment;

                        // @ts-ignore
                        skladnik = listJadlospis[i].listAsortymentyDaniaSkladniki[j].skladnik;
                        // @ts-ignore
                        ilosc = listJadlospis[i].listAsortymentyDaniaSkladniki[j].ilosc;
                        // @ts-ignore
                        jmKod = listJadlospis[i].listAsortymentyDaniaSkladniki[j].jmKod;

                        // @ts-ignore
                        if (ilosc === 0) {
                            ilosc = '';
                            jmKod = '';
                        }

                        // @ts-ignore
                        if (listJadlospis[i].listAsortymentyDaniaSkladniki[j].alergeny != " ") {
                            // @ts-ignore
                            alergeny = listJadlospis[i].listAsortymentyDaniaSkladniki[j].alergeny;
                            sklad += "<b>" + skladnik + "</b> " + ilosc + " " + jmKod + " " + alergeny + ", ";
                        } else {
                            sklad += skladnik + " " + ilosc + " " + jmKod + ", ";
                        }
                    } else {
                        // @ts-ignore
                        skladnik = listJadlospis[i].listAsortymentyDaniaSkladniki[j].skladnik;
                        // @ts-ignore
                        ilosc = listJadlospis[i].listAsortymentyDaniaSkladniki[j].ilosc;
                        // @ts-ignore
                        jmKod = listJadlospis[i].listAsortymentyDaniaSkladniki[j].jmKod;

                        // @ts-ignore
                        if (ilosc === 0) {
                            ilosc = '';
                            jmKod = '';
                        }

                        // @ts-ignore
                        if (listJadlospis[i].listAsortymentyDaniaSkladniki[j].alergeny != " ") {
                            // @ts-ignore
                            alergeny = listJadlospis[i].listAsortymentyDaniaSkladniki[j].alergeny;
                            sklad += "<b>" + skladnik + "</b> " + ilosc + " " + jmKod + " " + alergeny + ", ";
                        } else {
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

                // @ts-ignore
                if (listJadlospis[i].listAsortymentyDania.length > 1) {
//                    var tableBody = document.createElement('TBODY');
//                    table.appendChild(tableBody);
                    var tr1 = document.createElement('TR');
                    tr1.setAttribute("id", "more" + i);
                    tr1.setAttribute("style", "font-size: 12px; border-style:hidden; display: none");

                    var td1 = document.createElement('TD');
                    tr1.appendChild(td1);
                    var td1 = document.createElement('TD');
                    tr1.appendChild(td1);

                    var td1 = document.createElement('TD');

                    for (var j in listJadlospis[i].listAsortymentyDania) {

                        var tr = document.createElement('TR');

                        var td = document.createElement('TD');

                        // @ts-ignore
                        if (listJadlospis[i].listAsortymentyDania[j].alergeny != undefined)
                            // @ts-ignore
                            td.innerHTML = " <b>" + listJadlospis[i].listAsortymentyDania[j].asortyment + listJadlospis[i].listAsortymentyDania[j].alergeny + "</b>";
                        else
                            // @ts-ignore
                            td.innerHTML = listJadlospis[i].listAsortymentyDania[j].asortyment;
                        tr.appendChild(td);
                        ;

                        var td = document.createElement('TD');
                        if (asortWart != 'N')
                            // @ts-ignore
                            td.innerHTML = listJadlospis[i].listAsortymentyDania[j].iloscBrutto;
                        else
                            td.innerHTML = "";
                        tr.appendChild(td);

                        var td = document.createElement('TD');
                        if (asortWart != 'N')
                            // @ts-ignore
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

        }


    }

    async genPDF() {
        const readyToExport = this.listJadlospis;
        const doc = new jsPDF('l', 'mm', [297, 210])
        const cellName = ['LP', 'Posilek Kod', 'Danie / Alergeny','Gramatura','jm Gramatura Dania','Skladniki'];
        const cellRow: string[]  = [];
        const cellValues: []  = [];

        this.listJadlospis.forEach( item => {

            // @ts-ignore
            cellRow.push( item.lp as string )
            cellRow.push( item.posilekKod as string )
            cellRow.push( item.nazwaSkladnik + " " + item.alergenyPozycjiJadlospisu as string )
            cellRow.push( item.gramatura as string )
            cellRow.push( item.jmGramaturaDania as string )
            // @ts-ignore
            cellRow.push( "TODO")
            // @ts-ignore
            cellValues.push(cellRow)

        });


        autoTable(doc, { html: '#jadlospisTable' })

        autoTable(doc, {
            head: [cellName],
            body: cellValues,
        })
        doc.save('table.pdf')
    }
}


export const repJadlospisproStore = new RepJadlospisproStore();
