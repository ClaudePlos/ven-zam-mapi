import {makeAutoObservable} from "mobx";
import {WartoscOdzywczaEndpoint} from "Frontend/generated/endpoints";
import {feedViewStore} from "Frontend/views/feed/feed-view-store";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable, { RowInput } from 'jspdf-autotable';
import {Notification} from "@vaadin/notification";
import ColumnNameWskaznikiOdzywcze
    from "Frontend/generated/pl/kskowronski/data/entity/mapi/reports/ColumnNameWskaznikiOdzywcze";
import JadlospisViewVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/JadlospisViewVO";
import { repGlobal} from "./rep-global"



class RepWartodzywcze2Store {

    public dialogRepWartodzywcze2: boolean = false;

    private listCellName: ColumnNameWskaznikiOdzywcze[] = [];
    private listJadlospis: JadlospisViewVO[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async dialogRepWartOdzywczaChange(value: boolean) {
        this.dialogRepWartodzywcze2 = value;

        const asortWart = 'N';

        if (this.dialogRepWartodzywcze2 === true) {

            if (feedViewStore.selectedItem?.idDieta === undefined) {
                const notification = Notification.show("Brak wybranej diety !!!", {position: 'middle', duration: 1000});
                notification.setAttribute('theme', 'error');
            }

            const listCellName = await WartoscOdzywczaEndpoint.getJadlospisColumnNames();
            this.listCellName = listCellName;

            const listJadlospis = await WartoscOdzywczaEndpoint.getJadlospis(feedViewStore.selectedItem?.idDieta, feedViewStore.startDate);
            this.listJadlospis = listJadlospis;

            var myTableDiv: HTMLTableElement = <HTMLTableElement> document.getElementById("wartodzywcze2Table");
            myTableDiv.innerHTML = ""; //clear table


            //table head
            const table = <HTMLTableElement> document.createElement('TABLE');
            table.setAttribute("id","myViewTable");

            var tableThead = document.createElement('thead');
            table.appendChild(tableThead);

            //HEAD
            var trHead = document.createElement('TR');
            tableThead.appendChild(trHead);
            //01 cell
            var tdHead01 = <HTMLTableElement> document.createElement('TD');
            tdHead01.setAttribute("style", "font-weight:bold;");
            tdHead01.appendChild(document.createTextNode("Dieta Kod"));
            trHead.appendChild(tdHead01);
            //02 cell
            var tdHead02 = <HTMLTableElement> document.createElement('TD');
            tdHead02.width = '175';
            tdHead02.setAttribute("style", "font-weight:bold;");
            tdHead02.appendChild(document.createTextNode("Dieta Nazwa"));
            trHead.appendChild(tdHead02);
            //03 cell
            var tdHead = <HTMLTableElement> document.createElement('TD');
            tdHead.width = '175';
            tdHead.setAttribute("style", "font-weight:bold");
            tdHead.appendChild(document.createTextNode("Data"));
            trHead.appendChild(tdHead);

            tableThead.appendChild(trHead);

            for (var i in listCellName){

                var tdHead = <HTMLTableElement> document.createElement('TD');
                tdHead.width = '175';
                tdHead.setAttribute("style", "font-weight:bold");
                tdHead.setAttribute("id","w" + i)
                tdHead.appendChild(document.createTextNode(listCellName[i].columnName + "[" + listCellName[i].columnJmKod + "]"));
                trHead.appendChild(tdHead);

                tableThead.appendChild(trHead);
            }

            myTableDiv.appendChild(table);




            var tableBody = document.createElement('TBODY');

            for (var i in listJadlospis) {

                var tr = document.createElement('TR');

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].dietaKod));
                //td.setAttribute("style", "width: 4000px");
                tr.appendChild(td);

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].dietaNazwa));
                tr.appendChild(td);

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode( listJadlospis[i].dObr ));
                tr.appendChild(td);

                if(document.getElementById('w0')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w1.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w1')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w2.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w2')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w3.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w3')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w4.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w4')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w5.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w5')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w6.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w6')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w7.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w7')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w8.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w8')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w9.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w9')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w10.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w10')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w11.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w11')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w12.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w12')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w13.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w13')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w14.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w14')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w15.toFixed(1)));
                    tr.appendChild(td);
                }

                if(document.getElementById('w15')){
                    var td = document.createElement('TD');
                    // @ts-ignore
                    td.appendChild(document.createTextNode(listJadlospis[i].w16.toFixed(1)));
                    tr.appendChild(td);
                }

                tableBody.appendChild(tr);
            }

            table.appendChild(tableBody);


        }

    }

    async converHTMLFileToPDF() {

        var doc = new jsPDF('l', 'pt', 'a4');
        doc.setFontSize(9);

        // doc.addFileToVFS("Amiri-Regular.ttf", amiriFont);
        // doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
        // doc.setFont("Amiri");



        var pdfjs = document.querySelector('#wartodzywcze2Table');

        // Convert HTML to PDF in JavaScript
        // @ts-ignore
        doc.html(pdfjs, {
            callback: function(doc) {
                doc.save("output.pdf");
            },
            x: 10,
            y: 10
        });
    }



    async genPDF() {

        const doc = new jsPDF('l', 'mm', [397, 210])

        doc.setLanguage('pl')

        const cellName: string[] = ['Dieta Kod', 'Dieta Nazwa', 'Data'];
        const cellValues: []  = [];

        this.listCellName.forEach(  item => {
            cellName.push(  repGlobal.convertPLtoUStxt( item.columnName as string) )
        });

        this.listJadlospis.forEach( item => {
            const cellRow: string[]  = [];
            cellRow.push( repGlobal.convertPLtoUStxt(item.dietaKod as string) )
            cellRow.push( repGlobal.convertPLtoUStxt(item.dietaNazwa as string) )
            cellRow.push( repGlobal.convertPLtoUStxt(item.dObr as string) )
            // @ts-ignore
            cellRow.push( item.w1 )
            // @ts-ignore
            cellRow.push( item.w2 )
            // @ts-ignore
            cellRow.push( item.w3 )
            // @ts-ignore
            cellRow.push( item.w4 )
            // @ts-ignore
            cellRow.push( item.w5 )
            // @ts-ignore
            cellRow.push( item.w6 )
            // @ts-ignore
            cellRow.push( item.w7 )
            // @ts-ignore
            cellRow.push( item.w8 )
            // @ts-ignore
            cellRow.push( item.w9 )
            // @ts-ignore
            cellRow.push( item.w10 )
            // @ts-ignore
            cellRow.push( item.w11 )
            // @ts-ignore
            cellRow.push( item.w12 )
            // @ts-ignore
            cellRow.push( item.w13 )
            // @ts-ignore
            cellRow.push( item.w14 )
            // @ts-ignore
            cellRow.push( item.w15 )
            // @ts-ignore
            cellRow.push( item.w16 )

            // @ts-ignore
            cellValues.push(cellRow)
        });

        console.log(cellValues)

        autoTable(doc, { html: '#jadlospisTable' })

        autoTable(doc, {
            head: [cellName],
            body: cellValues,
        })




        var font = doc.getFont();
        doc.save('wart_odzywcze.pdf')
    }


}




export const repWartodzywcze2Store = new RepWartodzywcze2Store();
