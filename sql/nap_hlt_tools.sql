
function wgraj_stan_zyw_w_dniu_plan3(v_kierunek_kosztow_id varchar2, v_gr_zywionych_id number, v_dieta varchar2, v_dzien date
--
, v_sniadanie_ilosc number
, v_drugie_sniadanie_ilosc number
, v_obiad_ilosc number
, v_podwieczorek_ilosc number
, v_kolacja_ilosc number
, v_posilek_nocny_ilosc number
--
, v_sniadanie_kor_ilosc number
, v_drugie_sniadanie_kor_ilosc number
, v_obiad_kor_ilosc number
, v_podwieczorek_kor_ilosc number
, v_kolacja_kor_ilosc number
, v_posilek_nocny_kor_ilosc number
--
, v_szUwagi varchar2
--
, v_id_operator number
, v_czy_korekta varchar2 default 'N'
) return number;



function wgraj_stan_zyw_w_dniu_plan3(v_kierunek_kosztow_id varchar2, v_gr_zywionych_id number, v_dieta varchar2, v_dzien date
--
, v_sniadanie_ilosc number
, v_drugie_sniadanie_ilosc number
, v_obiad_ilosc number
, v_podwieczorek_ilosc number
, v_kolacja_ilosc number
, v_posilek_nocny_ilosc number
--
, v_sniadanie_kor_ilosc number
, v_drugie_sniadanie_kor_ilosc number
, v_obiad_kor_ilosc number
, v_podwieczorek_kor_ilosc number
, v_kolacja_kor_ilosc number
, v_posilek_nocny_kor_ilosc number
--
, v_szUwagi varchar2
--
, v_id_operator number
, v_czy_korekta varchar2 default 'N'
) return number is
p_id_posilek number;
p_id_grupa_zywionych number;
p_id_dieta number;
p_id_stan_zywionych number;
--
v_id_obiekt_procenty number;
vUwagiSpr varchar2(1000);
BEGIN

p_id_grupa_zywionych := v_gr_zywionych_id;

-- 02 szukam id dieta
begin
select id_dieta into p_id_dieta -- TODO mapowanie diet
from diety where dieta_nazwa = v_dieta;
exception when no_data_found then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma takiej diety!' );
when others then
 RAISE_APPLICATION_ERROR(-20001, 'Wicej niż jedna dieta!' );
end;

-- 03 szukam id stan zywionych
begin
select id_stan_zywionych into p_id_stan_zywionych
from stany_zywionych where id_grupa_zywionych = p_id_grupa_zywionych
                       and id_dieta = p_id_dieta
                       and d_obr = v_dzien;
exception when no_data_found then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma odszukac stanu zyw - err 466!' );
end;

-- TODO -- mapowanie posilkow
-- 1-sniedanie 2-2. śniadanie  3-obiad 4-Podwieczorek 5-kolacja 6-Posiłek nocny
-- 10 - zamówienie główne (Planowanie)
-- 11 - korekta
--p_id_posilek := v_posilek;

---04.
IF v_czy_korekta = 'N' THEN

if v_sniadanie_ilosc is not null then
begin
update Stany_zywionych_posilki set ilosc = v_sniadanie_ilosc, id_operator = v_id_operator, D_ZMIANY =SYSDATE
where id_stan_zywionych = p_id_stan_zywionych
  and id_posilek = 1
  and id_typ_stan_zywionych = 10;
exception when others then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma zrobic update il sniadanie - err 471! pIdStanZywionych:'||p_id_stan_zywionych );
end;
end if;

if v_drugie_sniadanie_ilosc is not null then
begin
update Stany_zywionych_posilki set ilosc = v_drugie_sniadanie_ilosc, id_operator = v_id_operator, D_ZMIANY =SYSDATE
where id_stan_zywionych = p_id_stan_zywionych
  and id_posilek = 2
  and id_typ_stan_zywionych = 10;
exception when others then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma zrobic update il sniadanie - err 471!' );
end;
end if;

if v_obiad_ilosc is not null then
begin
update Stany_zywionych_posilki set ilosc = v_obiad_ilosc, id_operator = v_id_operator, D_ZMIANY =SYSDATE
where id_stan_zywionych = p_id_stan_zywionych
  and id_posilek = 3
  and id_typ_stan_zywionych = 10;
exception when others then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma zrobic update il obiad - err 472!' );
end;
end if;

