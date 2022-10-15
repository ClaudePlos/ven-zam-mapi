CREATE SEQUENCE nap_zam_block_seq START WITH 1;


-- auto-generated definition
create table NAP_ZAM_BLOKADY
(
    BLK_ID        NUMBER        not null,
    BLK_KK_ID     NUMBER        not null,
    BLK_RODZAJ    VARCHAR2(100) not null,
    BLK_GODZ      DATE          not null,
    BLK_PORA_DNIA VARCHAR2(100),
    BLK_LP     NUMBER        not null
)
/

create unique index NAP_ZAM_BLOKADY_BLK_ID_UINDEX
on NAP_ZAM_BLOKADY (BLK_ID)
/

alter table NAP_ZAM_BLOKADY
add constraint NAP_ZAM_BLOKADY_PK
primary key (BLK_ID)
/
