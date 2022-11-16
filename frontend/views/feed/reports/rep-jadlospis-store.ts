import JadlospisViewVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/JadlospisViewVO";
import {JadlospisEndpoint} from "Frontend/generated/endpoints";
import {feedViewStore} from "Frontend/views/feed/feed-view-store";
import {makeAutoObservable} from "mobx";
import ColumnNameWskaznikiOdzywcze
    from "Frontend/generated/pl/kskowronski/data/entity/mapi/reports/ColumnNameWskaznikiOdzywcze";
import JadlospisDlaDietyNaDzienDTO
    from "Frontend/generated/pl/kskowronski/data/entity/mapi/reports/JadlospisDlaDietyNaDzienDTO";
import {Notification} from "@vaadin/notification";


class RepJadlospisStore {

    public dialogRep01: boolean = false;

    private listJadlospis: JadlospisDlaDietyNaDzienDTO[] = [];


    constructor() {
        makeAutoObservable(this);
    }

    async dialogRep01Change(value: boolean) {
        this.dialogRep01 = value;

        if (this.dialogRep01 === true) {

            if (feedViewStore.selectedItem?.idDieta === undefined) {
                const notification = Notification.show("Brak wybranej diety !!!", {position: 'middle', duration: 1000});
                notification.setAttribute('theme', 'error');
            }

            const listJadlospis = await JadlospisEndpoint.getJadlospisDlaDietyNaDzien(feedViewStore.selectedItem?.dietaNazwa, feedViewStore.startDate)
            this.listJadlospis = listJadlospis;

            var myTableDiv: HTMLTableElement = <HTMLTableElement>document.getElementById("jadlospisTable");
            myTableDiv.innerHTML = ""; //clear table


            //table head
            var table = document.createElement('TABLE');


            var tableThead = document.createElement('thead');
            table.appendChild(tableThead);

            var trHead = document.createElement('TR');
            tableThead.appendChild(trHead);


            var tdHead = document.createElement('TH');
            // @ts-ignore
            tdHead.width = '30';
            tdHead.setAttribute("style", "font-weight:bold;vertical-align:middle;text-align:center");
            tdHead.setAttribute("rowspan", "2");
            tdHead.appendChild(document.createTextNode("LP"));
            trHead.appendChild(tdHead);


            var tdHead = document.createElement('TH');
            // @ts-ignore
            tdHead.width = '100';
            tdHead.setAttribute("style", "font-weight:bold;vertical-align:middle;text-align:center");
            tdHead.setAttribute("rowspan", "2");
            tdHead.appendChild(document.createTextNode("Posilek"));
            trHead.appendChild(tdHead);


            var tdHead = document.createElement('TH');
            // @ts-ignore
            tdHead.width = '150';
            tdHead.setAttribute("style", "font-weight:bold;vertical-align:middle;text-align:center");
            tdHead.setAttribute("rowspan", "2");
            tdHead.appendChild(document.createTextNode("Danie / Asortyment"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TH');
            // @ts-ignore
            tdHead.width = '200';
            tdHead.setAttribute("style", "font-weight:bold;text-align:center");
            tdHead.setAttribute("colspan", "2");
            tdHead.appendChild(document.createTextNode("Gramatura dania"));
            trHead.appendChild(tdHead);


            var tdHead = document.createElement('TH');
            // @ts-ignore
            tdHead.width = '300';
            tdHead.setAttribute("style", "font-weight:bold;text-align:center");
            tdHead.setAttribute("colspan", "4");
            tdHead.appendChild(document.createTextNode("Składniki odżywcze"));
            trHead.appendChild(tdHead);

            var trHead = document.createElement('TR');
            tableThead.appendChild(trHead);


            var tdHead = document.createElement('TH');
            // @ts-ignore
            tdHead.width = '50';
            tdHead.setAttribute("style", "font-weight:bold;");
            tdHead.appendChild(document.createTextNode("Gramatura"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TH');
            // @ts-ignore
            tdHead.width = '20';
            tdHead.setAttribute("style", "font-weight:bold;");
            tdHead.appendChild(document.createTextNode("Jm"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TH');
            // @ts-ignore
            tdHead.width = '80';
            tdHead.setAttribute("style", "font-weight:bold;");
            tdHead.appendChild(document.createTextNode("Wartość energetyczna wg rozp. 1169/2011[kcal]"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TH');
            // @ts-ignore
            tdHead.width = '80';
            tdHead.setAttribute("style", "font-weight:bold;");
            tdHead.appendChild(document.createTextNode("Białko ogółem wg rozp. 1169/2011 [g]"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TH');
            // @ts-ignore
            tdHead.width = '80';
            tdHead.setAttribute("style", "font-weight:bold;");
            tdHead.appendChild(document.createTextNode("Tłuszcz [g]"));
            trHead.appendChild(tdHead);

            var tdHead = document.createElement('TH');
            // @ts-ignore
            tdHead.width = '80';
            tdHead.setAttribute("style", "font-weight:bold;");
            tdHead.appendChild(document.createTextNode("Węglowodany ogółem [g]"));
            trHead.appendChild(tdHead);

            var trHead = document.createElement('TR');
            tableThead.appendChild(trHead);


            var tdHead = document.createElement('TH');
            // @ts-ignore
            tdHead.width = '100';
            tdHead.setAttribute("style", "font-weight:bold;text-align:center");
            tdHead.setAttribute("colspan", "9");


            var tableBody = document.createElement('TBODY');
            table.appendChild(tableBody);


            var tr = document.createElement('TR');

            var td = document.createElement('TD');

            var iGramatura = 0;
            var iW1 = 0;
            var iW2 = 0;
            var iW3 = 0;
            var iW4 = 0;

            for (let i in listJadlospis) {


                var tr = document.createElement('TR');

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].lp));
                tr.appendChild(td);

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].posilek));
                tr.appendChild(td);

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].danieAsortyment));
                tr.appendChild(td);

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].gramatura));
                tr.appendChild(td);
                // @ts-ignore
                iGramatura += listJadlospis[i].gramatura;

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].jm));
                tr.appendChild(td);


                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].w1.toFixed(1)));
                tr.appendChild(td);
                // @ts-ignore
                iW1 += listJadlospis[i].w1;

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].w2.toFixed(1)));
                tr.appendChild(td);
                // @ts-ignore
                iW2 += listJadlospis[i].w2;

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].w3.toFixed(1)));
                tr.appendChild(td);
                // @ts-ignore
                iW3 += listJadlospis[i].w3;

                var td = document.createElement('TD');
                // @ts-ignore
                td.appendChild(document.createTextNode(listJadlospis[i].w4.toFixed(1)));
                tr.appendChild(td);
                // @ts-ignore
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
            // @ts-ignore
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
        }
    }
}


export const repJadlospisStore = new RepJadlospisStore();