if v_podwieczorek_ilosc is not null then
begin
update Stany_zywionych_posilki set ilosc = v_podwieczorek_ilosc, id_operator = v_id_operator, D_ZMIANY =SYSDATE
where id_stan_zywionych = p_id_stan_zywionych
  and id_posilek = 4
  and id_typ_stan_zywionych = 10;
exception when others then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma zrobic update il obiad - err 472!' );
end;
end if;

if v_kolacja_ilosc is not null then
begin
update Stany_zywionych_posilki set ilosc = v_kolacja_ilosc, id_operator = v_id_operator, D_ZMIANY =SYSDATE
where id_stan_zywionych = p_id_stan_zywionych
  and id_posilek = 5
  and id_typ_stan_zywionych = 10;
exception when others then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma zrobic update il kolacja - err 473!' );
end;
end if;

if v_posilek_nocny_ilosc is not null then
begin
update Stany_zywionych_posilki set ilosc = v_posilek_nocny_ilosc, id_operator = v_id_operator, D_ZMIANY =SYSDATE
where id_stan_zywionych = p_id_stan_zywionych
  and id_posilek = 6
  and id_typ_stan_zywionych = 10;
exception when others then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma zrobic update il kolacja - err 473!' );
end;
end if;

END IF;

--kor
IF v_czy_korekta = 'T' THEN

if v_sniadanie_kor_ilosc is not null then
begin
update Stany_zywionych_posilki set ilosc = v_sniadanie_kor_ilosc, id_operator = v_id_operator, D_ZMIANY =SYSDATE
where id_stan_zywionych = p_id_stan_zywionych
  and id_posilek = 1
  and id_typ_stan_zywionych = 11;
exception when others then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma zrobic update il sniadanie kor - err 474!' );
end;
end if;

if v_drugie_sniadanie_kor_ilosc is not null then
begin
update Stany_zywionych_posilki set ilosc = v_drugie_sniadanie_kor_ilosc, id_operator = v_id_operator, D_ZMIANY =SYSDATE
where id_stan_zywionych = p_id_stan_zywionych
  and id_posilek = 2
  and id_typ_stan_zywionych = 11;
exception when others then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma zrobic update il sniadanie - err 471!' );
end;
end if;

if v_obiad_kor_ilosc is not null then
begin
update Stany_zywionych_posilki set ilosc = v_obiad_kor_ilosc, id_operator = v_id_operator, D_ZMIANY =SYSDATE
where id_stan_zywionych = p_id_stan_zywionych
  and id_posilek = 3
  and id_typ_stan_zywionych = 11;
exception when others then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma zrobic update il obiad kor - err 475!' );
end;
end if;

if v_podwieczorek_kor_ilosc is not null then
begin
update Stany_zywionych_posilki set ilosc = v_podwieczorek_kor_ilosc, id_operator = v_id_operator, D_ZMIANY =SYSDATE
where id_stan_zywionych = p_id_stan_zywionych
  and id_posilek = 4
  and id_typ_stan_zywionych = 11;
exception when others then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma zrobic update il obiad - err 472!' );
end;
end if;

if v_kolacja_kor_ilosc is not null then
begin
update Stany_zywionych_posilki set ilosc = v_kolacja_kor_ilosc, id_operator = v_id_operator, D_ZMIANY =SYSDATE
where id_stan_zywionych = p_id_stan_zywionych
  and id_posilek = 5
  and id_typ_stan_zywionych = 11;
exception when others then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma zrobic update il kolacja kor - err 476!' );
end;
end if;

if v_posilek_nocny_kor_ilosc is not null then
begin
update Stany_zywionych_posilki set ilosc = v_posilek_nocny_kor_ilosc, id_operator = v_id_operator, D_ZMIANY =SYSDATE
where id_stan_zywionych = p_id_stan_zywionych
  and id_posilek = 6
  and id_typ_stan_zywionych = 11;
exception when others then
 RAISE_APPLICATION_ERROR(-20001, 'Nie ma zrobic update il kolacja - err 473!' );
end;
end if;

END IF;

-- udpate stanZyw Uwagi
IF v_szUwagi != 'null' THEN
update stany_zywionych set uwagi = v_szUwagi
where id_grupa_zywionych = p_id_grupa_zywionych
  and id_dieta = p_id_dieta
  and d_obr = v_dzien;
ELSIF v_szUwagi is null THEN
update stany_zywionych set uwagi = v_szUwagi
where id_grupa_zywionych = p_id_grupa_zywionych
  and id_dieta = p_id_dieta
  and d_obr = v_dzien;
END IF;

return 0;

END wgraj_stan_zyw_w_dniu_plan3;